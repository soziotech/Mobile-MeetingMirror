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
Ext.define('MeetingMirror.model.Hotel', {
	extend: 'Ext.data.Model',
	
	config: {
		idProperty: 'ident',
		fields: [
			{
				name: 'ident'
			},
			{
				name: 'name'
			},
			{
				name: 'locations'
			},
			{
				name: 'guests'
			}
		]
	}
});