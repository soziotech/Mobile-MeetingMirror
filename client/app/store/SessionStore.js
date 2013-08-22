/*******************************************************************************
 * Copyright (c) 2013 Martin Burkhard - Cooperation Systems Center Munich (CSCM).
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     Martin Burkhard - Design and initial implementation
 ******************************************************************************/
Ext.define('MeetingMirror.store.SessionStore', {
	extend: 'Ext.data.Store',

	requires: 'Ext.DateExtras',

    config: {
        autoLoad: false,
        autoSync: false,
		autoFilter: false,
        model: 'MeetingMirror.model.Session',
        storeId: 'SessionStore',
		grouper: {
			id: 'sessionGrouper',
            groupFn: function(record) {
				
				var startTime = record.get('start_time');
				var dateFormat = Ext.Date.format(startTime, 'g:ia');
                return  dateFormat;
				
            },
			sortProperty: 'start_time',
			direction: 'ASC'
        },

        sorters: [
            {
                property: 'start_time',
                direction: 'ASC'
            },
            {
                property: 'ident',
                direction: 'ASC'
            }
        ]
    }
});
