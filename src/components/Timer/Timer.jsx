import React, { Fragment, useState } from "react";
import { isMobile } from "react-device-detect";

import useTimer from "../../hooks/use-timer";
import useVoice from "../../hooks/use-voice";

import s from "./Timer.module.css";
import TimerDisplay from "./TimerDisplay";
import TimerButtons from "./TimerButtons";
import SoundEnableWidget from "../Layout/SoundEnableWidget";

const Timer = (props) => {
    const { playVoice } = useVoice();

    const { cycle, index, isTicking, startTimer, stopTimer, resetTimer } =
        useTimer(playVoice);

    /**
     * Mobile Sound Enabling
     */

    const [mobileSoundEnabled, setMobileSoundEnabled] = useState(false);

    const mobileEnableSoundHandler = (enabled) => {
        if (enabled) {
            playVoice(" ");
        }

        setMobileSoundEnabled(true);
    };

    /**
     * JSX Content
     */

    let content = (
        <div className={s.empty}>
            No time-blocks found.
            <br /> Please create a cycle in the settings menu
        </div>
    );

    if (cycle.length > 0) {
        content = (
            <Fragment>
                <TimerDisplay cycle={cycle} index={index} />
                <TimerButtons
                    isTicking={isTicking}
                    onStart={startTimer}
                    onStop={stopTimer}
                    onReset={resetTimer}
                />
                {isMobile && !mobileSoundEnabled && (
                    <SoundEnableWidget onEnable={mobileEnableSoundHandler} />
                )}
            </Fragment>
        );
    }

    return <main className={s.wrapper}>{content}</main>;
};

export default Timer;
