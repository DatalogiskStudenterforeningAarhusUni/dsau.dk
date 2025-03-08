import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";

export default function Popcorn() {
	return (
		<div className="popcorn">
            <div className="popcorn__content">
                <div className="popcorn__backbutton">
                    <Link to="/matroska/">
                        <FiArrowLeftCircle size={50} color={'grey'}/>
                    </Link>
                </div>
            </div>
			<h1 className="popcorn__header">Udlejning af Matroskas popcornmaskine</h1>
			<div className="popcorn__content">
				<div className="popcorn__header">
					<img src="/images/matroska/matroskaPopcornmaskine.jpg" alt="Matriska Popcornmaskine" width="300" float="right"></img>
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
				<div className="popcorn__header">
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
