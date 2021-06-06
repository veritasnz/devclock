import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { settingsActions } from "../../store/settings-slice";

import CycleList from "./CycleList";
import CycleInput from "./CycleInput";

const CycleSettings = (props) => {
    const dispatch = useDispatch();
    const currentCycle = useSelector((store) => store.settings.cycle);

    const addBlockHandler = (newBlock) => {
        dispatch(settingsActions.addToCycle(newBlock));
    };

    const removeBlockHandler = (index) => {
        dispatch(settingsActions.removeFromCycle(index));
    };

    return (
        <Fragment>
            <CycleList
                cycle={currentCycle}
                onRemoveBlock={removeBlockHandler}
            />
            {currentCycle.length < 8 && (
                <CycleInput onAddBlock={addBlockHandler} />
            )}
        </Fragment>
    );
};

export default CycleSettings;
