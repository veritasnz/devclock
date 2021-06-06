import { Fragment, useRef, useState } from "react";

import messages from "../../messageConfig";

import s from "./CycleInput.module.css";

const typeOptions = [];

for (const key in messages) {
    typeOptions.push(
        <option key={key} value={key}>
            {key}
        </option>
    );
}

const CycleInput = (props) => {
    const typeRef = useRef();
    let errorMessage = "";
    const [formError, setFormError] = useState("");

    /**
     * Mins
     */
    const [mins, setMins] = useState("");
    const [minsIsTouched, setMinsIsTouched] = useState(false);

    const minsIsInvalid = mins < 0 || mins > 90;
    const minsHasError = minsIsTouched && minsIsInvalid;

    if (minsHasError) {
        errorMessage += "Please enter an amount of minutes between 0 and 90. ";
    }

    const minsBlurHandler = () => setMinsIsTouched(true);
    const minsChangeHandler = (event) => {
        let value = parseInt(event.target.value);
        if (isNaN(value)) value = "";
        setMins(value);
    };

    /**
     * Secs
     */
    const [secs, setSecs] = useState("");
    const [secsIsTouched, setSecsIsTouched] = useState(false);

    const secsIsInvalid = secs > 59 || secs < 0;
    const secsHasError = secsIsTouched && secsIsInvalid;

    if (secsHasError) {
        errorMessage += "Please enter a valid amount of seconds. ";
    }

    const secsBlurHandler = () => setSecsIsTouched(true);
    const secsChangeHandler = (event) => {
        let value = parseInt(event.target.value);
        if (isNaN(value)) value = "";
        setSecs(value);
    };

    /**
     * Submit
     */
    const submitHandler = (event) => {
        event.preventDefault();

        const type = typeRef.current.value;

        if (secsIsInvalid || minsIsInvalid) {
            return;
        }

        if (type.trim() === "") {
            setFormError(
                "Something went horribly wrong. Please refresh the page and try again."
            );
            return;
        }

        if (mins * 60 + secs <= 0) {
            setFormError("Please enter an amount of time greater than 0");
            return;
        }

        console.log();

        const block = {
            type: type,
            seconds: parseInt(mins * 60 + secs),
            message: messages[type],
        };

        props.onAddBlock(block);

        setFormError("");
        setSecs("");
        setMins("");
    };

    return (
        <Fragment>
            <form className={s.wrap} onSubmit={submitHandler}>
                <div className={s.input}>
                    <label htmlFor="type">Block Type</label>
                    <select id="type" name="type" ref={typeRef}>
                        {typeOptions}
                    </select>
                </div>
                <div className={`${s.input} ${minsHasError && s.error}`}>
                    <label htmlFor="type">Minutes</label>
                    <input
                        type="number"
                        name="mins"
                        placeholder="00"
                        value={mins}
                        onBlur={minsBlurHandler}
                        onChange={minsChangeHandler}
                    />
                </div>
                <div className={`${s.input} ${secsHasError && s.error}`}>
                    <label htmlFor="type">Secs</label>
                    <input
                        type="number"
                        name="secs"
                        placeholder="00"
                        value={secs}
                        onBlur={secsBlurHandler}
                        onChange={secsChangeHandler}
                    />
                </div>
                <button type="submit">
                    <span className="sr-only">Add Current Item</span>
                    <i className="fas fa-plus-circle" aria-hidden="true"></i>
                </button>
            </form>
            {(errorMessage || formError) && (
                <p className={s["error-message"]}>{errorMessage + formError}</p>
            )}
        </Fragment>
    );
};
export default CycleInput;
