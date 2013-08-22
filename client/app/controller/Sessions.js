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
Ext.define('MeetingMirror.controller.Sessions', {
	extend: 'MeetingMirror.controller.MainController',

	config: {
		refs: {
			sessions: 'sessions',
			session: 'session',
			sessionSpeakers: 'sessionContainer list',
			sessionContainer: 'sessionContainer',
			sessionDayPicker: 'sessions segmentedbutton'
		},
		control: {
			sessions: {
				initialize: 'initSessions',
				itemtap: 'onSessionTap'
			},
			sessionDayPicker: {
				toggle: 'onSessionDateChange'
			}
		}
	},
	mySessionList: null,
	initSessions: function(sessionList) {
		//console.log(sessionList);
		this.mySessionList = sessionList;
		var firstButton = this.getSessionDayPicker().getItems().items[0];
		this.getSessionDayPicker().setPressedButtons(firstButton);
	},
	getSessionsWithIdent: function(ident) {
    	var store = Ext.data.StoreManager.lookup('SessionStore');    	
    	return store.getById(ident);
    },
	
    getSessions: function(identArray, callback) {

        var resultSet = [];
        if(!identArray || identArray === null || identArray.length === 0) return resultSet;
        
        var store = Ext.data.StoreManager.lookup('SessionStore');

        // Get Session for every Ident
        for(var i=0; i<identArray.length; i++) {
            var ident = identArray[i];
           
            // Extract Session
            var pubObj = store.getById(ident);
            
            // Add Session to array
            if(pubObj && pubObj !== null) 
                resultSet.push(pubObj.data);
        }
        
        return resultSet;

    }, 
	onSessionDateChange: function(seg, btn, toggle) {
		
        if (toggle) {
            this.filterByButton(btn);
        }
	},

	filterByButton: function(btn) {
		var store = Ext.getStore('SessionStore');
		store.clearFilter();
			
			var store = Ext.getStore('SessionStore');
			
			var customFilter = function(record) {
				return record.get('day') == btn.config.day;

			};
			store.filterBy(customFilter);

		store.filter('day', btn.config.day);
		
	},

	onSessionTap: function(list, idx, el, record) {

		this.showSessionDetails(record);
	},
	showSessionDetails: function(record) {
		var details = Ext.create('MeetingMirror.view.session.SessionDetail', {
		                title: 'Session Details'
		            });
		
		var sessionInfoItem = details.child('#sessionDetailContainer');

		if(sessionInfoItem) {
			var sessionInfo = sessionInfoItem.child('#sessionDetailData');
			if(sessionInfo) {
				sessionInfo.setData(record.data);
			}
		}
		
		var toolbar = details.child('#calenderToolbar');
		
		if(toolbar) {
			//&& !Ext.browser.is.Standalone
			if (!Ext.os.is.Android ) {


			var sessionController = MeetingMirror.app.getController('Sessions');    
			var vcalLink = sessionController.generateVcalLink(record.get('ident'));      


			var button = 
						Ext.create('Ext.Container',{
							flex: 3,
							html:'<div class="x-button x-iconalign-left x-button-action x-layout-box-item x-flexed x-stretched" style="-webkit-box-flex: 3;"><span class="x-badge" style="display: none;"></span><span class="x-button-icon x-shown action" id="ext-element-211" style=""></span><span class="x-button-label" style="" id="ext-element-212"><a href="'+ vcalLink + '">add to calendar</a></span></div>',
							align: 'center'
				});
				
				// Add buttons to toolbar
				toolbar.add(Ext.Spacer.create({flex:1}));
				toolbar.add(button
					);
				toolbar.add(Ext.Spacer.create({flex:1}));
			} else {
				// Hide in case we have no iOS device
				toolbar.hide();
			}
		}
		
		this.getMainNav().pushMask(details);
	},
   	generateVcalLink: function(sessionIdent) {
	   if(!sessionIdent) return "";	   
	   var session = this.getSessionsWithIdent(sessionIdent);
	   if(!session || !session.data) return "";
	   
	   var vcalLink = MeetingMirror.app.vcalUrl + "?";
	   vcalLink += "id=" + sessionIdent;
	   if(session.data.title) vcalLink += "&title=" + encodeURIComponent(session.data.title);
	   if(session.data.description) vcalLink += "&description=" + encodeURIComponent(session.data.description);
	   
	   // Add Location Name
	   if(session.data.locationIdent) {
            var locationStore = Ext.data.StoreManager.lookup('LocationStore');
            if(locationStore) {
            		var location = locationStore.getById(session.data.locationIdent);
				if(location && location.data && location.data.name) {
						vcalLink += "&location=" + encodeURIComponent(location.data.name);
						if(session.data.room) {
							vcalLink += encodeURIComponent("\\, " + session.data.room);
						}
						if(location.data.street && location.data.houseNumber) {
							vcalLink += encodeURIComponent("\\, " + location.data.street + " " + location.data.houseNumber);
						}
						if(location.data.zipCode && location.data.city) {
							vcalLink += encodeURIComponent("\\, " + location.data.zipCode + " " + location.data.city);
						}
				}
            }
	   }
	   if(session.data.start_time) vcalLink += "&datestart=" + Ext.Date.format(session.data.start_time, 'Ymd\\THis\\Z');
	   if(session.data.end_time) vcalLink += "&dateend=" + Ext.Date.format(session.data.end_time, 'Ymd\\THis\\Z');

	   return vcalLink;
   },
   // Source: http://stackoverflow.com/questions/1199352/smart-way-to-shorten-long-strings-with-javascript
   truncString: function(string, n, useWordBoundary){
            var toLong = string.length>n,
                s_ = toLong ? string.substr(0,n-1) : string;
            s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
            return  toLong ? s_ + ' ...' : s_;
		}
});
