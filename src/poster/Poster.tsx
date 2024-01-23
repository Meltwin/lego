import { NavLink } from "react-router-dom";
import "./posterpage.scss";
const poster = require("./poster.png");

export function Poster() {
    return (
        <div className="poster-page">
            <div className="image">
                <img src={poster} alt="Poster" />
            </div>
            <div className="buttons">
                <NavLink to="/">Go Back </NavLink>
            </div>
        </div>
    )
}