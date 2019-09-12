import React, { useEffect, useState } from "react";
import { MyCalendar } from "./components/MyCalendar";
import { MyEvent, FbEvent } from "./components/interfaces";

export function Events() {
	const [events, setEvents] = useState<MyEvent[]>([]);
	useEffect(() => onGetEventsFromFacebook(), []);

	//TODO fix token using graph.facebook api
	const onGetEventsFromFacebook = () => {
		fetch("https://graph.facebook.com/DSAUdk/events", {
			method: "get",
			headers: new Headers({
				Authorization:
					"Bearer EAAeEg2Lpd8EBAOhJ3S7INLOsWzyrZAWJjtohIwO71qrOr75TGj00Rf6C7y6TEv7ZCYDg6ADqzOzZALhRtleZBDOAqZAihZAbPqP3M6zm8rQKtQxyztLFcJyHHR7JuQAMKOphwfm5CHAcQahVfhZCLI2ZC4ghG8FZBmZCbl4oEqZADgj8AZDZD"
			})
		})
			.then(responce => responce.json())
			.then(json => {
				const data = json.data;
				for (let i = 0; i < data.length; i++) {
					data[i] = formatEvent(data[i]);
				}
				setEvents(data);
			});
	};

	return (
		<div>
			<h2>Events</h2>
			<div style={{ height: 700 }}>
				<MyCalendar events={events} />
			</div>
		</div>
	);
}

function formatEvent(json: FbEvent): MyEvent {
	return {
		description: json.description,
		end: new Date(json.end_time),
		id: json.id,
		location: json.place.name,
		name: json.name,
		start: new Date(json.start_time),
		allday: false
	};
}
