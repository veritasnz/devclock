import React from "react";

import s from "./TimerButtons.module.css";
import Button from "../UI/Button";

const TimerButtons = (props) => {
    const {
        onStart: startHandler,
        onStop: stopHandler,
        onReset: resetHandler,
    } = props;

    return (
        <div className={s.wrap}>
            <Button disabled={props.isTicking} onClick={startHandler}>
                Start
            </Button>
            <Button disabled={!props.isTicking} onClick={stopHandler}>
                Stop
            </Button>
            <Button onClick={resetHandler}>Reset</Button>
        </div>
    );
};

export default React.memo(TimerButtons);
