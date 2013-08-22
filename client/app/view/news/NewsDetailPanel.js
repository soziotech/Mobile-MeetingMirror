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
Ext.define('MeetingMirror.view.news.NewsDetailPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.newsdetailpanel',

    config: {
		title: 'News Details',
        layout: {
             pack: 'start',
             type: 'vbox'
        },
        scrollable: 'vertical',
        items: [
            {
                xtype: 'container',
                itemId: 'info',
                layout: {
            		type: 'vbox'
            	},
            	defaults: {
            		margin: 5
            	},
            	items: [
            		{
            			xtype: 'component',
            			itemId: 'title',
            			tpl: new Ext.XTemplate(
            				'<h1>{name}</h1>',
            				'<small>Posted on {[this.getDate(values.createdDate)]} by {[this.getPersonsString(values.author,values.authorName,values.authorTwitter)]}</small>',
            				{
		                        getDate: function(createdDate) {
									var dateTime = Ext.Date.format(createdDate, 'F d, g:ia');
									return dateTime;
								},
            					getPersonsString: function(personIdent,authorName,authorTwitter) {
            						// here we should return the authors
            						var personName = "anonymous";

                                    // Should always have a valid ident									
                					if (!personIdent) {
										return personName;
                					}
									
                					if(typeof(personIdent) ==='object') personIdent = personIdent['$ref'];
                						
									// lookup persons in participants store
                					var personController = MeetingMirror.app.getController('Person');
                                    var name = personController.getPersonName(personIdent);
                						
									// is the author a registered participant?
                					if(name && name !== "") {
                                    	personName = '<a href="javascript:MeetingMirror.app.getPersonDetails(&quot;' + personIdent + '&quot;)">' + name + '</a>';
									} 
									// Twitter Account?
									else if(authorName && authorTwitter) {
                                        personName = '<a target="_blank" href="https://twitter.com/' + authorTwitter + '/">' + authorName + '</a>';
										
									}
            						
            						return personName;
            						
            					}
            				}
            				)
            		},
            		{
            			xtype: 'component',
            			itemId: 'data',
            			tpl: new Ext.XTemplate(
            			'<div class="detailfield">{[this.parseStringValue(values.stringValue)]}</div>',
                        '{[this.getWebsitesString(values.websites)]}',
                        '<div class="detailtitle">Tags</div><div class="detailfield">{[this.getTagsString(values.tags)]}</div>',
            			{
            				parseStringValue: function(stringValue) {
								stringValue = stringValue.replace(/\/\)/g,'/ )');
								var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
								var regex = new RegExp(expression);
								var split = stringValue.split(" ");
								for(var i=0; i< split.length; i++){
								    if(split[i].match(regex)){
								        var text = split[i].split(".").slice(1).join(".").split("/")[0];

								        split[i] = '<a href=\"' +split[i]+'\" target="_blank">'+text+'</a>';
								    }
								}
								var result = split.join(" ");
								result = result.replace(/ \)/g, ')');
								return result;
            				},
							getWebsitesString: function(websitesArray) {
            					// return the websites as clickable list
            					var websitesString = "";
            					
            					if (websitesArray === undefined || websitesArray.length == 0) return websitesString;
            					var website = websitesArray[0];
            					websitesString = '<div class="detailtitle">References</div><div class="detailfield">';
            					websitesString += '<a href="' + website + '" target="_blank">open external link in browser</a></div>';
            					return websitesString;
            				},
            				getTagsString: function(tagsArray) {
            					var tagsString = "none";

            					if (tagsArray === undefined || tagsArray.length == 0) return tagsString;
            					
            					tagsString = tagsArray[0];
            					for(var t=1; t < tagsArray.length; t++) {
            						var tag = tagsArray[t];
            						tagsString += ", " + tag;
            					}
            					
            					return tagsString;
            				}
            				
            			}
            			)
            		}
            	]
            }
        ]
    }

});