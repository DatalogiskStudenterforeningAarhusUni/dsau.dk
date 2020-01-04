import React from "react";
import { Link } from "react-router-dom";

//TODO all pages --> Make prettier
// This is not used anymore
export function Index() {
	return (
		<div className="frontpage">
			<h1 className="frontpage__header">
				Datalogisk Studenterforening Aarhus Universitet
			</h1>
			<div className="frontpage__content">
				<h3>Hjertelig velkommen til DSAU's hjemmeside.</h3>
				<p>
					Her kan du blandt andet finde vores vedtægter og seneste
					referater, se adresse og kontaktinformation, se nuværende
					bestyrelse og læse om de årlige samt ekstraordinære events
					der bliver afholdt i studenterforeningen.
				</p>
			</div>
		</div>
	);
}

//TODO add more to about and correct link to vedtægter & referater
export function About() {
	return (
		<div className="about">
			<h1 className="about__header">Om DSAU</h1>
			<div className="about__content">
				<p>
					<b>D</b>atalogisk <b>S</b>tudenterforening på <b>A</b>arhus{" "}
					<b>U</b>niversitet er en studenterforening for
					datalogistuderende på AU. Foreningens opgave er at formidle
					idéer og forslag fra datalogistuderende til universitet,
					samt stå for aktiviterer af social- og faglig karakter.
				</p>
				<div className="about__links">
					<h3>Links</h3>
					<Link to="/om/">Vedtægter</Link>
					<Link to="/om/">Referater</Link>
				</div>
			</div>
		</div>
	);
}

export function Contact() {
	return (
		<div>
			<h1>Kontakt os</h1>
			<p>
				Vi kan kontaktes på vores mailadresse eller via vores{" "}
				<a href="https://www.facebook.com/DSAUdk/">Facebookside</a>.
			</p>
			<address>
				<div>
					<b>Adresse: </b>Åbogade 34, Ada 124 - 8200 Aarhus N
				</div>
				<div>
					<b>Mail: </b>
					<Link to="dsau@dsau.dk">dsau@dsau.dk</Link>
				</div>
			</address>
		</div>
	);
}
