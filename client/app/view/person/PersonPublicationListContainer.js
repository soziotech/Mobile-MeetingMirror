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
Ext.define('MeetingMirror.view.person.PersonPublicationListContainer', {
	extend: 'Ext.Container',
    alias: 'widget.personPublicationListContainer',
    
    config: {
		autoDestroy: false,
        layout: {
            type: 'fit'
        },
        items: [
        		{
                    title: 'Author',
                    itemId: 'publications',
                	xtype: 'list',
                	itemId: 'publicationList',
                	autoDestroy: false,
                	iconMask: true,
                	itemTpl: [
                		'{name}<br />',
						'<small>{[this.getAuthors(values.author, values.contributors)]}</small>',
						{
	                        getAuthors: function(authorIdent, contributorsArray) {
	                            // organisation informations
	                            var personController = MeetingMirror.app.getController('Person');

	                            var authorsString = "";
	                            if (!authorIdent) return authorsString;

	                            var authorName = personController.getPersonName(authorIdent);
	                            authorsString += authorName;

	                            for(var i=0; i < contributorsArray.length; i++) {
	                            	var contIdent = contributorsArray[i];
	                            	if (!contIdent) continue;
	                            	var contName = personController.getPersonName(contIdent);

	                            	if(authorsString != "") authorsString += ', ';
	                            	authorsString += contName;
	                            }
                            
	                            return authorsString;
	                        }
						}
                	]					
            	}
        ],
        
        listeners: [
        	{
        		fn: 'onPublicationListItemTap',
        		event: 'itemtap',
        		delegate: '#publicationList'
        	}
        ]
    },
    
    onPublicationListItemTap: function(dataview, index, target, record, e, options){
    	var details, publi;
    	var publicationController = MeetingMirror.app.getController('Publication');
    	
    	if (record) {
    		details = Ext.create('MeetingMirror.view.person.PersonPublicationDetailContainer', {
    			title:'Paper'
    		});
    		
    		// set the info
    		details.child('#publicationDetails').setData(record.data);  		
    		publicationController.getMainNav().pushMask(details);
    	}
    }
});