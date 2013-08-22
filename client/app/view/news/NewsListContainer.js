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
Ext.define('MeetingMirror.view.news.NewsListContainer', {
    extend: 'Ext.Container',
    alias: 'widget.newsListContainer',

    config: {
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'list',
                itemId: 'newsList',
                autoDestroy: false,
                itemTpl: [
                    '{name}<br />',
					'<small>{[this.getDate(values.createdDate)]}</small><br />',
					{
                        getDate: function(createdDate) {
							var dateTime = Ext.Date.format(createdDate, 'F d, g:ia');
							return dateTime;
						}
					}
                ],
                store: 'NewsStore'
            },
			{
				xtype: 'toolbar',
				ui: 'neutral',
				docked: 'bottom',
				autoDestroy: false,
				items: [
				{ 	
					xtype: 'spacer'},
					{
			            xtype: 'component',
			            html: 'Twitter-Hashtag: <a href="https://twitter.com/search?q=%23comtech13" target="_blank">#comtech13</a>'
	
					},
					{ xtype: 'spacer'}
				]
			}
        ],
        listeners: [
            {
                fn: 'onNewsListItemTap',
                event: 'itemtap',
                delegate: '#newsList'
            }
        ]
    },

    onNewsListItemTap: function(dataview, index, target, record, e, options) {
        var info, details;
        var newsController = MeetingMirror.app.getController('News');

        if (record) {
            details = Ext.create('MeetingMirror.view.news.NewsDetailPanel', {});

            // set the info
            info = details.child('#info');
            info.child('#data').setData(record.data);
            info.child('#title').setData(record.data);

            newsController.getMainNav().pushMask(details);
        }
    }

});