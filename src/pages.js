import React from "react";

export function Index() {
    return (
        <div>
            <h1>Datalogisk studenderforening på Aarhus Universitet</h1>
            <div>
                <h3>Hjertelig velkommen til DSAU's hjemmeside.</h3>
                <div>
                    Her kan du blandt andet finde vores vedtægter og seneste referater, 
                    se adresse og kontaktinformation, se nuværende bestyrelse og læse om de årlige samt ekstraordinære events
                    der bliver afholdt i studenterforeningen.
                </div>
            </div>
        </div>
    );
}

//TODO add more to about
export function About() {
    return (
        <div>
            <h1>Om DSAU</h1>
            <div>
                <b>D</b>atalogisk <b>S</b>tudenterforening på <b>A</b>arhus <b>U</b>niversitet er en studenterforening for datalogistuderende på AU.
                Foreningens opgave er at formidle idéer og forslag fra datalogistuderende til universitet, samt stå for aktiviterer af social- og faglig karakter.
            </div>
        </div>
    );
}

export function Contact() {
    return (
        <div>
            <h1>Kontakt os</h1>
            <h3>Mail: </h3> 
        </div>
    );
}
