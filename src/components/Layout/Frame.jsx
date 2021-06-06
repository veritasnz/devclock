import React from "react";

import s from "./Frame.module.css";

const Frame = (props) => {
    return <div className={s.frame}>{props.children}</div>;
};

export default Frame;
