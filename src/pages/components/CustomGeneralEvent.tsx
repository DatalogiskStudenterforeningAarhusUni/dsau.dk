import React from "react";
import { EventProps } from "react-big-calendar";
import { MyEvent } from "./interfaces";

export const CustomGeneralEvent = (props: EventProps<MyEvent>) => {
	return (
		<div>
			<em>{props.event.name}</em>
			<p>{props.event.description}</p>
			<p>Placering: {props.event.location}</p>
		</div>
	);
};
