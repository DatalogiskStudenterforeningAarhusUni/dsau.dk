import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import React from "react";


const localizer = momentLocalizer(moment);

export default function MyCalendar(eventList) {
	const redirectToEvent = id => {
		window.open("https://facebook.com/events/" + id, "_blank");
		// window.location.assign("https://facebook.com/events/" + id)
	};

	function CustomEvent({ event }) {
		return (
			<div>
				<em>{event.name}</em>
				<p>{event.description}</p>
				<p>Placering: {event.location}</p>
			</div>
		);
	}

	function CustomEventAgenda({ event }) {
		return (
			<div>
				<em>{event.name}</em>
				<p>{event.description}</p>
				<p>Placering: {event.location}</p>
				<a style={{color: '#81c341'}} href={"https://facebook.com/events/" + event.id} target={"_blank"}>Facebook event</a>
			</div>
		);
	}


	function eventStyleGetter() {
		const backgroundColor = "#" + 424242;
		const style = {
			backgroundColor: backgroundColor,
			borderRadius: "5px",
			opacity: 0.8,
			color: "white",
			border: "0px",
			display: "block",
		};
		return {
			style: style
		};
	}

	return (
		<Calendar
			events={eventList}
			localizer={localizer}
			//defaultDate={new Date()}
			components={{
				event: CustomEvent,
				agenda: {
					event: CustomEventAgenda,
				},
			}}
			onSelectEvent={selectedEvent => redirectToEvent(selectedEvent.id)}
			eventPropGetter={() => eventStyleGetter()}
		/>
	);
}
