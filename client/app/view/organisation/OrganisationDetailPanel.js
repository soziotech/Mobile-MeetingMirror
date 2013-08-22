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
Ext.define('MeetingMirror.view.organisation.OrganisationDetailPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.organisationdetailpanel',
    
    config: {
    	tabBar: {
            docked: 'top',
            ui: 'light',
            layout: {
                pack: 'center',
                type: 'hbox'
            }
        },
		title: 'Organization',
        personIdent: '',
        
        items: [
        	{
        		xtype: 'container',
        		title: 'Overview',
            	itemId: 'organisationDetailPanelInfo',
            	margin: 10,
            	scrollable: 'vertical',
            	layout: {
                	type: 'fit'
            	},
            	tpl: new Ext.XTemplate (
        				'<tpl if="imageUrl !== undefined"><div class="detailtitle"><img src="{imageUrl}" style="max-width:300px; max-height:200px;"></div><br /><br /></tpl>',
            				'<div class="detailtitle">Organization</div><div class="detailfield">{name}</div>',
                            '<tpl if="stringValue !== undefined"><div class="detailtitle">Description</div><div class="detailfield">{stringValue}</div></tpl>',
            				'<tpl if="websites !== undefined"><div class="detailtitle">Website</div><div class="detailfield"> <a href="{websites}" target="_blank">{websites}</a></div></tpl>',
            				'<tpl if="locations !== undefined">{[this.getLocationString(values.locations)]}</tpl>',
                            '<tpl if="metaTags !== undefined">{[this.getMetaTagsString(values.metaTags)]}</tpl>',
                            {
                            getLocationString: function(locationArray) {

                            var locationString = "";
                            if (!locationArray) return locationString;
                            if (locationArray.length == 0) return locationString;

                            // Prepare location store
                            var locationStore = Ext.data.StoreManager.lookup('LocationStore');
                            if(!locationStore) return locationString;
                            var locationIdent = locationArray[0];
                            if(!locationIdent) return locationString;
                            var location = locationStore.getById(locationIdent);
                            if(!location) return locationString;
                            if(!location.data) return locationString;

                            // Build location string
                            locationString = "";
                            if(location.data.street) {
                                locationString += location.data.street; 
                                if(location.data.houseNumber) locationString += " " + location.data.houseNumber;
                            }
                            if(location.data.city) {
								if(locationString !== "") locationString += "<br />"
                                if(location.data.zipCode ) {									
                                    locationString += location.data.zipCode += " ";
                                }
                                locationString += location.data.city;
                            }
                            if(location.data.country) locationString += "<br />" + location.data.country; 
                            locationString = '<div class="detailtitle">Address</div><div class="detailfield">' + locationString + '</div>';
                            return locationString;
                        },
                            getMetaTagsString: function(metaTagsArray) {
                            var metaTagString = "";
                            // Parse MetaTags
                            for (var mta=0; mta < metaTagsArray.length; mta++) {
                                var metaTag = metaTagsArray[mta];
                                if (metaTag === "institution") metaTagString += "Institution of higher education and research, ";
                                if (metaTag === "conference_host") metaTagString += "Conference Host, ";
                                if (metaTag === "conference_supportingorganisation") metaTagString += "Supporting Organization, ";
                                if (metaTag === "conference_sponsor") metaTagString += "Conference Sponsor, ";
                              }
                            if(metaTagString === "")
                                metaTagString = "Institution / Company";
                            else
                                metaTagString = metaTagString.slice(0, -2);
                            return '<div class="detailtitle">Conference Information</div><div class="detailfield">' + metaTagString + '</div>'; 
                    }
            		}
                )		
            				
            		
        	},
        	{
        		xtype: 'organisationPersonListContainer',				
        		title: 'Members'
        	}
        ],
        listeners:
        	{
        	painted: function() {
        		// filter person store
        		var personStore = Ext.data.StoreManager.lookup('PersonStore');
        		var organisationController = MeetingMirror.app.getController('Organisation');
        		var ident = this.getPersonIdent();

        		personStore.filterBy(function(record, pIdent) {
    	
    				var organisationsArray = record.get('organisations');
    		
    				if (organisationsArray === undefined || organisationsArray.length === 0) {
    					return false; 
					}
    				for (var oa=0; oa < organisationsArray.length; oa++) {
    					var org = organisationsArray[oa];
    					if (org === ident) return true;
    				}
    			});
    			if (ident === '') personStore.clearFilter();
        	},
        
        
        	erased: function() {
        		// remove filter from person store
        		var personStore = Ext.data.StoreManager.lookup('PersonStore');
        		personStore.clearFilter();
        	}
    	}
    }
});