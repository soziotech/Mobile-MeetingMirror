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
Ext.define('MeetingMirror.controller.Person', {
    extend: 'MeetingMirror.controller.MainController',

    config: {
        refs: {
            personList: 'personList',
            personDetailPanel: 'personDetailPanel'
        },
		control: {
			personList: {
				itemtap: 'onPersonTap'
			}
		}
    },

    getPersons: function(callback) {
		console.log(getPersons);
		var resultSet = [];
        var store = Ext.data.StoreManager.lookup('PersonStore');
        store.clearFilter();
        store.sort('lastname', 'ASC');      
		
		store.each(function(rec) {
		    if (rec) {
		        resultSet.push(rec.data);
		    }
		});
		console.log(resultSet);
		callback(resultSet);
    },
    
    getPersonWithIdent: function(ident) {
    	var store = Ext.data.StoreManager.lookup('PersonStore');    	
    	return store.getById(ident);
    },
    getPersonWithLastname: function(lastname) {
    	var store = Ext.data.StoreManager.lookup('PersonStore');
		lastname = lastname.toLowerCase();
		var person = null;
		store.each(function(record) {
			if(record.data.lastname.toLowerCase() === lastname) {
				person = record.data;
				return false;
			}
		});
		return person;
    },
    getPersonName: function(ident) {

        var personObject = this.getPersonWithIdent(ident);
        if(!personObject) return "";
        
        var name = personObject.get('name');
        var firstname = personObject.get('firstname');
        var lastname = personObject.get('lastname');
        
        if(firstname && lastname && firstname !== "" && lastname !== "")
            return firstname + ' ' + lastname;
        if(name && name !== "")
            return name;

        return "";
    },
	onPersonTap: function(list, idx, el, record) {

		this.showPersonDetails(record);
	},
	showPersonDetailsWithIdent: function(ident) {
		var personController = MeetingMirror.app.getController('Person');
		var record = personController.getPersonWithIdent(ident);
		this.showPersonDetails(record);
	},
    showPersonDetails: function(record) {
    	var info, details;
    	
    	var publicationController = MeetingMirror.app.getController('Publication');
		var sessionController = MeetingMirror.app.getController('Sessions');
       
        // Create Person Detail Panel
    	details = Ext.create('MeetingMirror.view.person.PersonDetailPanel', {
                title: 'Participant'
            });


            // Assign Data to Detail Panel
            info = details.child('#personDetailPanelInfo');
            info.setData(record.data);
			if(record.data.firstname === "Jes") {
				console.log(record.data);
			}

            // Lookup Publications
            var authoredData = publicationController.getPublications(record.data.authored);
            var contributedData = publicationController.getPublications(record.data.contributed);
            var publicationData = authoredData.concat(contributedData);
			
			// Lookup Speaker Sessions
			var speakerData = sessionController.getSessions(record.data.speakerIdents);
			
			
            // Assign Sessions if available
            if(speakerData && speakerData !== null && speakerData.length > 0) {
                var sessionList = Ext.create('MeetingMirror.view.person.PersonSessionListContainer', {
					title: 'Speaker'
                });

                sessionList.child('#sessionList').setData(speakerData);

                details.add([sessionList]);
            } else {
            	//console.log('no speaker data');
            }

   			var chairData = sessionController.getSessions(record.data.chairIdents);
            // Assign Sessions if available
            if(chairData && chairData !== null && chairData.length > 0) {
                var chairSessionList = Ext.create('MeetingMirror.view.person.PersonSessionListContainer', {
					title: 'Chair'
                });

                chairSessionList.child('#sessionList').setData(chairData);

                details.add([chairSessionList]);
            }
			
            // Assign Publications if available
            if(publicationData && publicationData !== null && publicationData.length > 0) {
                var publicationList = Ext.create('MeetingMirror.view.person.PersonPublicationListContainer', {
                    title: 'Paper'
                });

                publicationList.child('#publicationList').setData(publicationData);

                details.add([publicationList]);
            }

            this.getMainNav().pushMask(details);
    }
});