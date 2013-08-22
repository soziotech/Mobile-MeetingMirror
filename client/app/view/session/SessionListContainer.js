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
Ext.define('MeetingMirror.view.session.SessionListContainer', {

    extend: 'Ext.Container',
    alias: 'widget.sessionListContainer',
	requires: 'Ext.SegmentedButton',
    config: {
		layout: {
		            type: 'fit'
		},		
        items: [
            {
				itemId: 'sessionList',
                xtype: 'sessions',
                store: 'SessionStore',
                grouped: true,
                pinHeaders: false
            }
        ]
    }
});
