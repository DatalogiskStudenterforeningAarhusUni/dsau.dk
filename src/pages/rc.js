import React from "react";

export default function Rc() {
	return (
		<div className="rc">
			<h1 className="rc__header">Regnecentralen</h1>
			<div className="rc__content">
				<div className="rc__header">
					<img src="/images/rc/rcLogo.png" alt="Regnecentralen Logo" width="200" float="right"></img>
				</div>
				<p>
				Regnecentralen (eller <i>RC</i> i daglig tale) er et fællesskab og socialt forum, 
				både digitalt, men også et fysisk lokale, for studerende på datalogi og 
				IT produktudvikling, på Aarhus Universitet.
				</p>
				<address>
					<div>
						<b>Facebook: </b>
						<a href="https://www.facebook.com/groups/regnecentralen.au">regnecentralen.au</a>
					</div>
					<div>
						<b>LinkedIn: </b>
						<a href="https://www.linkedin.com/company/regnecentralen-aarhus-universitet/">Regnecentralen, Aarhus University</a>
					</div>
					<div>
						<b>Addresse: </b>
						Åbogade 36, 8200 Aarhus
					</div>
					<div>
						<b>Mail: </b>
						<a href="mailto:rc@dsau.dk">rc@dsau.dk</a>
					</div>
				</address>
			</div>
		</div>
	);
}
