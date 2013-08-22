<?php

/*******************************************************************************
 * Copyright (c) 2013 Martin Burkhard - Cooperation Systems Center Munich (CSCM).
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     Martin Burkhard - Design and initial implementation
 *
 * Description:
 *     Generates a calendar entry for mobile devices using VCALENDAR format.
 *
 * Source: 
 *     https://gist.github.com/jakebellacera/635416
 ******************************************************************************/

date_default_timezone_set('Europe/Berlin');

// Fetch vars
$event = array(
	'id' => $_GET['id'],
	'title' => $_GET['title'],
	'description' => $_GET['description'],
    'location' => $_GET['location'],
	'datestart' => $_GET['datestart'],
	'dateend' => $_GET['dateend']
);

// Build the ics file
$ical = 'BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cooperation Systems Center Munich//Mobile MeetingMirror//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART;TZID=Europe/Berlin:' . $event['datestart'] . '
DTEND;TZID=Europe/Berlin:' . $event['dateend'] . '
UID:' . md5($event['title']) . '
DTSTAMP:' . time() . '
LOCATION:' . stripslashes($event['location']) . '
DESCRIPTION:' . addslashes($event['description']) . '
URL;VALUE=URI:http://www.ct2013.cnss.de/program/ ' . '
SUMMARY:' . addslashes($event['title']) . '
CATEGORIES:BUSINESS,CONFERENCE
TRANSP:TRANSPARENT
CLASS:PUBLIC
BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:C&T Event
END:VALARM
END:VEVENT
END:VCALENDAR';

if($event['id']){
	header('Content-type: text/calendar; charset=utf-8');
	header('Content-Disposition: attachment; filename=ct2013-event.ics');
	echo $ical;
} else {
	// If $id isn't set, then kick the user back to home. Do not pass go, and do not collect $200.
	header('Location: /');
}
?>

