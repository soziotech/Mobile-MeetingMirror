<?php 

/*******************************************************************************
 * Copyright (c) 2013 Martin Burkhard - Cooperation Systems Center Munich (CSCM).
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     Martin Burkhard - Design and initial implementation
 *
 * Description:
 *     Caches CommunityMashup JSON data set as JSON file using PHP APC Caching
 *
 ******************************************************************************/

require_once('classes/apc.caching.php');

$url = "http://localhost:8087/mobilehtml/mashup/";
$dumpFile = 'dump/dataSet.json';
$callback = "Ext.data.JsonP.mashupCallback";
$cacheName = 'mashup_dataSet';

try
{

	function handleError($errno, $errstr, $errfile, $errline, array $errcontext)
	{
	    // error was suppressed with the @-operator
	    if (0 === error_reporting()) {
	        return false;
	    }

	   // DEBUG: ChromePhp::error($errstr);

	    // Set Header to JavaScript MIME type
  		header("Content-type: text/javascript");

	    echo $callback.'(null);';
	    return true;
	}
	set_error_handler('handleError');
	
	$oCache = new CacheAPC();


	if ($oCache->bEnabled) { // if APC enabled
		$mashupData = $oCache->getData($cacheName); // getting data from memory
	} else {
		// DEBUG: ChromePhp::info('APC caching is NOT enabled!');
	}

	// Extract JSON-P callback function
	if(array_key_exists('callback', $_GET) == TRUE){
    	$callback = $_GET['callback'];
	}

	// Load data in case the memory is empty
	if(is_null($mashupData) || $mashupData == "null") {
		// DEBUG: ChromePhp::log('no data in cache -> caching');
	
		if(is_null($callback) || $callback === "" || substr( $callback, 0, 15 ) != "Ext.data.JsonP.") {
			echo '{"Error":"Invalid callback URL."}'; 
			return;
		}

		// Load CommunityMashup JSON contents
		$mashupData = null;
		$json = @file_get_contents($url);

		// Check if we received data
		if($json !== false) {

			// Decode & Encode JSON (convert to Unicode)
			$decoded = json_decode($json);
			$mashupData = json_encode($decoded);
						
			if ($oCache->bEnabled) { // if APC enabled
				if(!is_null($mashupData) &&  $mashupData != "null") {
					// DEBUG: ChromePhp::log('storing data in cache');
					$oCache->setData($cacheName, $mashupData); // store data in memory
					
					// DEBUG: ChromePhp::log('dumping data to file');
					file_put_contents($dumpFile, $mashupData, LOCK_EX);
				} else {
					$oCache->delData($cacheName); // delete data from memory
				}
			}
		} else {
			// DEBUG: ChromePhp::log('we received no data from CommunityMashup');
		}
		
	} else {
		// DEBUG: ChromePhp::log('using cached data');
	}

	// Set Header to JavaScript MIME type
	header("Content-type: text/javascript");

	if(!is_null($mashupData) &&  $mashupData != "null" ) {
	
		ChromePhp::log('returning cached data');
		// Return JSON-P
		echo $callback.'('.$mashupData.');';

	} else {

		// DEBUG: ChromePhp::log('no mashup data -> loading file contents');
		
		// Load data from dump file
		$mashupDataDump = file_get_contents($dumpFile);

		if(!is_null($mashupDataDump) &&  $mashupDataDump != "null") {
		
			ChromePhp::log('using file dump data');

			// Return data dump as JSON-P
			echo $callback.'('.$mashupDataDump.');';

		} else {

			// DEBUG: ChromePhp::log('no file contents available');

			echo $callback.'(null);';
		} 	
		
	}
} catch(Exception $e)
  {
  	// Set Header to JavaScript MIME type
  	header("Content-type: text/javascript");
	
	ChromePhp::error($e);
	
  	// RETURN ERROR
  	echo $callback.'(null);';
  }
?>
