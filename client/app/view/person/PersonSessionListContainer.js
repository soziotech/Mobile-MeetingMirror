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
Ext.define('MeetingMirror.view.person.PersonSessionListContainer', {
	extend: 'Ext.Container',
    alias: 'widget.personSessionListContainer',
    
    config: {
        layout: {
            type: 'fit'
        },
		title: 'Speaker',
        items: [
        		{
                	xtype: 'list',
                	itemId: 'sessionList',
                	autoDestroy: false,
                	iconMask: true,
                	itemTpl: [
                    '{title}<br />',
					'<small>{[this.getDate(values.start_time)]}</small>',
					{
                        getDate: function(startDate) {
							var dateTime = Ext.Date.format(startDate, 'l, F d, g:ia');
							return dateTime;
						}
					}
                		
                	]					
            	}
        ],
        
        listeners: [
        	{
        		fn: 'onSessionListItemTap',
        		event: 'itemtap',
        		delegate: '#sessionList'
        	}
        ]
    },
    
    onSessionListItemTap: function(dataview, index, target, record, e, options){
    	
    	var sessionController = MeetingMirror.app.getController('Sessions');    
    	
    	if (record) {
    		sessionController.showSessionDetails(record);
    	}
    }
});