import { createSlice } from "@reduxjs/toolkit";

import messages from "../messageConfig";

const DEFAULT_CYCLE = [
    {
        type: "Work",
        seconds: 20 * 60,
        message: messages["Work"],
    },
    {
        type: "Breather",
        seconds: 30,
        message: messages["Breather"],
    },
    {
        type: "Work",
        seconds: 20 * 60,
        message: messages["Work"],
    },
    {
        type: "Break",
        seconds: 10 * 60,
        message: messages["Break"],
    },
];

const darkModeEnabled =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        cycle: DEFAULT_CYCLE,
        voiceName: "Karen", //en-AU default
        soundOn: true,
        round: 1,
        darkMode: darkModeEnabled,
        darkModeSet: false,
    },
    reducers: {
        setSettings(state, action) {
            if (action.payload) {
                state.cycle = action.payload.cycle;
                state.voiceName = action.payload.voiceName;
                state.soundOn = action.payload.soundOn;
                state.round = action.payload.round;
                state.darkMode = action.payload.darkMode;
            }
        },
        incrementRound(state) {
            state.round = state.round + 1;
        },
        resetRound(state) {
            state.round = 1;
        },
        setSoundOn(state, action) {
            state.soundOn = action.payload;
        },
        setDarkMode(state, action) {
            // Manual change to dark mode
            state.darkMode = action.payload;
            state.darkModeSet = true;
        },
        setVoiceName(state, action) {
            state.voiceName = action.payload;
        },
        addToCycle(state, action) {
            state.cycle.push(action.payload);
        },
        removeFromCycle(state, action) {
            state.cycle.splice(action.payload, 1);
        },
    },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice;
