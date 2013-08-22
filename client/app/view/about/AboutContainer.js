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
Ext.define('MeetingMirror.view.about.AboutContainer', {

	extend: 'Ext.Container',
	xtype: 'aboutContainer',

	config: {
        layout: {
            type: 'vbox',
            align: 'center'
        },
        defaults: {
        	margin: 5
        },
		
		items: [
			{
            	xtype: 'button',
            	text: 'Venue',
            	iconCls: 'locate',
            	iconMask: true,
            	margin: 10,
				align: 'center',
            	handler: fnShowVenue,
            	width: '90%'
            },	
			{
            	xtype: 'button',
            	text: 'Travel & Hotels',
            	iconCls: 'travel',
            	iconMask: true,
            	margin: 10,
				align: 'center',
            	handler: fnShowTravelHotels,
            	width: '90%'
            },	
			{
            	xtype: 'button',
            	text: 'Workshop Location',
            	iconCls: 'workshop',
            	iconMask: true,
            	margin: 10,
				align: 'center',
            	handler: fnShowWorkshopInfo,
            	width: '90%'
            },			
			{
            	xtype: 'button',
            	text: 'Imprint',
            	iconCls: 'imprint',
            	iconMask: true,
            	margin: 10,
				align: 'center',
            	handler: fnShowImprint,
            	width: '90%'
            },
            {
            	xtype: 'button',
            	text: 'Credits',
            	iconCls: 'credits',
            	iconMask: true,
            	margin: 10,
				align: 'center',
            	handler: fnShowCredits,
            	width: '90%'
            }
		]
	}
});


function fnShowVenue(button, event) {
	
	var mainController = MeetingMirror.app.getController('MainController');
	var newsPage = Ext.create('MeetingMirror.view.about.HtmlPage', {
		title: 'Venue',
		url: 'resources/html/venue.html'
	});
	mainController.getMainNav().pushMask(newsPage);
}

function fnShowTravelHotels(button, event) {
	
	var mainController = MeetingMirror.app.getController('MainController');
	var newsPage = Ext.create('MeetingMirror.view.about.HtmlPage', {
		title: 'Travel & Hotels',
		url: 'resources/html/travelhotels.html'
	});
	mainController.getMainNav().pushMask(newsPage);
}

function fnShowWorkshopInfo(button, event) {
	
	var mainController = MeetingMirror.app.getController('MainController');
	var newsPage = Ext.create('MeetingMirror.view.about.HtmlPage', {
		title: 'Workshop Location',
		url: 'resources/html/workshop.html'
	});
	mainController.getMainNav().pushMask(newsPage);
}

function fnShowImprint(button, event) {
	
	var mainController = MeetingMirror.app.getController('MainController');
	var newsPage = Ext.create('MeetingMirror.view.about.HtmlPage', {
		title: 'Imprint',
		url: 'resources/html/imprint.html'
	});
	mainController.getMainNav().pushMask(newsPage);
}

function fnShowCredits(button, event) {
	
	var mainController = MeetingMirror.app.getController('MainController');
	var newsPage = Ext.create('MeetingMirror.view.about.HtmlPage', {
		title: 'Credits',
		url: 'resources/html/credits.html'
	});
	mainController.getMainNav().pushMask(newsPage);
}


