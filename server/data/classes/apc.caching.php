<?

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
 * Source: 
 *     http://www.script-tutorials.com/how-to-use-apc-caching-with-php/
 *
 ******************************************************************************/

class CacheAPC {

    var $iTtl = 600; // Time To Live
    var $bEnabled = false; // APC enabled?

    // constructor
    function CacheAPC() {
        $this->bEnabled = extension_loaded('apc');
    }

    // get data from memory
    function getData($sKey) {
        $bRes = false;
        $vData = apc_fetch($sKey, $bRes);
        return ($bRes) ? $vData :null;
    }

    // save data to memory
    function setData($sKey, $vData) {
        return apc_store($sKey, $vData, $this->iTtl);
    }

    // delete data from memory
    function delData($sKey) {
        $bRes = false;
        apc_fetch($sKey, $bRes);
        return ($bRes) ? apc_delete($sKey) : true;
    }
}

?>