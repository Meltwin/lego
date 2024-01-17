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
        <canvas width={values.renderWidth} height={values.renderWidth} ref={canvasRef} />
        <div><p>{values.number} bricks</p></div>
    </div>)
}