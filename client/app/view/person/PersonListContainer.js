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
Ext.define('MeetingMirror.view.person.PersonListContainer', {
    extend: 'Ext.Container',
    alias: 'widget.personListContainer',

    config: {
        layout: {
            type: 'fit'
        },
       items: [
            {
				autoDestroy: false,
                xtype: 'personList',
                store: 'PersonStore',
				id: 'personList',
                grouped: true,
                pinHeaders: false,
				indexBar: true
            }
        ]
    }
});