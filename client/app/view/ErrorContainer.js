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

Ext.define('MeetingMirror.view.ErrorContainer', {
    extend: 'Ext.Container',
    alias: 'widget.errorContainer',

    config: {
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
            	xtype: 'container',
            	html: '<h1>Error loading conference data.</h1>',
            	margin: 10,
            	align: 'center',
                hideOnMaskTap: false
            },
            {
            	xtype: 'container',
            	html: 'We apologize for any inconvenience.',
            	margin: 10,
            	align: 'center',
                hideOnMaskTap: false
            },           
            {
            	xtype: 'button',
            	text: 'Retry',
            	iconCls: 'refresh',
            	iconMask: true,
            	handler: fnBtnReload,
            	width: '90%'
            }
        ]
    }

});

function fnBtnReload(button, event) {
	// Restart application
	window.location.reload();
}

