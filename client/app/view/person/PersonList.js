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
Ext.define('MeetingMirror.view.person.PersonList', {

	extend: 'Ext.List',

	xtype: 'personList',

	config: {
		autoDestroy: false,
        variableHeights: true,
        //useSimpleItems: true,
        itemTpl: new Ext.XTemplate (
            '{[this.getName(values.name, values.firstname, values.lastname)]}<br/>',
            '<small>{[this.getMetaTagsAndOrganisationString(values.metaTags,values.organisations)]}</small>',
            {
            getName: function(name, firstname, lastname) {
                    
					var strName = "";
					if(firstname && lastname) {
						strName = lastname + ", " + firstname; 
					} else if(name) {
						strName = name;
					}
					return strName;
				},
            getMetaTagsAndOrganisationString: function(metaTagsArray, organisationArray) {
                            		var resultString = "";
                            		if (metaTagsArray && metaTagsArray.length > 0) {
                                        resultString = this.getMetaTagsString(metaTagsArray);
                                    }
                            		
                                    if(organisationArray && organisationArray.length > 0) {
                                        var organisationString = this.getOrganisationString(organisationArray);
                                        if(organisationString && organisationString !== "") {
                                            if(resultString !== "")  resultString += ", ";
                                            resultString += organisationString;
                                        }
                                    }
                            		
                                    return resultString;
                            	}
            , getMetaTagsString: function(metaTagsArray) {
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
                    return metaTagString;
            },


                getOrganisationString: function(organisationArray) {
                    // organisation informations
                    var organisationController = MeetingMirror.app.getController('Organisation');
                    var organisationString = "";
                    if (!organisationController) return organisationString;
                    if (!organisationArray) return organisationString;
                    if (organisationArray.length == 0) return organisationString;
                    var organisation = organisationArray[0];
                    if (!organisation) return organisationString;

                    organisationString = organisationController.getOrganisationName(organisation);
                    
                    return organisationString;
                }
        }
        )
		
	}
});
