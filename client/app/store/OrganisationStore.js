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
Ext.define('MeetingMirror.store.OrganisationStore', {
    extend: 'Ext.data.Store',
   
    
    config: {
        autoLoad: false,
        autoSync: false,
        model: 'MeetingMirror.model.Organisation',
        storeId: 'OrganisationStore',
        syncRemovedRecords: false,
        grouper: {
        	groupFn: function(record) {
        		return record.get('name').substr(0,1).toUpperCase();
        	}
        },  
        sorters: [
          {
            sorterFn: function(o1, o2) {
                var v1 = o1.get('name').toLowerCase(),
                    v2 = o2.get('name').toLowerCase();

                return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
             } 
          }]
        ,tempMetaTags: []
    }
});