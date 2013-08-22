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
Ext.define('MeetingMirror.store.PersonStore', {
    extend: 'Ext.data.Store',

    requires: [
        'MeetingMirror.model.Person'
    ],

    config: {
        autoLoad: false,
        autoSync: false,
        model: 'MeetingMirror.model.Person',
        storeId: 'PersonStore',
        syncRemovedRecords: false,
        grouper: {
        	groupFn: function(record) {
        		return record.get('lastname').substr(0,1).toUpperCase();
        	}
        },
        sorters: [
          {
            property: 'lastname',
            direction: 'ASC'
          },
            {
                property: 'firstname',
                direction: 'ASC'
            }]
    }

});