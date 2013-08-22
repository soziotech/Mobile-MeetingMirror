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
Ext.define('MeetingMirror.view.session.SessionList', {

	extend: 'Ext.List',
	requires: 'Ext.SegmentedButton',

	xtype: 'sessions',

	config: {
		autoDestroy: false,
		items: [
			{
				docked: 'top',
				xtype: 'toolbar',
				ui: 'gray',

				items: [
					{
						width: '100%',
						defaults: {
							flex: 1
						},
						xtype: 'segmentedbutton',
						itemId: 'segmentedButton',
						allowDepress: false
					}
				]
			}
		],
        variableHeights: true,
		//infinite: true,
        //useSimpleItems: true,
		itemTpl: [
			'<div class="session"><div class="title">{title}</div>',
			'<tpl if="locationIdent !== undefined">{[this.getWhere(values.locationIdent, values.building, values.floor, values.room)]}</div></tpl>',
			'<tpl if="locationIdent === undefined"><small>{values.room}</small></tpl>',
			'</div>',
			{
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
                    locationString = '<small>';
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
                    locationString += '</small>';
                    return locationString;
                }
			}
		]
	},

	initialize: function() {
		this.config.title = MeetingMirror.app.title;
		this.callParent();

		var segmentedButton = this.down('segmentedbutton');

		Ext.Array.each(MeetingMirror.sessionDays, function(day) {
			segmentedButton.add(day);
		});
	}
});
