import React from "react";
import {HashRouter, Route, Link} from "react-router-dom";
import "./App.css"
import {Index, About, Contact} from "./pages";
import Board from "./pages/board";

function AppRouter() {
    return (
        <HashRouter basename="/">
            <nav className="navigation">
                <div className="navigation__content">
                    <Link to="/">
                        <img className="navigation__logo"
                             src={process.env.PUBLIC_URL + '/DSAU_logo.png'} // process.env.PUBLIC_URL links to public folder
                             alt="DSAU Logo"/>
                    </Link>
                    <ul className="navigation__list">
                        <li>
                            <Link to="/">Hjem</Link>
                        </li>
                        <li>
                            <Link to="/om/">Om</Link>
                        </li>
                        <li>
                            <Link to="/kontakt/">Kontakt</Link>
                        </li>
                        <li>
                            <Link to="/bestyrelse/">Bestyrelse</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="content">
                <Route path="/" exact component={Index}/>
                <Route path="/om/" component={About}/>
                <Route path="/kontakt/" component={Contact}/>
                <Route path="/bestyrelse/" component={Board}/>
            </div>
        </HashRouter>
    );
}

export default AppRouter;
