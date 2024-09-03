import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";

export default function Matriska() {
	return (
		<div className="matroska">
			<div className="matroska__content">
                <div className="matroska__backbutton">
                    <Link to="/underforeninger/">
                        <FiArrowLeftCircle size={50} color={'grey'}/>
                    </Link>
                </div>
            </div>
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
				</address>
				<p>
					Ønsker du at leje matroskas popcornmaskine, se <Link to="/popcorn/">her</Link>.
				</p>
			</div>
		</div>
	);
}
