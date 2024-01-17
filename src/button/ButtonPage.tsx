import { NavLink } from "react-router-dom";

export function ButtonPage() {
    return (<div className="button-page">
        <h1>Click below to generate the mystery box !</h1>
        <NavLink to="random">Random</NavLink>
    </div>)
}