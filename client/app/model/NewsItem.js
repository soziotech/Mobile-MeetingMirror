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
Ext.define('MeetingMirror.model.NewsItem', {
		
		extend: 'Ext.data.Model',
		
		config: {
			idProperty: 'ident',
			fields: [

				{
					name: 'ident'
				},
				{
					name: 'sortOrder'
				},
				{
					name: 'createdDate',
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
				{
					name: 'name'
				},
				{
					name: 'stringValue'
				},
				{
					name: 'author'
				},
				{
					name: 'authorName'
				},
				{
					name: 'authorTwitter'
				},
				{
					name: 'imageUrl'
				},
				{
					name: 'websites'
				},
				{
					name: 'tags'
				}
			]
		}

});
