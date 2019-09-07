import React from "react";

export default function CustomEvent({ event }) {


    return (
        <span>
			<em style={{ color: "magenta" }}>{event.name}</em>
			<p>{event.description}</p>
			<p>Placering: {event.location}</p>
		</span>
    );
}
