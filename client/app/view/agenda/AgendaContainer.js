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
Ext.define('MeetingMirror.view.agenda.AgendaContainer', {
	extend: 'Ext.Container',
	xtype: 'agendaContainer',

	config: {
        scrollable: 'vertical',
        cls: 'htmlPage',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        defaults: {
            margin: 5
        }
    },
    
	initialize: function() {

		 Ext.Ajax.request({
            url: 'data/agenda.html',
            success: function(rs) {
                this.setHtml(rs.responseText);
            },
            scope: this
        });
	}
});
