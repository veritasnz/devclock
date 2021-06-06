import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import s from "./SoundEnableWidget.module.css";
import Button from "../UI/Button";

const portalElement = document.getElementById("overlays");

const SoundEnableWidget = (props) => {
    const enableHandler = () => {
        props.onEnable(true);
    };

    const disableHandler = () => {
        props.onEnable(false);
    };

    return (
        <Fragment>
            {ReactDOM.createPortal(
                <div className={s.wrap}>
                    <p className={s.text}>
                        <i
                            className={`${s.warning} fas fa-exclamation-triangle`}
                            aria-hidden="true"
                        ></i>
                        Audio auto-play is disabled by default on mobile
                        devices. Do you want to enable sound?
                    </p>
                    <div className={s.buttonbox}>
                        <Button className={s.button} onClick={disableHandler}>
                            Leave disabled
                        </Button>
                        <Button className={s.button} onClick={enableHandler}>
                            Enable sound
                        </Button>
                    </div>
                </div>,
                portalElement
            )}
        </Fragment>
    );
};

export default SoundEnableWidget;
