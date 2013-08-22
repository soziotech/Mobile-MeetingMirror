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
Ext.define('MeetingMirror.controller.Organisation', {
		extend: 'MeetingMirror.controller.MainController',
		
	config: {
			refs: {
				organisationDetailPanel: '#organisationDetailPanel'
			}
		},
		
	getOrganisations: function(callback) {

        var store = Ext.data.StoreManager.lookup('OrganisationStore');
        
        store.sort('name', 'ASC');

        store.load(function() {

            if(callback !== undefined)
            callback(store);
        });
    },
    
    getOrganisationName: function(ident) {
    	var store = Ext.data.StoreManager.lookup('OrganisationStore');
    	
    	var organisation = store.getById(ident);
    	
    	return organisation.data.name;
    	
    },
    
    getOrganisationDetails: function(ident) {
    	// filter person store
    	// create view
    	
    	var info, details;
    	var personController = MeetingMirror.app.getController('Person');
    	var organisationController = MeetingMirror.app.getController('Organisation');
    	var personStore = Ext.data.StoreManager.lookup('PersonStore');
    	
    	var record = organisationController.getOrganisationWithIdent(ident);
    	
    	details = Ext.create('MeetingMirror.view.organisation.OrganisationDetailPanel', {
    		title: 'Organization',
    		personIdent: ident
    	});
    	
    	// set the info
        info = details.child('#organisationDetailPanelInfo');
        info.setData(record.data);
    	
    	organisationController.getMainNav().pushMask(details);
    	
    },
    
    getOrganisationWithIdent: function(ident) {
    	var store = Ext.data.StoreManager.lookup('OrganisationStore');
    	
    	return store.getById(ident);
    }
});
