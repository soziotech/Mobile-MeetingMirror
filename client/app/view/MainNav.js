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
Ext.define('MeetingMirror.view.MainNav', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mainnav',

    requires: [
        'MeetingMirror.view.HomeContainer'
    ],

    config: {
		autoDestroy: false,
        navigationBar: {
			items: [
      			{
      				xtype: 'button',
      				iconCls: 'home',
      				iconMask: true,
      				align: 'right',
      				itemId: 'home-button',
      				handler: popToRoot
      			}
    		]
        },
        items: [
            {
                xtype: 'homeContainer',
                title: 'C&T 2013'
            }
        ]
    },
	pushMask: function(view) {
		Ext.Viewport.setMasked({ xtype: 'loadmask', text: ''});
		
		var mainView = this;
		var task = new Ext.util.DelayedTask(function(){
			
			// push view
			mainView.push(view);
					
			// Hide Loading Mask
			Ext.Viewport.setMasked(false);
		    
		});
		// Wait 500ms before calling our function
		task.delay(10);
		
		
	}
	
});

function popToRoot() {
	// Restart application
	window.location.reload();
}