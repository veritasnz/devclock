import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const useVoice = () => {
    const voiceName = useSelector((store) => store.settings.voiceName);
    const synth = useRef();
    const [voice, setVoice] = useState([]);

    const updateVoices = useCallback(() => {
        const browserVoiceArray = synth.current.getVoices();

        let voice = browserVoiceArray.find((item) => voiceName === item.name);

        if (!voice) {
            voice = browserVoiceArray.find((item) => "Daniel" === item.name);
        }

        setVoice(voice);
    }, [voiceName]);

    useEffect(() => {
        if (typeof window !== "object" || !window.speechSynthesis) return;
        synth.current = window.speechSynthesis;
        synth.current.onvoiceschanged = () => {
            updateVoices();
        };

        updateVoices();

        return () => (synth.current.onvoiceschanged = null);
    }, [updateVoices]);

    const playVoice = useCallback(
        (message) => {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.lang = voice.lang;
            utterance.pitch = 1;
            utterance.rate = 0.9;
            utterance.volume = 1;
            utterance.voice = voice;

            speechSynthesis.speak(utterance);
        },
        [voice]
    );

    const stopVoice = useCallback(() => {
        synth.current.pause();
        synth.current.cancel();
    }, []);

    return { playVoice, stopVoice };
};

export default useVoice;
