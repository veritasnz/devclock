import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { settingsActions } from "./../../store/settings-slice";

import s from "./Settings.module.css";
import ToggleSwitch from "../UI/ToggleSwitch";
import VoiceSelect from "./VoiceSelect";
import CycleSettings from "./CycleSettings";
import Button from "../UI/Button";

let roundResetTimer;

const Settings = (props) => {
    const dispatch = useDispatch();
    const settings = useSelector((store) => store.settings);

    /**
     * Sound Logic
     */
    const soundOn = settings.soundOn;
    const soundToggleHandler = (isChecked) => {
        dispatch(settingsActions.setSoundOn(isChecked));
    };

    /**
     * Dark Mode Logic
     */
    const darkModeOn = settings.darkMode;
    const darkModeToggleHandler = (isChecked) => {
        dispatch(settingsActions.setDarkMode(isChecked));
    };

    /**
     * Voice Logic
     */
    const currentVoiceName = settings.voiceName;
    const voiceChangeHandler = (voiceName) => {
        dispatch(settingsActions.setVoiceName(voiceName));
    };

    /**
     * Round Logic
     */
    const [roundIsResetting, setRoundIsResetting] = useState(false);

    const resetRoundHandler = () => {
        dispatch(settingsActions.resetRound());
        setRoundIsResetting(true);

        roundResetTimer = setTimeout(() => {
            setRoundIsResetting(false);
        }, 2000);
    };

    useEffect(() => {
        return () => clearTimeout(roundResetTimer);
    }, []);

    let resetButtonContent = "Reset Round Counter";

    if (roundIsResetting) {
        resetButtonContent = (
            <Fragment>
                Round counter reset <i className="fas fa-check"></i>
            </Fragment>
        );
    }

    /**
     * JSX Return
     */
    return (
        <Fragment>
            <h2 className={s["title"]}>Settings</h2>
            <div className={s["option-list"]}>
                <div className={s["option-list__col"]}>
                    <h3 className={s["option-list__title"]}>APP</h3>
                    <ul>
                        <li className={`${s["option"]} ${s["option--flex"]}`}>
                            <label htmlFor="sound">Sound</label>
                            <ToggleSwitch
                                id="sound"
                                onToggle={soundToggleHandler}
                                isChecked={soundOn}
                            />
                        </li>
                        <li className={`${s["option"]} ${s["option--flex"]}`}>
                            <label htmlFor="darkmode">Dark Mode</label>
                            <ToggleSwitch
                                id="darkmode"
                                onToggle={darkModeToggleHandler}
                                isChecked={darkModeOn}
                            />
                        </li>
                        <li className={`${s["option"]} ${s["option--flex"]}`}>
                            <label>Voice</label>
                            <VoiceSelect
                                currentVoiceName={currentVoiceName}
                                onVoiceSelect={voiceChangeHandler}
                            />
                        </li>
                        <li className={`${s["option"]}`}>
                            <Button
                                id="count-reset"
                                onClick={resetRoundHandler}
                                className={`${
                                    roundIsResetting && "updated-mode"
                                }`}
                            >
                                {resetButtonContent}
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className={s["option-list__col"]}>
                    <h3 className={s["option-list__title"]}>CYCLE</h3>
                    <ul>
                        <li className={`${s["option"]}`}>
                            <p className={`${s["warning"]}`}>
                                *Edits to the cycle will reset the timer
                            </p>
                            <CycleSettings />
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default Settings;
