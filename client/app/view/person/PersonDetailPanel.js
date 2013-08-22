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
Ext.define('MeetingMirror.view.person.PersonDetailPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.persondetailpanel',

    config: {
        tabBar: {
            docked: 'top',
            ui: 'light',
            layout: {
                pack: 'center',
                type: 'hbox'
            }
        },
        //DONT! itemId: 'personDetailPanel',
        items: [
            {
                xtype: 'container',
                title: 'About',
                itemId: 'personDetailPanelInfo',
				//autoDestroy: false,
                margin: 10,
                scrollable: 'vertical',
                layout: {
                    type: 'fit'
                },
                tpl: new Ext.XTemplate (
                    '<tpl if="imageUrl !== undefined"><div style="padding: 10px;">{[this.getImageUrl(values.imageUrl)]}</div></tpl>',
                    '<tpl if="imageUrl == undefined"><div style="padding: 10px;"><img src="resources/images/user.png" width="100px" height="120px" style="max-width:100px; max-height:120px; border:1px solid black;"></div></tpl>',
					'{[this.getName(values.name, values.firstname, values.lastname)]}',
                    '<tpl if="organisations !== undefined">{[this.getOrganisationString(values.organisations)]}</tpl>',
                    '<tpl if="email !== undefined">{[this.getEmail(values.email)]}</tpl>',
                    '<tpl if="twitter !== undefined">{[this.getTwitter(values.twitter)]}</tpl>',
                    '<tpl if="mendeley !== undefined">{[this.getMendeley(values.mendeley)]}</tpl>',
                    '<tpl if="websites !== undefined">{[this.getWebsite(values.websites)]}</tpl>',
                    '<tpl if="metaTags !== undefined">{[this.getMetaTagsString(values.metaTags)]}</tpl>',
                    '<tpl if="tags !== undefined">{[this.getTagsString(values.tags)]}</tpl>',
                    {
						getImageUrl: function(imageUrl) {
							if(!imageUrl || imageUrl === "") imageUrl = "resources/images/user.png"
							
							return '<img src="'+ imageUrl + '" style="max-width:100px; max-height:120px; border:1px solid black;">'
						},
                        getName: function(name, firstname, lastname) {
                            var strName = "";
                            if(firstname && lastname) {
                                strName = firstname + " " + lastname; 
                            } else if(name) {
                                strName = name;
                            }
                            return '<div class="detailtitle">Name</div><div class="detailfield">' + strName + '</div>';
                        },
                        getOrganisationString: function(organisationArray) {
                            // organisation informations
                            var organisationController = MeetingMirror.app.getController('Organisation');
                            var organisationString = "";
                            if (!organisationArray) return organisationString;
                            if (organisationArray.length == 0) return organisationString
                            var organisationIdent = organisationArray[0];
                            if (!organisationIdent) return organisationString;

                            organisationString = '<a href="javascript:onOrganisationClicked(&quot;' + organisationIdent + '&quot;)">' + organisationController.getOrganisationName(organisationIdent) + '</a>';
                            organisationString = '<div class="detailtitle">Organization</div><div class="detailfield">' + organisationString + '</div>';
                            
                            return organisationString;
                        },
                        getEmail: function(email) {
                            if (!email) return "";
                            
                            if(email instanceof Array && email.length > 0) {
                                email = email[0];
                            }
                            
                            return '<div class="detailtitle">Email Address</div><div class="detailfield"><a target="_blank" href="mailto:' + email + '">' + email + '</a></div>';
                            
                        },
                        getTwitter: function(twitter) {
                            if (!twitter) return "";
                            
                            return '<div class="detailtitle">Twitter</div><div class="detailfield"><a target="_blank" href="https://twitter.com/' + encodeURIComponent(twitter.replace("@","")) + '/">' + twitter + '</a></div>';
                            
                        },
                        getMendeley: function(mendeley) {
                            if (!mendeley) return "";
                            
                            return '<div class="detailtitle">Mendeley</div><div class="detailfield"><a target="_blank" href="http://www.mendeley.com/profiles/' + encodeURIComponent(mendeley.replace(" ","-")) + '/">' + mendeley + '</a></div>';
                            
                        },
                        getWebsite: function(websites) {
                            if (!websites) return "";
                            if (websites.length === 0) return "";
                            var website = websites[0];
                            
                            return '<div class="detailtitle">Website</div><div class="detailfield">' + this.getWebsitesString(website) + '</div>';
                            
                        },
                        
                        getWebsitesString: function(websitesArray) {
                            // return the websites as clickable list
                            var websitesString = "";
                            
                            if (websitesArray instanceof Array) {
                            
                                if (websitesArray.length == 0 || websitesArray === undefined) return websitesString;
                            
                                // only single website
                                var website = websitesArray[0];
                                websitesString = '<a href="' + website + '" target="_blank">' + 'open external link in browser' + '</a>';
                            
                            } else {
                                var website = websitesArray;
                                websitesString = websitesString + '<a href="' + website + '" target="_blank">' + 'open external link in browser' + '</a>';
                            }
                            return websitesString;
                        },
                        getMetaTagsString: function(metaTagsArray) {
                            var metaTagString = "";
                            // Parse MetaTags
                            for (var mta=0; mta < metaTagsArray.length; mta++) {
                                var metaTag = metaTagsArray[mta];
                                if (metaTag === "committee_conference_cochair") metaTagString += "Conference co-chair, ";
                                if (metaTag === "committee_paper_cochair") metaTagString += "Paper co-chair, ";
                                if (metaTag === "committee_workshop_cochair") metaTagString += "Workshop co-chair, ";
                                if (metaTag === "committee_doctoral_consortium_chair") metaTagString += "Doctoral consortium chair, ";
                                if (metaTag === "committee_student_volunteer_cochair") metaTagString += "Student volunteer co-chair, ";
								if (metaTag === "org") metaTagString += "Organizing team, ";
								if (metaTag === "sv") metaTagString += "Student volunteer, "; 
								if (metaTag === "workshop") metaTagString += "Workshop participant, ";                                               
                                if (metaTag === "publication") metaTagString += "Author, ";
                                if (metaTag === "agendaitem_presenter") metaTagString += "Speaker, ";
                              }
                            if(metaTagString === "") 
                                metaTagString = "Participant";
                            else
                                metaTagString = metaTagString.slice(0, -2);
                            return '<div class="detailtitle">Conference Information</div><div class="detailfield">' + metaTagString + '</div>'; 
                        },
                        getTagsString: function(tagsArray) {
                                var tagsString = "";
                                if (tagsArray === undefined || tagsArray.length == 0) return tagsString;
                                
                                tagsString = tagsArray[0];
                                for(var t=1; t < tagsArray.length; t++) {
                                    var tag = tagsArray[t];
                                    tagsString += ", " + tag;
                                }
                                
                                return '<div class="detailtitle">Tags</div><div class="detailfield">' + tagsString + '</div>'; 
                            }
                        }
                )
            }
        ]
    }

});

function onOrganisationClicked(organisation) {
    var organisationController = MeetingMirror.app.getController('Organisation');  
   organisationController.getOrganisationDetails(organisation);
}