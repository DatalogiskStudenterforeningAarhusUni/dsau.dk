import React from "react";
import { HashRouter, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Events from "./pages/events";
import Footer from "./footer";
import Board from "./pages/board";
import Contact from "./pages/contact";
import About from "./pages/about";

function AppRouter() {
	return (
		<HashRouter basename="/">
			<nav className="navigation">
				<div className="navigation__content">
					<Link to="/">
						<img
							className="navigation__logo"
							src={process.env.PUBLIC_URL + "/DSAU_logo.png"} // process.env.PUBLIC_URL links to public folder
							alt="DSAU Logo"
						/>
					</Link>
					<ul className="navigation__list">
						<li>
							<Link to="/">Events</Link>
						</li>
						<li>
							<Link to="/bestyrelsen/">Bestyrelsen</Link>
						</li>
						<li>
							<Link to="/om/">Om DSAU</Link>
						</li>
						<li>
							<Link to="/kontakt/">Kontakt</Link>
						</li>
					</ul>
				</div>
			</nav>
			<Routes className="content">
				<Route path="/om/" element={<About/>} />
				<Route path="/kontakt/" element={<Contact/>} />
				<Route path="/bestyrelsen/" element={<Board/>} />
				<Route path="/" exact element={<Events/>} />
			</Routes>
			<Footer />
		</HashRouter>
	);
}

export default AppRouter;
