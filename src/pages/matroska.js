import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function Matriska() {
	return (
		<div className="matroska">
			<h1 className="matroska__header">Matroska</h1>
			<div className="matroska__content">
				<div className="matroska__header">
					<img src="/images/matroska/matroskaLogo.png" alt="Matriska Logo" width="200" float="right"></img>
				</div>
				<p>
					Matroska er et frivilligt udvalg på Institut for Datalogi, som typisk afholder 
					to til tre filmaftener om året. 
				</p>
				<p>
					Det er gratis at deltage og man ser typisk to film, 
					hvor man imellem de to film, får noget aftensmad, sponsoreret af aftenens venlige sponsor, 
					som inden første film starter, holder et 15 minuters oplæg.
					Alt der skal til for at deltage, er at følge vores Facebookside,
					hvor begivenhederne og link til tilmelding, vil blive lagt op.
				</p>
				<p>
					Er du interesseret i at være med i udvalget, og hjælpe til lidt her og der,
					så send os en mail, eller kontakt en fra udvalget.
				</p>
				<address>
					<div>
						<b>Facebook: </b>
						<a href="https://www.facebook.com/groups/matroskaFilmKlub">matroskaFilmKlub</a>
					</div>
					<div>
						<b>LinkedIn: </b>
						<a href="https://www.linkedin.com/company/matroska-aarhus-universitet/">Matroska, Aarhus Universitet</a>
					</div>
					<div>
						<b>Mail: </b>
						<a href="mailto:matroska.au@gmail.com">matroska.au@gmail.com</a>
					</div>
					<div className="matroska__content">
						<hr className="matroska__hr"></hr>
					</div>
				</address>
				<h2 className="matroska__header">Udlejning af popcornmaskine</h2>
				<div className="matroska__header">
					<img src="/images/matroska/matroska_popcornsmaskine.jpg" alt="QR-Code to Matriska Facebook" width="300" float="right"></img>
				</div>
				<h3>Regler for udlejning</h3>
				<p>
					Det er muligt at låne vores popcornmaskine,
					hvis vores popcornmaskinen ikke allerede er udlånt den pågældende dag,
					ved at udfylde ansøgninsformularen på linket nedenfor. 
					Men vær opmærksom på nedstående regler:
				</p>
				<ul align="left">
					<li>
						Popcornmaskinen udlånes kun til <b>interne arrangementer eller 
						til arrangementer med tilknytning til udvalget</b>.
					</li>
					<li>
						Vi tager <b>200,-</b> pr. leje, som bl.a. går til vedligehold af maskinen.
					</li>
					<li>
						Du <b>skal SELV købe popcornkerner, olie og bægre</b>, men du må gerne bruge af det salt, som ligger i vognen.
					</li>
					<li>
						Så vidt muligt skal I også selv hente popcornmaskinen i Hopper-0 og stille den <b>rengjort</b> tilbage efter brug.
					</li>
					<li>
						Det er vigtigt at I <b>skriver i god tid</b>, da vi alle er frivillige og har studier og jobs ved siden af,
						og der kan derfor gå noget tid, før vi har mulighed for at vende tilbage.
					</li>
				</ul>
				<p>Det er også muligt at høre om specialaftaler, så send en ansøgning, og så vurderer vi om det er noget der kan lade sig gøre.</p>
				<div className="matroska__header">
					<a href="mailto:matroska.au@gmail.com?cc=&bcc=&subject=Leje%20af%20popcornmaskinen&body=
Hej Matroska,%0D%0A
%0D%0A
—————— Ansøgning ——————%0D%0A%0D%0A
Hvem er I? %0D%0A
Navn på begivenhed: %0D%0A
Lokation: %0D%0A
Email til kontaktperson: %0D%0A
Telefonnummer til kontaktperson: %0D%0A
Hvem skal regningen sendes til? (Fulde navn på person, virksomhed eller organisation): %0D%0A
Betalingsform (EAN, Faktura): %0D%0A
Forventet forbrug: %0D%0A
Kommentarer: %0D%0A%0D%0A
—————— Ansøgning ——————%0D%0A%0D%0A" target="_top">
						<button>
							Udfyld ansøgning <FiArrowUpRight />
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}
