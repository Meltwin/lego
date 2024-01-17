import { FunctionComponent, useEffect, useRef } from "react";
import { main } from "./shader/shader_main";
import { OptionalBrickValues, fillDefaultValues } from "./BrickValues";
import "./lego-brick.scss";

export const LegoBrick: FunctionComponent<OptionalBrickValues> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const values = fillDefaultValues(props);
    useEffect(
        () => {
            main(canvasRef.current, values);
        }, []
    )
    return (<div className="lego-brick">
        <div className="brick-title"><p>{values.length}x{values.width} {(values.height === 1) ? "Brick" : "Slab"}</p></div>
        <canvas width={values.renderWidth} height={values.renderWidth} ref={canvasRef} />
        <div className="bottom-line">
            <div className="filler"></div>
            <div className="brick-number">
                <p>{values.number} {(values.number === 1) ? "brick" : "bricks"}</p>
            </div>
        </div>

    </div>)
}