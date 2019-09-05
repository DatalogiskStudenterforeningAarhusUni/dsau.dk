import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "./App.css"
import {Index, About, Users} from "./pages";

function AppRouter() {
    return (
        <Router>
            <nav className="navigation">
                <div className="navigation__content">
                    <Link to="/">
                        <img className="navigation__logo"
                             src={process.env.PUBLIC_URL + '/DSAU_logo.png'} // process.env.PUBLIC_URL links to public folder
                             alt="DSAU Logo"/>
                    </Link>
                    <ul className="navigation__list">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about/">About</Link>
                        </li>
                        <li>
                            <Link to="/users/">Users</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="content">
                <Route path="/" exact component={Index}/>
                <Route path="/about/" component={About}/>
                <Route path="/users/" component={Users}/>
            </div>
        </Router>
    );
}

export default AppRouter;
