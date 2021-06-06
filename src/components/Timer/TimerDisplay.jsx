import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import s from "./TimerDisplay.module.css";
import TimerBlock from "./TimerBlock";

const TimerDisplay = (props) => {
    const round = useSelector((store) => store.settings.round);

    const { cycle, index: activeIndex, blockIsFinished } = props;

    return (
        <Fragment>
            <p className={s.round}>Round {round}</p>
            <div className={s.list}>
                {cycle.map((item, index) => {
                    let isFinished = false;

                    if (index < activeIndex) {
                        isFinished = true;
                    }

                    const key = item.type + Math.random() * 100;
                    const isActive = index === activeIndex;

                    return (
                        <TimerBlock
                            key={key}
                            type={item.type}
                            seconds={item.seconds}
                            isActive={isActive}
                            isFinished={isFinished}
                            blockIsFinished={blockIsFinished}
                        />
                    );
                })}
            </div>
        </Fragment>
    );
};

export default TimerDisplay;
