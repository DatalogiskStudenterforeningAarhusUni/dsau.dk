import React from "react";
import Moment from "moment";

export default function Footer() {
    return <div className="footer">© Datalogisk Studenterforening Aarhus Universitet - {moment.now()}</div>
}