import React from "react";
import data from "../data.json";
import Member from "./components/member"

export default function Board() {
    return (
        <div className="board">
            <h1>Bestyrelsen</h1>
            <div className="board__grid">
                {data.map(d => <Member key={d.name} name={d.name} image={d.image} title={d.title} email={d.email} class={d.class}/>)}
            </div>
        </div>
    );

}