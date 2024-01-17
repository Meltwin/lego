import { NavLink } from "react-router-dom";
import { BRICK_LIST, COLOR_LIST, SHAPE_LIST } from "../bricks/BrickList";
import { LegoBrick } from "../bricks/LegoBrick";
import "./randomizedPage.scss";
import { make_color } from "../bricks/Color";

const NUMBER_TO_GEN = 3;
const MAX_NUMBER_OF_BRICKS = 10;

function generateIndexList(n: number, max: number): number[] {
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

function generateBrickRepartition(n_shapes: number, n_bricks: number): number[] {
    const out_index: number[] = [];
    let done = 0;
    let gen_number = 0;
    for (let i = 0; i < n_shapes - 1; i++) {
        gen_number = Math.floor(Math.random() * (n_bricks - done - n_shapes + i) + 1);
        done += gen_number;
        out_index.push(gen_number)
    }
    out_index.push(n_bricks - done);

    return out_index;
}

export function RandomizedPage() {
    const shape_index = generateIndexList(NUMBER_TO_GEN, SHAPE_LIST.length);
    const color_index = generateIndexList(NUMBER_TO_GEN, COLOR_LIST.length);
    const number_of_bricks = generateBrickRepartition(NUMBER_TO_GEN, MAX_NUMBER_OF_BRICKS);

    const bricks: JSX.Element[] = [];
    for (let index = 0; index < NUMBER_TO_GEN; index++) {
        bricks.push(
            <LegoBrick
                length={SHAPE_LIST[shape_index[index]][0]}
                width={SHAPE_LIST[shape_index[index]][1]}
                height={SHAPE_LIST[shape_index[index]][2]}
                color={make_color(COLOR_LIST[color_index[index]][0] / 256, COLOR_LIST[color_index[index]][1] / 256, COLOR_LIST[color_index[index]][2] / 256, 1)}
                number={number_of_bricks[index]}
            />
        );
    }

    return (<div className="randomized-list">
        <div className="list">
            {bricks}
        </div>

        <NavLink to="/">Go Back</NavLink>
    </div>)
}