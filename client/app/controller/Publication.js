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
Ext.define('MeetingMirror.controller.Publication', {
    extend: 'MeetingMirror.controller.MainController',

    config: {
        refs: {
            publicationList: '#publicationList',
            publicationDetailPanel: 'publicationdetailpanel'
        }
    },

    getPublications: function(identArray, callback) {

        var resultSet = [];
        if(!identArray || identArray === null || identArray.length === 0) return resultSet;
        
        var store = Ext.data.StoreManager.lookup('PublicationStore');

        // Get Publication for every Ident
        for(var i=0; i<identArray.length; i++) {
            var ident = identArray[i];
           
            // Extract Publication
            var pubObj = store.getById(ident);
            
            // Add publication to array
            if(pubObj && pubObj !== null) 
                resultSet.push(pubObj.data);
        }
        
        return resultSet;

    }, 
	getPublicationWithIdent: function(ident) {
    	var store = Ext.data.StoreManager.lookup('PublicationStore');    	
    	return store.getById(ident);
    },
	showPublicationDetails: function(ident) {
		if(!ident || ident === "") return;
		var publication = this.getPublicationWithIdent(ident);
		console.log(publication);
		details = Ext.create('MeetingMirror.view.person.PersonPublicationDetailContainer', {
			title: 'Paper',
			itemId: 'Publication'
		});
		
		// set the info
		details.child('#publicationDetails').setData(publication.data);  		
		this.getMainNav().pushMask(details);
	},

    getPublicationName: function(ident) {

        var publicationObject = this.getPublicationWithIdent(ident);
        if(!publicationObject) return "";
        
        var name = publicationObject.get('name');
        if(name && name !== "")
            return name;

        return "";
    }

});