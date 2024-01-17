import { NavLink } from "react-router-dom";
import { COLOR_LIST, PLANE_LIST, SHAPE_LIST } from "../bricks/BrickList";
import { LegoBrick } from "../bricks/LegoBrick";
import "./randomizedPage.scss";
import { make_color } from "../bricks/Color";

const lego = require("../assets/images/lego.png")
const logo = require("../assets/images/title.png");

const PLANE_PROBABILITY = 0.5
const NUMBER_TO_GEN = 3;
const MAX_NUMBER_OF_BRICKS = 10;

const EXP_PARAM = 0.004
function expRandom() {
    return EXP_PARAM * (Math.pow(1 + 1 / EXP_PARAM, Math.random()) - 1);
}

function generateIndexList(n: number, max: number, rnd = Math.random): number[] {
    // Generate 10 different index
    const out_index: number[] = [];

    let gen_number = 0;
    do {
        gen_number = Math.floor(rnd() * max);
        if (out_index.find((e) => { return e === gen_number }) === undefined)
            out_index.push(gen_number);
    } while (out_index.length < n && out_index.length < max);

    return out_index;
}

function generateBrickRepartition(has_plane: boolean, n_shapes: number, n_bricks: number): number[] {
    const out_index: number[] = [];
    let done = 0;
    if (has_plane) {
        out_index.push(1);
        done = 1;
    }
    let gen_number = 0;
    for (let i = ((has_plane) ? 1 : 0); i < n_shapes - 1; i++) {
        gen_number = Math.floor(Math.random() * (n_bricks - done - n_shapes + i) + 1);
        done += gen_number;
        out_index.push(gen_number)
    }
    out_index.push(n_bricks - done);

    return out_index;
}

export function RandomizedPage() {
    const add_a_plane = Math.random() < PLANE_PROBABILITY;
    const ploff = (add_a_plane) ? 1 : 0;
    const plane_index: number[] = (add_a_plane) ? generateIndexList(1, PLANE_LIST.length, expRandom) : [];
    const shape_index = generateIndexList(NUMBER_TO_GEN - ploff, SHAPE_LIST.length, expRandom);
    const color_index = generateIndexList(NUMBER_TO_GEN, COLOR_LIST.length);
    const number_of_bricks = generateBrickRepartition(add_a_plane, NUMBER_TO_GEN, MAX_NUMBER_OF_BRICKS);

    const bricks: JSX.Element[] = [];
    for (let index = 0; index < plane_index.length; index++) {
        bricks.push(
            <LegoBrick
                length={PLANE_LIST[plane_index[index]][0]}
                width={PLANE_LIST[plane_index[index]][1]}
                height={PLANE_LIST[plane_index[index]][2]}
                color={make_color(COLOR_LIST[color_index[index]][0] / 256, COLOR_LIST[color_index[index]][1] / 256, COLOR_LIST[color_index[index]][2] / 256, 1)}
                number={number_of_bricks[index]}
                key={["plate_", String(plane_index[index])].join("")}
            />
        );
    }
    for (let index = 0; index < shape_index.length; index++) {
        bricks.push(
            <LegoBrick
                length={SHAPE_LIST[shape_index[index]][0]}
                width={SHAPE_LIST[shape_index[index]][1]}
                height={SHAPE_LIST[shape_index[index]][2]}
                color={make_color(COLOR_LIST[color_index[index + ploff]][0] / 256, COLOR_LIST[color_index[index + ploff]][1] / 256, COLOR_LIST[color_index[index + ploff]][2] / 256, 1)}
                number={number_of_bricks[index]}
                key={["brick_", String(shape_index[index])].join("")}
            />
        );
    }

    return (<div className="randomized-list">
        <p className="instructions">Make your own build with the following bricks and take a photo of it!</p>
        <div className="list">
            {bricks}
        </div>
        <NavLink to="/">Go Back</NavLink>

        <div className="logos">
            <img src={lego} id="lego-logo" alt="lego" />
            <div className="separator"></div>
            <img src={logo} id="challenge-logo" alt="challenge" />
        </div>
    </div>)
}