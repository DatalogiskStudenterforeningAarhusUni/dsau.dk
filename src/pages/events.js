import React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const listOfEvents = [
	{
		title: "Birthday Party 2",
		allDay: false,
		start: new Date(2019, 8, 13, 7, 0, 0),
		end: new Date(2019, 8, 13, 10, 30, 0),
		desc:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
	}
];

//TODO factor out custom compoment
function CustomEvent({ event }) {
	return (
		<span onClick={console.log(event.title + ":  pressed")}>
			<em style={{ color: "magenta" }}>{event.title}</em>
			<p>{event.desc}</p>
		</span>
	);
}

let Rendering = ({ localizer }) => (
	<Calendar
		events={listOfEvents}
		localizer={localizer}
		defaultDate={new Date()}
		components={{
			event: CustomEvent
		}}
	/>
);

export default function Events() {
	return <div style={{ height: 700 }}>{Rendering({ localizer })}</div>;
}
