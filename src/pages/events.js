import React from "react";
import { useState } from "react";
import MyCalendar from "./components/MyCalendar";

export default function Events() {
	let data = [];

	const [events, setEvents] = useState(data);

	//TODO fetch happens twice on page load
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
			.then(json => json.data)
			.then(data => calendarFormat(data))
			.then(data => {
				if (events.length === data.length) {
					console.log("no event update");
				} else {
					console.log("events updated");
					setEvents(data);
				}
			});
	};

	onGetEventsFromFacebook();
	console.log("events function");

	return (
		<div>
			<h2>Events</h2>
			<div style={{ height: 700 }}>{MyCalendar(events)}</div>
		</div>
	);
}

function calendarFormat(data) {
	data.forEach(item => {
		item.location = item.place.name;
		delete item["place"];
		item.start = item.start_time;
		delete item["start_time"];
		item.end = item.end_time;
		delete item["end_time"];
		item.allday = false;
		item.start = new Date(item.start);
		item.end = new Date(item.end);
	});

	return data;
	// console.log(data);
}
