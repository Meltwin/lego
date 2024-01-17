import { NavLink } from "react-router-dom";
import { BRICK_LIST } from "../bricks/BrickList";
import { LegoBrick } from "../bricks/LegoBrick";
import "./randomizedPage.scss";

const NUMBER_TO_GEN = 10;

function generateBrickList(n: number, max: number): number[] {
    // Generate 10 different index
    const out_index: number[] = [];

    let gen_number = 0;
    do {
        gen_number = Math.floor(Math.random() * max);
        if (out_index.find((e) => { return e === gen_number }) === undefined)
            out_index.push(gen_number);
    } while (out_index.length < n && out_index.length < max);

    return out_index;
}

export function RandomizedPage() {
    const brick_index = generateBrickList(NUMBER_TO_GEN, BRICK_LIST.length);

    console.log(brick_index);

    return (<div className="randomized-list">
        <div className="list">
            {brick_index.map((elem) => {
                return <LegoBrick
                    length={BRICK_LIST[elem].length}
                    width={BRICK_LIST[elem].width}
                    height={BRICK_LIST[elem].height}
                    color={BRICK_LIST[elem].color}
                />
            })}
        </div>

        <NavLink to="/">Go Back</NavLink>
    </div>)
}