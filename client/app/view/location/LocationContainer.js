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
Ext.define('MeetingMirror.view.location.LocationContainer', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
	requires: ['Ext.ux.LeafletMap'],
	
    config: {
		tabBar: {
			docked: 'bottom'
		},
		
        items: [
            {
                title: 'Workshops',
                iconCls: 'workshop',
				layout: 'fit',
				ui: 'round', 
                items: [
					{
						// Ext.ux.LeafletMap Component
						xtype: 'leafletmap',
						itemId: 'workshopMap',
						useCurrentLocation: false,
						autoMapCenter: false,
                        enableOwnPositionMarker: true,
						mapOptions: {
							zoom: 14
						},
						listeners : {
						      'maprender' : onWorkshopMapRender
						}
					}
				]
            },
            {
                title: 'Conference',
                iconCls: 'locate',
				layout: 'fit',
                items: [
					{
						// Ext.ux.LeafletMap Component
						xtype: 'leafletmap',
						itemId: 'conferenceMap',
						useCurrentLocation: false,
						autoMapCenter: false,
                        enableOwnPositionMarker: true,
						mapOptions: {
							zoom: 14
						},
						listeners : {
						      'maprender' : onConferenceMapRender
						}
					}
				]
            },
            {
                title: 'Hotels',
                iconCls: 'home',
				layout: 'fit',
                items: [
					{
						// Ext.ux.LeafletMap Component
						xtype: 'leafletmap',
						itemId: 'hotelMap',
						useCurrentLocation: false,
						autoMapCenter: false,
                        enableOwnPositionMarker: true,
						mapOptions: {
							zoom: 14
						},
						listeners : {
						      'maprender' : onHotelMapRender
						}
					}
				]
            }
			
        ]
    }
});
function onWorkshopMapRender(component, map, layer) {

	component.setMapCenter({'latitude':48.146,'longitude':11.568646});	
	var marker = L.marker([48.148679, 11.568646]).addTo(map).bindPopup('<b>TUM Main Campus</b><br/>Arcisstrasse&nbsp;21<br/><hr/>Workshops on Sat+Sun').openPopup();

}
function onConferenceMapRender(component, map, layer) {

	component.setMapCenter({'latitude':48.141714334487915,'longitude':11.56212329864502});
	L.marker([48.14376075, 11.5516629421438]).addTo(map).bindPopup('<b>Augustinerkeller</b><br/>Arnulfstraße&nbsp;52<br/><hr/>Social Event on Monday');

	L.marker([48.138127, 11.564033]).addTo(map).bindPopup('<b>Kolpinghaus</b><br/>Adolf-Kolping-Straße&nbsp;1<br/><hr/>Sessions on Mon+Tue').openPopup();
	
}
function onHotelMapRender(component, map, layer) {

	component.setMapCenter({'latitude':48.141714334487915,'longitude':11.56212329864502});
	
	var hotelStore = Ext.data.StoreManager.lookup('HotelStore');
	var locationStore = Ext.data.StoreManager.lookup('LocationStore');
	var personStore = Ext.data.StoreManager.lookup('PersonStore');
	
	for(var h=0; h < hotelStore.getCount(); h++) {
		var hotel = hotelStore.getAt(h);
		
		if(hotel && hotel.data && hotel.data.locations && hotel.data.locations.length > 0 && hotel.data.guests && hotel.data.guests.length >0) {
			var locationIdent = hotel.data.locations[0];
			var location = locationStore.getById(locationIdent);
			if(!location || !location.data || !location.data.latitude || !location.data.longitude) continue;
			
			var popup = '<b>'+location.data.name+'</b>';
			if(location.data.street) {
				popup += '<br/>'+location.data.street;
				if(location.data.houseNumber) popup += '&nbsp;'+location.data.houseNumber;
			} 
			popup += '<br/><hr/>';
			for(var g=0; g < hotel.data.guests.length; g++) {
				var personIdent = hotel.data.guests[g];
				if(!personIdent) continue;
				var person = personStore.getById(personIdent);
				if(!person) continue;
				popup += person.data.lastname + ',&nbsp;' + person.data.firstname + '<br/>';
			}
			L.marker([location.data.latitude, location.data.longitude]).addTo(map).bindPopup(popup);
		}
		
	}
	
}
