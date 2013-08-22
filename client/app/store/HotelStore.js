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
Ext.define('MeetingMirror.store.HotelStore', {
    extend: 'Ext.data.Store',
   
    
    config: {
        autoLoad: false,
        autoSync: false,
        model: 'MeetingMirror.model.Hotel',
        storeId: 'HotelStore',
        syncRemovedRecords: false
    }
});