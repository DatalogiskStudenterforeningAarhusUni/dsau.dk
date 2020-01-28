import React from "react";

export default function Member(props) {
	return (
		<div className="member">
			{props.image ? (
				<div
					className="member__image"
					style={{
						backgroundImage:
							"url(" +
							process.env.PUBLIC_URL +
							"/images/" +
							props.image +
							")"
					}}
				/>
			) : (
				""
			)}
			{props.name ? <p className="member__name">{props.name}</p> : ""}
			{props.title ? <p className="member__title">{props.title}</p> : ""}
			{props.class ? (
				<p className="member__class">Årgang {props.class}</p>
			) : (
				""
			)}
			{props.email ? (
				<a className="member__email" href={"mailto:" + props.email}>
					{props.email}
				</a>
			) : (
				""
			)}
		</div>
	);
}
