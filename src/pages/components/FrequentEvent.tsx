import React from "react";
interface FrequentEventProp {
	name: string;
	description: string;
	quarter: number;
}

export const FrequentEvent: React.FC<FrequentEventProp> = props => {
	return (
		<div>
			<h3>{props.name}</h3>
			<h5>Kvartal: {props.quarter}</h5>
			<p>{props.description}</p>
		</div>
	);
};
