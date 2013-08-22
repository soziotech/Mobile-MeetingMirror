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
 *     Clears PHP APC cache.
 *
 ******************************************************************************/

require_once('classes/apc.caching.php');
$oCache = new CacheAPC();
$cacheName = 'mashup_dataSet';

if ($oCache->bEnabled) { // if APC enabled
	$mashupData = $oCache->getData($cacheName); // getting data from memory
	$oCache->delData($cacheName); // delete data from memory
	echo 'Stored data: <pre>'; // lets see what we have
	var_dump($mashupData);
	echo '</pre>';

} else {
	echo 'Seems APC not installed, please install it to perform tests';
}

?>
