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
Ext.define('MeetingMirror.view.organisation.OrganisationPersonListContainer', {
    extend: 'Ext.Container',
    alias: 'widget.organisationPersonListContainer',

    config: {
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'list',
                itemId: 'organisationPersonList',
                itemTpl: [
                    '{lastname}, {firstname}'
                ],
                store: 'PersonStore'
            }
        ],
        listeners: [
            {
                fn: 'onPersonListItemTap',
                event: 'itemtap',
                delegate: '#organisationPersonList'
            }
        ]
    },

    onPersonListItemTap: function(dataview, index, target, record, e, options) {
        var personController = MeetingMirror.app.getController('Person');

        if (record) { 
    		personController.showPersonDetailsWithIdent(record.get('ident'));
        }
    }

});