import { Link } from "react-router-dom";
import React from "react";

export default function Contact() {
	return (
		<div className="contact">
			<h1 className="contact__header">Kontakt os</h1>
			<div className="contact__content">
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
		</div>
	);
}
