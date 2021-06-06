import React from "react";

import s from "./TimerButtons.module.css";
import Button from "../UI/Button";

const TimerButtons = (props) => {
    const {
        onStart: startHandler,
        onStop: stopHandler,
        onReset: resetHandler,
        blockIsFinished,
    } = props;

    return (
        <div className={s.wrap}>
            <Button
                disabled={props.isTicking || blockIsFinished}
                onClick={startHandler}
            >
                Start
            </Button>
            <Button
                disabled={!props.isTicking || blockIsFinished}
                onClick={stopHandler}
            >
                Stop
            </Button>
            <Button onClick={resetHandler}>Reset</Button>
        </div>
    );
};

export default React.memo(TimerButtons);
