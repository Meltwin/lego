import { NavLink } from "react-router-dom";
import "./buttonpage.scss";

const logo = require("../assets/images/title.png");
const lego = require("../assets/images/lego.png")

export function ButtonPage() {
    return (<div className="button-page">
        <div className="logos">
            <img src={lego} id="lego-logo" alt="lego" />
            <div className="separator"></div>
            <img src={logo} id="challenge-logo" alt="challenge" />
        </div>

        <h1>Click below to generate the mystery box !</h1>
        <NavLink to="random">Get a Mystery Box !</NavLink>
    </div>)
}