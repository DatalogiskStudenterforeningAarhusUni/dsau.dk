import React from "react";
import { EventProps } from "react-big-calendar";
import { MyEvent } from "./interfaces";

export const CustomAgendaEvent: React.FC<EventProps<MyEvent>> = props => {
	const name = props.event ? props.event.name : "no name";
	const description = props.event
		? props.event.description
		: "no description";
	const location = props.event ? props.event.location : "no location";
	const link = props.event ? (
		<a
			style={{ color: "#81c341" }}
			href={"https://facebook.com/events/" + props.event.id}
			target={"_blank"}
			rel="noopener noreferrer"
		>
			Facebook event
		</a>
	) : (
		<p>no event</p>
	);
	return (
		<div>
			<em>{name}</em>
			<p>{description}</p>
			<p>Placering: {location}</p>
			{link}
		</div>
	);
};
