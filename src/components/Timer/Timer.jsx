import React, { useEffect, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import useTimer from "../../hooks/use-timer";
import useVoice from "../../hooks/use-voice";

import s from "./Timer.module.css";
import TimerDisplay from "./TimerDisplay";
import TimerButtons from "./TimerButtons";
import SoundEnableWidget from "../Layout/SoundEnableWidget";

let blockIsFinished = false;

const Timer = (props) => {
    const soundOn = useSelector((store) => store.settings.soundOn);

    const { cycle, index, isTicking, startTimer, stopTimer, resetTimer } =
        useTimer();

    /**
     * Block Finished, Synth Voice
     */
    const { playVoice, stopVoice } = useVoice();

    const currentBlock = cycle[index];
    const nextBlock = cycle[index + 1];

    useEffect(() => {
        let timer;

        if (currentBlock && currentBlock.seconds === 0) {
            blockIsFinished = true;
            stopTimer();

            if (soundOn) {
                if (nextBlock) {
                    console.log("playvoice");
                    playVoice(nextBlock.message);
                } else {
                    console.log("playvoice");
                    playVoice("Cycle has been reset. Start again");
                }
            }

            timer = setTimeout(() => {
                startTimer();
                blockIsFinished = false;
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [
        currentBlock,
        nextBlock,
        playVoice,
        cycle,
        index,
        stopTimer,
        startTimer,
        soundOn,
    ]);

    /**
     * Reset
     */
    const resetHandler = () => {
        blockIsFinished = false;
        stopVoice();
        resetTimer();
    };

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
                <TimerDisplay
                    cycle={cycle}
                    index={index}
                    blockIsFinished={blockIsFinished}
                />
                <TimerButtons
                    isTicking={isTicking}
                    onStart={startTimer}
                    onStop={stopTimer}
                    onReset={resetHandler}
                    blockIsFinished={blockIsFinished}
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
