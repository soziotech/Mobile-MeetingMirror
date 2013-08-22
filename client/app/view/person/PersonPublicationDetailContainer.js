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
Ext.define('MeetingMirror.view.person.PersonPublicationDetailContainer', {
	extend: 'Ext.Container',
	alias: 'widget.personPublicationDetailContainer',
	
	config: {
		scrollable: 'vertical',
		layout: {
			type: 'vbox'
		},
		defaults: {
			margin: 10
		},
		items: [
			{
				// title, author
				xtype: 'panel',
				itemId: 'publicationDetails',
				tpl: new Ext.XTemplate ('<h1>{name}</h1>',
					'<div class="detailtitle">Authors</div><div class="detailfield">{[this.getAuthors(values.author, values.contributors)]}</div>',
					'<div class="detailtitle">Abstract</div><div class="detailfield">{stringValue}</div>',
					'<div class="detailtitle">Tags</div><div class="detailfield">{[this.getTagsString(values.tags)]}</div>',
					'<div class="detailtitle">Source</div><div class="detailfield">{[this.getSourceString(values.source)]}</div>',
				{

                        getAuthors: function(authorIdent, contributorsArray) {
                            // organisation informations
                            var personController = MeetingMirror.app.getController('Person');

                            var authorsString = "";
                            if (!authorIdent) return authorsString;

                            var authorName = personController.getPersonName(authorIdent);
                            authorsString += '<a href="javascript:MeetingMirror.app.getPersonDetails(&quot;' + authorIdent + '&quot;)">' + authorName + '</a>';

                            for(var i=0; i < contributorsArray.length; i++) {
                            	var contIdent = contributorsArray[i];
                            	if (!contIdent) continue;
                            	var contName = personController.getPersonName(contIdent);

                            	if(authorsString != "") authorsString += ', ';
                            	authorsString += '<a href="javascript:MeetingMirror.app.getPersonDetails(&quot;' + contIdent + '&quot;)">' + contName + '</a>';
                            }
                            
                            return authorsString;
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
            				},
            				getSourceString: function(sourceLink) {
            					var sourceString = "";
            					if (!sourceLink) return sourceString;
            					sourceString += '<a href="' + sourceLink + '" target="_blank">open external link in browser</a></div>';
            					return sourceString;
            				}
				})
			}
		]
	}
	
});