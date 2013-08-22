/*******************************************************************************
 * Copyright (c) 2013 Nico Hamann and Martin Burkhard - Cooperation Systems Center Munich (CSCM).
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     Nico Hamann - Design and initial implementation
 *     Martin Burkhard - Design and implementation
 ******************************************************************************/
Ext.define('MeetingMirror.store.LocationStore', {
    extend: 'Ext.data.Store',

    config: {
        autoLoad: false,
        autoSync: false,
        model: 'MeetingMirror.model.Location',
        storeId: 'LocationStore',
        syncRemovedRecords: false,
        listeners: [
            {
                fn: 'onArraystoreLoad',
                event: 'load'
            }
        ]
    },
    
    onArraystoreLoad: function(store, records, successful, operation, eOpts) {
    	console.log('load LocationStore');
		console.log(records);
    }
});