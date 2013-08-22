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
Ext.define('MeetingMirror.controller.Map', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mapCmp: '#workshopMap',
			mapCmp2: '#conferenceMap',
			mapCmp3: '#hotelMap'
        },
        control: {
            mapCmp: {
                maprender: 'onWorkshopMapRender'
            },
            mapCmp2: {
                maprender: 'onConferenceMapRender'
            },
            mapCmp3: {
                maprender: 'onHotelMapRender'
            }
        }
    },
    onWorkshopMapRender: function(component, map, layer) {

    },
    onConferenceMapRender: function(component, map, layer) {

		component.setMapCenter({'latitude':48.141714334487915,'longitude':11.56212329864502});

		L.marker([48.138127, 11.564033]).marker2.addTo(map).bindPopup('<b>Kolpinghaus</b><br/>Adolf-Kolping-Straße&nbsp;1<br/>Workshops on Sat+Sun');
		
		L.marker([48.14376075, 11.5516629421438]).marker3.addTo(map).bindPopup('<b>Augustinerkeller</b><br/>Arnulfstraße&nbsp;52<br/>Social Event');
    },
    onHotelMapRender: function(component, map, layer) {

		component.setMapCenter({'latitude':48.138127,'longitude':11.564033});
		
    }
});