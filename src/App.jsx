import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setDarkMode } from "./api/functions";
import { settingsActions } from "./store/settings-slice";

import Header from "./components/Layout/Header";
import Frame from "./components/Layout/Frame";
import Timer from "./components/Timer/Timer";
import Modal from "./components/UI/Modal";
import Settings from "./components/Settings/Settings";
import Info from "./components/Info/Info";

const App = () => {
    /**
     * Load localStorage on launch
     */
    const dispatch = useDispatch();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (!hasLoaded) {
            const dataJSON = localStorage.getItem("settings");
            const data = JSON.parse(dataJSON);
            dispatch(settingsActions.setSettings(data));
        }

        setHasLoaded(true);
    }, [dispatch]); // eslint-disable-line

    /**
     * Update localStorage on change
     */
    const settings = useSelector((store) => store.settings);

    useEffect(() => {
        const settingsJSON = JSON.stringify(settings);
        localStorage.setItem("settings", settingsJSON);
    }, [settings]);

    const { darkMode, soundOn } = settings;

    /**
     * Set Dark Mode
     */

    useEffect(() => {
        setDarkMode(darkMode);
    }, [darkMode]);

    /**
     * Modal state setup
     */
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const modalOpenHandler = (content) => {
        setModalContent(content);
        setModalIsOpen(true);
    };

    const modalCloseHandler = (content) => {
        setModalIsOpen(false);
    };

    return (
        <Fragment>
            <Header onModalOpen={modalOpenHandler} />
            <Frame>
                <Timer soundOn={soundOn} />
            </Frame>
            {modalIsOpen && (
                <Modal onClose={modalCloseHandler}>
                    {modalContent === "settings" && <Settings />}
                    {modalContent === "info" && <Info />}
                </Modal>
            )}
        </Fragment>
    );
};

export default App;
