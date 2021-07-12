import { useEffect, useReducer, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatSeconds } from "../api/functions";

import { settingsActions } from "../store/settings-slice";

const DEFAULT_TIMER_STATE = {
    cycle: [],
    index: 0,
    isTicking: false,
    requiresReset: false,
    startTime: false,
    messageQueue: "",
};

/**
 * Reducer Logic
 */
const timerReducer = (state, action) => {
    if (action.type === "RESET") {
        return {
            cycle: action.cycle,
            index: 0,
            isTicking: false,
            requiresReset: false,
            endTime: false,
            messageQueue: "",
        };
    }

    if (action.type === "STOP") {
        return {
            cycle: state.cycle,
            index: state.index,
            isTicking: false,
            requiresReset: state.requiresReset,
            endTime: false,
            messageQueue: "",
        };
    }

    if (action.type === "START") {
        const NOW = Math.floor(new Date().getTime() / 1000);
        const endTime = NOW + state.cycle[state.index].seconds;

        return {
            cycle: state.cycle,
            index: state.index,
            isTicking: true,
            requiresReset: state.requiresReset,
            endTime: endTime,
            messageQueue: "",
        };
    }

    if (action.type === "TICK") {
        const cycle = state.cycle.map((block) => ({ ...block }));

        let index = state.index;
        let isTicking = state.isTicking;
        let endTime = state.endTime;
        let requiresReset = false;
        let messageQueue = state.messageQueue;

        if (state.isTicking && !state.requiresReset) {
            const NOW = Math.floor(new Date().getTime() / 1000);

            if (NOW <= state.endTime) {
                cycle[index].seconds = state.endTime - NOW;
                document.title = formatSeconds(cycle[index].seconds);
            } else {
                index++;
                requiresReset = !cycle[index];

                if (requiresReset) {
                    messageQueue = "Cycle has finished. Start again";
                } else {
                    messageQueue = cycle[index].message;
                    endTime = NOW + cycle[index].seconds;
                }
            }
        }

        return {
            cycle,
            index,
            isTicking,
            requiresReset,
            endTime,
            messageQueue,
        };
    }

    return DEFAULT_TIMER_STATE;
};

/**
 * Hook Logic
 */
const useTimer = (playVoice) => {
    const dispatch = useDispatch();
    /**
     * State
     */
    const { cycle: settingsCycle, soundOn } = useSelector(
        (store) => store.settings
    );

    const [timerState, dispatchTimer] = useReducer(
        timerReducer,
        DEFAULT_TIMER_STATE
    );

    const { cycle, index, isTicking, requiresReset, messageQueue } = timerState;

    /**
     * State Handlers
     */
    const startTimer = useCallback(() => {
        dispatchTimer({ type: "START" });
    }, [dispatchTimer]);

    const stopTimer = useCallback(
        () => dispatchTimer({ type: "STOP" }),
        [dispatchTimer]
    );

    const resetTimer = useCallback(() => {
        document.title = "_DevClock";

        dispatchTimer({
            type: "RESET",
            cycle: settingsCycle.map((block) => ({ ...block })), // Duplicate object from store->settings->cycle
        });
    }, [dispatchTimer, settingsCycle]);

    /**
     * Launch
     */
    // (Re)Initate on load / settings change
    useEffect(() => resetTimer(), [resetTimer]);

    // Initiate interval
    useEffect(() => {
        let interval;

        // Dispatch TICK & update title
        if (isTicking) {
            interval = setInterval(() => {
                dispatchTimer({ type: "TICK" });
            }, 500);
        }

        if (messageQueue !== "" && soundOn) {
            playVoice(messageQueue);
        }

        if (requiresReset) {
            resetTimer();
            dispatch(settingsActions.incrementRound());
        }

        return () => clearInterval(interval);
    }, [ // eslint-disable-line
        isTicking,
        requiresReset,
        messageQueue,
        resetTimer,
        playVoice,
        dispatch,
    ]);

    return {
        cycle,
        index,
        isTicking,
        startTimer,
        stopTimer,
        resetTimer,
    };
};

export default useTimer;
