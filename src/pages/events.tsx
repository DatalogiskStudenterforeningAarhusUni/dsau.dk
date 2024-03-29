import React, { useEffect, useState } from "react";
import { MyCalendar } from "./components/MyCalendar";
import { MyEvent, FbEvent } from "./components/interfaces";
import { FrequentEvent } from "./components/FrequentEvent";
import frequent_events from "../frequent_events.json";

export default function Events() {
	const [events, setEvents] = useState<MyEvent[]>([]);
	useEffect(() => onGetEventsFromFacebook(), []);

	//TODO fix token using graph.facebook api
	const onGetEventsFromFacebook = () => {
		fetch(
			"https://graph.facebook.com/v11.0/DSAUdk/events?access_token=EAAeEg2Lpd8EBACslcTdZAS6FnHCaJ2ydmL8AS5tNRhdtOPNf98yUHk4XZAMRNZByZCVwCQaoILZA6vxB7zkmZBDPsmUsvCIISfEBfZBMKnRR5ZBJUAtXRKI62QZCUlgiwGHVQrrEy2GwoCflemviBUoGtfcmLX3OxNEtQWxLPu2HSchuBC5jq2CuU",
			{
				method: "get"
			}
		)
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
			<h1>Events</h1>
			<p>
				På denne side finder du vores kalender for events, disse events
				findes også på vores facebook side. I bunden af siden finder du
				en liste over de events der afholdes årligt samt tidspunkter for
				disse events.
			</p>
			<div style={{ height: 700 }}>
				<MyCalendar events={events} />
			</div>
			<div className="events">
				<h2>Årlige events</h2>
				<div className="events__grid">
					{frequent_events.map(e => (
						<FrequentEvent
							name={e.name}
							description={e.description}
							quarter={e.quarter}
						/>
					))}
				</div>
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
