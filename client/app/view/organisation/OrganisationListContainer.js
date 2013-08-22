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
Ext.define('MeetingMirror.view.organisation.OrganisationListContainer', {
    extend: 'Ext.Container',
    alias: 'widget.organisationListContainer',

    config: {
    	layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'list',
                itemId: 'organisationList',
                grouped: true,
				indexBar: true,
				pinHeaders: false,
                itemTpl: [
                	'{name}'
                ],
                store: 'OrganisationStore'
            }
        ],
        listeners: [
            {
                fn: 'onOrganisationListItemTap',
                event: 'itemtap',
                delegate: '#organisationList'
            }
        ]
    },

    onOrganisationListItemTap: function(dataview, index, target, record, e, options) {
        var info, details;
        var organisationController = MeetingMirror.app.getController('Organisation');

        if (record) {

            details = Ext.create('MeetingMirror.view.organisation.OrganisationDetailPanel', {
    			title: 'Organization',
    			personIdent: record.get('ident')
    	   });
    	
        	// set the info
            info = details.child('#organisationDetailPanelInfo');
            info.setData(record.data);
        	
        	organisationController.getMainNav().pushMask(details);
        }
    }
});