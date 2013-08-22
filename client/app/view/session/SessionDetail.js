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
Ext.define('MeetingMirror.view.session.SessionDetail', {

	extend: 'Ext.Container',
	alias: 'widget.sessiondetailpanel',

	config: {
		layout: {
		             pack: 'start',
		             type: 'vbox'
		        },
		scrollable: 'vertical',	
		items: [
		{
			xtype: 'container',
			itemId: 'sessionDetailContainer',
			layout: {
				type: 'vbox'
			},
			defaults: {
				margin: 5
			},
			items: [
					{
						itemId: 'sessionDetailData',
						xtype: 'component',
						tpl: new Ext.XTemplate (
							'<h1>{title}</h1>',
							'<div class="detailtitle">When</div><div class="detailfield">{[this.getWhen(values.start_time, values.end_time)]}</div>',
							'<tpl if="locationIdent !== undefined">{[this.getWhere(values.locationIdent, values.building, values.floor, values.room)]}</div></tpl>',
							'<tpl if="locationIdent === undefined"><div class="detailtitle">Where</div><div class="detailfield">{room}</div></tpl>',						
							'<tpl if="speakerIdents !== undefined">{[this.getSpeakers(values.speakerIdents)]}</tpl>',
							'<tpl if="chairIdents !== undefined">{[this.getChairs(values.chairIdents)]}</tpl>',							
							'<tpl if="description !== undefined">{[this.getAbstract(values.description)]}</tpl>',
							'<tpl if="publicationIdents !== undefined">{[this.getPublications(values.publicationIdents)]}</tpl>',
							'<tpl if="website !== undefined">{[this.getWebsite(values.website)]}</tpl>',
							{
		                        getWhen: function(startDateTime, endDateTime) {
									
									var dateTime = Ext.Date.format(startDateTime, 'l, F d, g:ia');
									if(endDateTime) dateTime += " - " + Ext.Date.format(endDateTime, 'g:ia');
									return dateTime;
								},
	                            getWhere: function(locationIdent,building,floor,room) {

		                            var locationString = "";
		                            if (!locationIdent) return locationString;

		                            // Prepare location store
		                            var locationStore = Ext.data.StoreManager.lookup('LocationStore');
		                            if(!locationStore) return locationString;
	                            
		                            var location = locationStore.getById(locationIdent);
		                            if(!location) return locationString;
		                            if(!location.data) return locationString;

		                            // Build location string
		                            locationString = '<div class="detailtitle">Where</div><div class="detailfield">';
									// Add Location Name
		                            if(location.data.name) {
		                                locationString += location.data.name; 
		                            }
									// Add IndoorLocation Room
		                            if(room) {
										if(locationString !== "") locationString += ", ";
		                                locationString += room; 
		                            }
									// Conclude
		                            locationString += '</div>';
		                            return locationString;
		                        },
								getSpeakers: function(speakerIdentArray) {
		                            
		                            var personController = MeetingMirror.app.getController('Person');

		                            var speakersString = "";
		                            if (!speakerIdentArray) return speakersString;

		                            for(var i=0; i < speakerIdentArray.length; i++) {
		                            	var speakerIdent = speakerIdentArray[i];
		                            	if (!speakerIdent) continue;
		                            	var speakerName = personController.getPersonName(speakerIdent);

		                            	if(speakersString != "") speakersString += ', ';
		                            	speakersString += '<a href="javascript:MeetingMirror.app.getPersonDetails(&quot;' + speakerIdent + '&quot;)">' + speakerName + '</a>';
		                            }
									if(speakersString != "") speakersString = '<div class="detailtitle">Speakers</div><div class="detailfield">' + speakersString + '</div>';
                            
		                            return speakersString;
		                        },
		                        getChairs: function(chairIdentArray) {
		                            var chairsString = "";
		                            if (!chairIdentArray) return chairsString;
									
		                            var personController = MeetingMirror.app.getController('Person'); 

		                            for(var i=0; i < chairIdentArray.length; i++) {
		                            	var chairIdent = chairIdentArray[i];
		                            	if (!chairIdent) continue;
		                            	var chairName = personController.getPersonName(chairIdent);

		                            	if(chairsString != "") chairsString += ', ';
		                            	chairsString += '<a href="javascript:MeetingMirror.app.getPersonDetails(&quot;' + chairIdent + '&quot;)">' + chairName + '</a>';
		                            }
									
									if(chairsString != "") chairsString = '<div class="detailtitle">Chair</div><div class="detailfield">' + chairsString + '</div>';
                            
		                            return chairsString;
		                        },
								getAbstract: function(description) {
									var abstractString = "";
									if(!description || description === "") return abstractString;
									return '<div class="detailtitle">Abstract</div><div class="detailfield">' + description + '</div>'
								},
		                        getPublications: function(publicationIdentArray) {
		                            var publicationsString = "";
		                            if (!publicationIdentArray) return publicationsString;
									
		                            var publicationController = MeetingMirror.app.getController('Publication'); 

		                            for(var i=0; i < publicationIdentArray.length; i++) {
		                            	var publicationIdent = publicationIdentArray[i];
		                            	if (!publicationIdent) continue;
		                            	var publicationName = publicationController.getPublicationName(publicationIdent);

		                            	if(publicationsString !== "") publicationsString += ', ';
		                            	publicationsString += '<a href="javascript:MeetingMirror.app.getPublicationDetails(&quot;' + publicationIdent + '&quot;)">' + publicationName + '</a>';
		                            	
									}
									
									if(publicationsString !== "") publicationsString = '<div class="detailtitle">Paper</div><div class="detailfield">' + publicationsString + '</div>';
                            
		                            return publicationsString;
		                        },
		                        getWebsite: function(website) {
		                            if (!website) return "";
                            
		                            return '<div class="detailtitle">Website</div><div class="detailfield">' + this.getWebsitesString(website) + '</div>';
                            
		                        },
                        
                        getWebsitesString: function(website) {
                            // return the websites as clickable list
                            var websitesString = "";
                            
                            
                            websitesString = websitesString + '<a href="' + website + '" target="_blank">' + 'open external link in browser' + '</a>';
                            
                            return websitesString;
                        }
							}
						)
					}
					
			]
		},	
		{
			itemId: 'calenderToolbar',
			xtype: 'toolbar',
			ui: 'neutral',
			docked: 'bottom',
			
			items: [
			]
		}
		]

	}
});
