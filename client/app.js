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

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
	'Ext.ux': 'ux',
    'Ext': 'touch/src',
    'MeetingMirror': 'app'
});
//</debug>

Ext.require('MeetingMirror.util.Proxy');

Ext.application({
    name: 'MeetingMirror',
    proxyUrl: 'http://data.communitymashup.net/data/data.php',
  	vcalUrl: 'http://data.communitymashup.net/data/vcal.php',
    icon: {
        '57': 'resources/icons/icon.png',
        '72': 'resources/icons/icon@72.png',
        '114': 'resources/icons/icon@114.png',
        '144': 'resources/icons/icon@144.png'
    },

    isIconPrecomposed: false,

    startupImage: {
        '320x460': 'resources/startup/320x460.png',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png'
    },
    
    requires: [
      'MeetingMirror.util.Proxy',
      'Ext.dataview.List',
      'Ext.data.proxy.JsonP',
      'Ext.Img',
      'Ext.Panel',
      'Ext.tab.Panel',
      'Ext.Container',
      'Ext.XTemplate',
      'Ext.form.Panel',
	  'Ext.util.DelayedTask'
      ],

    models: ['Location',
      'Organisation',
      'Publication',
      'Person',
      'NewsItem',
      'Session',
	  'Hotel'
      ],
      stores: ['LocationStore',
      'PersonStore',
      'PublicationStore',
      'OrganisationStore',
      'NewsStore',
      'SessionStore',
	  'HotelStore'
      ],
      views: [
      'MainNav',
      'HomeContainer',
      'ErrorNav',
      'ErrorContainer',
      'person.PersonDetailPanel',
	  'person.PersonList',
      'person.PersonListContainer',
      'person.PersonPublicationListContainer',
      'person.PersonPublicationDetailContainer',
	  'person.PersonSessionListContainer',
      'news.NewsListContainer',
      'news.NewsDetailPanel',
      'agenda.AgendaContainer',
      'organisation.OrganisationListContainer',
      'organisation.OrganisationDetailPanel',
      'organisation.OrganisationPersonListContainer',
      'about.AboutContainer',
      'about.HtmlPage',
      'session.SessionListContainer',
      'session.SessionList',
      'session.SessionDetail',
	  'location.LocationContainer'
      ],
      controllers: [
        'MainController',
        'Person',
        'Publication',
        'Organisation',
        'Location',
        'News',
        'Sessions'
		//,'Map'
        ],

    launch: function() {
        // Show Loading Mask
		  Ext.Viewport.setMasked({ xtype: 'loadmask' });

		  // Load Data                  
		  MeetingMirror.util.Proxy.process(this.proxyUrl, function(success) {

			if(success) {
			  // Load Main Navigation
			  Ext.create('MeetingMirror.view.MainNav', {fullscreen: true});
			} else {
			  // Load Error
			  Ext.create('MeetingMirror.view.ErrorNav', {fullscreen: true});
			}

			// Hide Loading Mask
			Ext.Viewport.setMasked(false);
		  });
    },
    fnError: function(e) {
                    	// log in case of any errors
                    	console.log(e);
    },
    getPersonDetails: function (personIdent) {
    					var personController = MeetingMirror.app.getController('Person');
    					personController.showPersonDetailsWithIdent(personIdent);
				   },
				   showPersonDetailsByLastname : function(lastname) {

				   		var personController = MeetingMirror.app.getController('Person');
						var person = personController.getPersonWithLastname(lastname);
						if(person) {
							personController.showPersonDetailsWithIdent(person.ident);
						}
				   },
	getPublicationDetails: function(publicationIdent) {
    	var publicationController = MeetingMirror.app.getController('Publication');  	
		publicationController.showPublicationDetails(publicationIdent);
    	
	}			   

});
						//console.log(person);
						if(person) {
							personController.showPersonDetailsWithIdent(person.ident);
						}
				   },
	getPublicationDetails: function(publicationIdent) {
    	var publicationController = MeetingMirror.app.getController('Publication');  	
		publicationController.showPublicationDetails(publicationIdent);
    	
	}			   

});
