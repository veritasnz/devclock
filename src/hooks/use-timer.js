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
        };
    }

    if (action.type === "STOP") {
        return {
            cycle: state.cycle,
            index: state.index,
            isTicking: false,
            requiresReset: state.requiresReset,
            endTime: false,
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
        };
    }

    if (action.type === "TICK") {
        const newCycle = state.cycle.map((block) => ({ ...block }));
        let newIndex = state.index;
        let newIsTicking = state.isTicking;
        let newEndTime = state.endTime;
        let newRequiresReset = false;

        if (state.isTicking && !state.requiresReset) {
            const NOW = Math.floor(new Date().getTime() / 1000);

            if (NOW <= state.endTime) {
                newCycle[newIndex].seconds = state.endTime - NOW;
                document.title = formatSeconds(newCycle[newIndex].seconds);
            } else {
                newIndex++;
                newRequiresReset = !newCycle[newIndex];
                if (!newRequiresReset) {
                    newEndTime = NOW + newCycle[newIndex].seconds;
                }
            }
        }

        return {
            cycle: newCycle,
            index: newIndex,
            isTicking: newIsTicking,
            requiresReset: newRequiresReset,
            endTime: newEndTime,
        };
    }

    return DEFAULT_TIMER_STATE;
};

/**
 * Hook Logic
 */
const useTimer = () => {
    const dispatch = useDispatch();
    /**
     * State
     */
    const settingsCycle = useSelector((store) => store.settings.cycle);

    const [timerState, dispatchTimer] = useReducer(
        timerReducer,
        DEFAULT_TIMER_STATE
    );

    const { cycle, index, isTicking, requiresReset } = timerState;

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
            }, 250);
        }

        if (requiresReset) {
            resetTimer();
            dispatch(settingsActions.incrementRound());
        }

        return () => clearInterval(interval);
    }, [isTicking, requiresReset, resetTimer, dispatch]);

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
