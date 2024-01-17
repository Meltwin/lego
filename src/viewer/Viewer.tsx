import { useState } from "react";
import { LegoBrick } from "../bricks/LegoBrick";
import "./viewer.css";

export function Viever() {
    const [length, setLength] = useState(1);
    const [width, setWidth] = useState(1);

    return (<>
        <div className="viewer-control">
            <label>Length {length}</label>
            <input type="number" value={length} onChange={(e) => { setLength(Number(e.target.value)); }} />
            <label>Width {width}</label>
            <input type="number" value={width} onChange={(e) => { setWidth(Number(e.target.value)) }} />
        </div>
        <LegoBrick length={length} width={width} />
    </>)
}