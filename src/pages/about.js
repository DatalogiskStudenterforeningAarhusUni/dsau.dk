import React from "react";

export default function About() {
	return (
		<div className="about">
			<h1 className="about__header">Om DSAU</h1>
			<div className="about__content">
				<p>
					<b>D</b>atalogisk <b>S</b>tudenterforening på <b>A</b>arhus{" "}
					<b>U</b>niversitet er en studenterforening for
					datalogistuderende på AU. Foreningens opgave er at formidle
					idéer og forslag fra datalogistuderende til universitet,
					samt stå for aktiviteter af social- og faglig karakter.
				</p>
				<div className="about__links">
					<h3>Links</h3>
					<a href="https://github.com/DatalogiskStudenterforeningAarhusUni/vedtaegter/blob/master/vedtaegter.pdf">Vedtægter</a>
					<a href="https://github.com/DatalogiskStudenterforeningAarhusUni/Referater">Referater</a>
				</div>
			</div>
		</div>
	);
}
