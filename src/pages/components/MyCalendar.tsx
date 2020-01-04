import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import React from "react";
import { CustomGeneralEvent } from "./CustomGeneralEvent";
import { CustomAgendaEvent } from "./CustomAgendaEvent";

export interface MyCalenderProps {
	events: any[];
}

const localizer = momentLocalizer(moment);

export const MyCalendar: React.FC<MyCalenderProps> = props => {
	const redirectToEvent = (id: string) => {
		window.open("https://facebook.com/events/" + id, "_blank");
	};

	function eventStyleGetter() {
		const backgroundColor = "#" + 424242;
		const style = {
			backgroundColor: backgroundColor,
			borderRadius: "5px",
			opacity: 0.8,
			color: "white",
			border: "0px",
			display: "block"
		};
		return {
			style: style
		};
	}

	return (
		<Calendar
			culture={"en-GB"}
			events={props.events}
			localizer={localizer}
			defaultDate={new Date()}
			// @ts-ignore
			components={{
				event: CustomGeneralEvent,
				agenda: {
					event: CustomAgendaEvent
				}
			}}
			onSelectEvent={selectedEvent => redirectToEvent(selectedEvent.id)}
			eventPropGetter={() => eventStyleGetter()}
		/>
	);
};
