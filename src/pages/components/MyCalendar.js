import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import CustomEvent from "./CustomEvent";
import React from "react";
import {Route} from "react-router-dom";

const localizer = momentLocalizer(moment);

export default function MyCalendar(eventList) {
    const redirectToEvent = (id) => {
        const url = "facebook.com/" + id;
        window.open(url, '_blank');
    }

	return (
		<Calendar
			events={eventList}
			localizer={localizer}
			//defaultDate={new Date()}
			components={{
				event: CustomEvent
			}}
            onSelectEvent={(selectedEvent) => redirectToEvent(selectedEvent.id)}
		/>
	);
}
