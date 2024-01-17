import { NavLink } from "react-router-dom";
import "./buttonpage.scss"

export function ButtonPage() {
    return (<div className="button-page">
        <h1>Click below to generate the mystery box !</h1>
        <NavLink to="random">Get a Mystery Box !</NavLink>
    </div>)
}