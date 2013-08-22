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
Ext.define('MeetingMirror.util.Proxy', {

	singleton: true,

	requires: ['Ext.data.proxy.JsonP'],

	process: function(url, callback) {

		

		Ext.data.JsonP.request({
			url: url,
			callbackName: 'mashupCallback',

			success: function(data) {
				
				if(data === null) {
					callback(false);
					return;
				}

				var locationStore = Ext.data.StoreManager.lookup('LocationStore');
				var organisationStore = Ext.data.StoreManager.lookup('OrganisationStore');
				var personStore = Ext.data.StoreManager.lookup('PersonStore');
				var newsStore = Ext.data.StoreManager.lookup('NewsStore');
				var publicationStore = Ext.data.StoreManager.lookup('PublicationStore');
				var sessionStore = Ext.data.StoreManager.lookup('SessionStore');
				var hotelStore = Ext.data.StoreManager.lookup('HotelStore');
				
				var sessionDays = [
				{'text':'29/06','time':new Date(2013, 6 - 1, 29, 0), 'day':29},
				{'text':'30/06','time':new Date(2013, 6 - 1, 30, 0), 'day':30},
				{'text':'01/07','time':new Date(2013, 7 - 1, 1, 0), 'day':1},
				{'text':'02/07','time':new Date(2013, 7 - 1, 2, 0), 'day':2}];

				// Load Locations
				if(data.getLocations && locationStore) {
					Ext.Array.each(data.getLocations, function(location) {
						locationModel = Ext.create('MeetingMirror.model.Location', location);
						locationStore.add(locationModel);
					});
				} else {
					callback(false);
					return;
				}
		        // Load Organisations
		        if(data.getOrganisations && organisationStore) {
		        	Ext.Array.each(data.getOrganisations, function(organisation) {
		        		organisationModel = Ext.create('MeetingMirror.model.Organisation', organisation);
		        		organisationStore.add(organisationModel);
		        	});
		        } else {
					callback(false);
					return;
				}
				// Load Persons
				if(data.getPersons && personStore) {
					Ext.Array.each(data.getPersons, function(person) {
						if(!person.organisations) person.organisations = [];
						if(!person.tags) person.tags = [];
						if(!person.websites) person.websites = [];
						if(!person.authored) person.authored = [];
						if(!person.email) person.email = "";
						if(!person.contributed) person.contributed = [];
						if(!person.mendeley) person.mendeley = "";
						if(!person.imageUrl) person.imageUrl = "";
						personModel = Ext.create('MeetingMirror.model.Person', person);
						personStore.add(personModel);
					});
				} else {
					callback(false);
					return;
				}
		        // Load NewsItems
		        if(data.getNewsItems && newsStore) {
		        	Ext.Array.each(data.getNewsItems, function(newsItem) {
		        		newsItemModel = Ext.create('MeetingMirror.model.NewsItem', newsItem);
		        		newsStore.add(newsItemModel);
		        	});
		        } else {
					callback(false);
					return;
				}
				// Load Twitter NewsItems
		        if(data.getTweets && newsStore) {
		        	
		        	Ext.Array.each(data.getTweets, function(twitterItem) {
		        		newsItemModel = Ext.create('MeetingMirror.model.NewsItem', twitterItem);
		        		newsStore.add(newsItemModel);
		        	});
		        } else {
					callback(false);
					return;
				}
		        // Load Publications
		        if(data.getPublications && publicationStore) {
		        	Ext.Array.each(data.getPublications, function(publication) {
		        		publicationModel = Ext.create('MeetingMirror.model.Publication', publication);
		        		publicationStore.add(publicationModel);
		        	});
		        } else {
					callback(false);
					return;
				}
				// Load Agenda Sessions
		        if(data.getAgendaSessions && sessionStore) {
		        	Ext.Array.each(data.getAgendaSessions, function(session) {
		        		//console.log(data.getAgendaSessions);
						
		        		sessionModel = Ext.create('MeetingMirror.model.Session', session);
						sessionModel.data.day = sessionModel.get('start_time').getDate();
						//console.log(sessionModel);
		        		sessionStore.add(sessionModel);
						//console.log(session);
						/*if (sessionModel.data.start_time) {
			                sessionDays.push({
			                    day: sessionModel.get('start_time').getDate(),
			                    text: Ext.Date.format(sessionModel.get('start_time'), 'm/d'),
			                    time: sessionModel.get('start_time')
			                });
							//console.log(sessionDays);
			            }*/
		        	});
		        } else {
					callback(false);
					return;
				}
		        // Load Hotels
		        if(data.getHotels && hotelStore) {
		        	Ext.Array.each(data.getHotels, function(hotel) {
		        		hotelModel = Ext.create('MeetingMirror.model.Hotel', hotel);
		        		hotelStore.add(hotelModel);
		        	});
		        } else {
					callback(false);
					return;
				}
				
				
				// Assign Session Days
				MeetingMirror.sessionDays = Ext.Array.sort(Ext.Object.getValues(sessionDays), function(a, b) {
						            return a.time < b.time ? -1 : 1;
						        });

		        callback(true);
		    }
		});

}
});
