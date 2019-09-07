import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import CustomEvent from "./CustomEvent";
import React from "react";

const localizer = momentLocalizer(moment);

export default function MyCalendar(eventList) {
    const redirectToEvent = (id) => {
        window.open("https://facebook.com/events/" + id, "_blank");
        // window.location.assign("https://facebook.com/events/" + id)
    };

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
