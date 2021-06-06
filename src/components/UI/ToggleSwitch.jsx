import React from "react";

import s from "./ToggleSwitch.module.css";

const ToggleSwitch = (props) => {
    const toggleHandler = (event) => {
        props.onToggle(event.target.checked);
    };

    return (
        <div className={s["toggle-switch"]}>
            <input
                id={props.id}
                type="checkbox"
                checked={props.isChecked}
                onChange={toggleHandler}
            />
            <span className={s["switch"]} />
        </div>
    );
};
export default ToggleSwitch;
