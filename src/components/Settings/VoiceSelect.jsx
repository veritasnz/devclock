import React, { useRef, useState, useEffect } from "react";

import s from "./VoiceSelect.module.css";

const VoiceSelect = (props) => {
    const synth = useRef();
    const { currentVoiceName, onVoiceSelect } = props;
    const [voices, setVoices] = useState([]);

    const updateVoices = () => {
        setVoices(synth.current.getVoices());
    };

    useEffect(() => {
        if (typeof window !== "object" || !window.speechSynthesis) return;
        synth.current = window.speechSynthesis;
        synth.current.onvoiceschanged = updateVoices;
        updateVoices();

        return () => {
            synth.current.onvoiceschanged = null;
        };
    }, []);

    const handleVoiceChange = (e) => {
        const newVoice = voices.filter(
            (item) => item.name === e.target.value
        )[0];

        onVoiceSelect(newVoice.name);
    };

    return (
        <div className={s.wrap}>
        <select
            className={s.select}
            value={currentVoiceName ? currentVoiceName : ""}
            onChange={handleVoiceChange}
        >
            {voices.map((voice) => (
                <option
                    key={voice.name}
                    value={voice.name}
                    className={s.option}
                >{`${voice.name}`}</option>
            ))}
        </select>
        </div>
    );
};

export default VoiceSelect;
