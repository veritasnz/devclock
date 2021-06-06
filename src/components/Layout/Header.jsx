import React from "react";

import s from "./Header.module.css";

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.wrap}>
                <h1>
                    <i className="fas fa-stopwatch" aria-hidden="true"></i>
                    _DevClock
                </h1>
                <div className={s.buttonwrap}>
                    <button
                        onClick={props.onModalOpen.bind(null, "info")}
                        type="button"
                        className={s.button}
                        aria-label="Open the app-description modal"
                    >
                        <span className="sr-only">Info</span>
                        <i
                            className="fas fa-question-circle"
                            aria-hidden="true"
                        ></i>
                    </button>
                    <button
                        onClick={props.onModalOpen.bind(null, "settings")}
                        type="button"
                        className={s.button}
                        aria-label="Open the settings modal menu"
                    >
                        <span className="sr-only">Settings</span>
                        <i className="fas fa-cog" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
