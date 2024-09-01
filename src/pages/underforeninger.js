import React from "react";
import { Link } from "react-router-dom";

export default function Underforeninger() {
	return (
		<div className="underforeninger">
			<h1 className="underforeninger__header">Underforeninger</h1>
			<div className="underforeninger__content">
				<p>DSAU har en række underforeninger, som står for en række aktiviteter i hverdagen omkring datalogi.
                    Du kan finde mere info om dem herunder.</p>
				<div className="underforeninger__links">
					<h3>Links</h3>
					<Link to="/rc/">Regnecentralen</Link>
					<Link to="/matroska/">Matroska</Link>
				</div>
			</div>
		</div>
	);
}
