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
Ext.define('MeetingMirror.model.Session', {
	extend: 'Ext.data.Model',

	config: {
		idProperty: 'ident',
		fields: [
			'ident',
			'title',
			'description',
			'locationIdent',
			'building',
			'floor',
			'room',
			'day',
			{
				name: 'start_time',
				type: 'date',
				convert: function(value, record) {
					if (value) {
						var dateArr = value.split(/[\-T:]/);
						var date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], dateArr[3], dateArr[4]);
						return date;
					} else {
						return new Date();
					}
				}
			},			
			{
				name: 'end_time',
				type: 'date',
				convert: function(value, record) {
					if (value) {
						var dateArr = value.split(/[\-T:]/);
						return new Date(dateArr[0], dateArr[1] - 1, dateArr[2], dateArr[3], dateArr[4]);
					} else {
						return new Date();
					}
				}
			},
			'chairIdents',
			'speakerIdents',
			'publicationIdents',
			'session_type',
			'website'
		]
	}
});
