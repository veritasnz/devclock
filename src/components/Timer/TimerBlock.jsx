import React from "react";

import s from "./TimerBlock.module.css";
import { formatSeconds } from "../../api/functions";

const TimerBlock = (props) => {
    const { type, seconds, isActive, isFinished } = props;

    const displayTime = formatSeconds(seconds);

    let BlockTag = isActive ? "em" : "span";
    BlockTag = isFinished ? "small" : BlockTag;

    return (
        <BlockTag className={s.item}>
            <div className={s.seconds}>{displayTime}</div>
            <p className={s.type}>{type}</p>
        </BlockTag>
    );
};

export default TimerBlock;
