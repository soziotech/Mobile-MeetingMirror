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
Ext.define('MeetingMirror.view.HomeContainer', {
    extend: 'Ext.Container',
    alias: 'widget.homeContainer',

    config: {
		autoDestroy: false,
        layout: {
            type: 'vbox',
            align: 'center'
        },
        scrollable: 'vertical',
        defaults: {
        	margin: 5
        },
        items: [
            {
                xtype: 'container',
                html: '<img src="resources/images/logo.png" height=150 />',
                margin: 10,
                align: 'center',
                hideOnMaskTap: false
            },
            {
            	xtype: 'button',
            	text: 'News & Tweets',
            	iconCls: 'bookmarks',
            	iconMask: true,
            	handler: fnBtnNews,
            	width: '90%'
            },
            {
                xtype: 'button',
                text: 'Program',
                iconCls: 'time',
                iconMask: true,
                handler: fnBtnAgenda,
                width: '90%'
            },
            {
            	xtype: 'button',
            	text: 'Participants',
            	iconCls: 'team',
            	iconMask: true,
            	handler: fnBtnPersons,
            	width: '90%'
            },
            {
            	xtype: 'button',
            	text: 'Organizations',
            	iconCls: 'list',
            	iconMask: true,
            	handler: fnBtnOrganisations,
            	width: '90%'
            },
			{
            	xtype: 'button',
            	text: 'Locations',
            	iconCls: 'locate',
            	iconMask: true,
            	handler: fnBtnLocations,
            	width: '90%'				
			},
            {
            	xtype: 'button',
            	text: 'About C&T',
            	iconCls: 'help',
            	iconMask: true,
            	handler: fnBtnAbout,
            	width: '90%'
            }
        ]
    }

});
function fnBtnPersons(button, event) {
	// Get Person Controller and PersonList
	var personController = MeetingMirror.app.getController('Person');
	var personList = personController.getPersonList();
	
	// Initialize PersonList
	if(personList === undefined) {
		
		// Create new person list container and
		personList = Ext.create('MeetingMirror.view.person.PersonListContainer', {
			title: 'Participants'
		});
	}
	// Show PersonList
	personController.getMainNav().pushMask(personList);
}

function fnBtnNews(button, event) {
	var mainController = MeetingMirror.app.getController('MainController');
	var newsPage = Ext.create('MeetingMirror.view.news.NewsListContainer', {
		title: 'News & Tweets'
	});
	mainController.getMainNav().pushMask(newsPage);
}

function fnBtnAgenda(button, event) {
    var mainController = MeetingMirror.app.getController('MainController');
    var agendaPage = Ext.create('MeetingMirror.view.session.SessionListContainer', {
        title: 'Program'
    });
    mainController.getMainNav().pushMask(agendaPage);
}

function fnBtnOrganisations(button, event) {
	var mainController = MeetingMirror.app.getController('MainController');
	var orgPage = Ext.create('MeetingMirror.view.organisation.OrganisationListContainer', {
		title: 'Organizations'
	});
	mainController.getMainNav().pushMask(orgPage);
}

function fnBtnLocations(button, event) {
	var mainController = MeetingMirror.app.getController('MainController');
	var page = Ext.create('MeetingMirror.view.location.LocationContainer', {
		title: 'Locations'
	});
	mainController.getMainNav().pushMask(page);
}

function fnBtnAbout(button, event) {
	var mainController = MeetingMirror.app.getController('MainController');
	var page = Ext.create('MeetingMirror.view.about.AboutContainer', {
		title: 'About'
	});
	mainController.getMainNav().pushMask(page);
}


