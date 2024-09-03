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
					<div className="underforeninger__container">
						<Link to="/rc/">
							<img className="underforeninger__image" src="/images/rc/rcLogo.png" alt="Regnecentralen Logo" width="100" float="right"></img>
								<div className="underforeninger__middle">
									<div className="underforeninger__text">Regnecentralen</div>
								</div>
						</Link>
					</div>
					<div className="underforeninger__container">
						<Link to="/matroska/">
							<img className="underforeninger__image" src="/images/matroska/matroskaLogo.png" alt="Regnecentralen Logo" width="100" float="right"></img>
								<div className="underforeninger__middle">
									<div className="underforeninger__text">Matroska</div>
								</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
