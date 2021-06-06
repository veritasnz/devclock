import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";

import s from "./Modal.module.css";

const Backdrop = (props) => {
    return <div className={s.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
    return (
        <Fragment>
            <button className={s.close} type="button" onClick={props.onClose}>
                <span className="sr-only">Close</span>
                <i className="fas fa-times" aria-hidden="true"></i>
            </button>
            <div className={s.tint} aria-hidden="true"></div>
            <div className={s.modal}>
                <div className={s.content}>{props.children}</div>
            </div>
        </Fragment>
    );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    /**
     * Close with ESC
     */
    useEffect(() => {
        function keyListener(e) {
            if (e.keyCode === 27) {
                props.onClose();
            }
        }

        document.addEventListener("keydown", keyListener);

        return () => document.removeEventListener("keydown", keyListener);
    });

    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay onClose={props.onClose}>
                    {props.children}
                </ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;
