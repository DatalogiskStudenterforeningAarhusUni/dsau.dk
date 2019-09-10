import React, { Component, FunctionComponent } from "react";
import { EventProps } from "react-big-calendar";
import { MyEvent } from "./interfaces";

export const CustomAgendaEvent = (props: EventProps<MyEvent>) => {
	return (
		<div>
			<em>{props.event.name}</em>
			<p>{props.event.description}</p>
			<p>Placering: {props.event.location}</p>
			<a
				style={{ color: "#81c341" }}
				href={"https://facebook.com/events/" + props.event.id}
				target={"_blank"}
			>
				Facebook event
			</a>
		</div>
	);
};
