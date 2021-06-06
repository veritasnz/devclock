import { formatSeconds } from "../../api/functions";

import s from "./CycleList.module.css";

const CycleItem = (props) => {
    const { name, seconds, onRemove } = props;
    const secondsDisplay = formatSeconds(seconds);

    return (
        <li className={s["item"]}>
            <span>{name}</span>
            <div className={s["item__content"]}>
                <span>{secondsDisplay}</span>
                <button
                    className={s["item__content"]}
                    type="button"
                    onClick={onRemove}
                >
                    <span className="sr-only">Remove Item</span>
                    <i className="fas fa-minus-circle" aria-hidden="true"></i>
                </button>
            </div>
        </li>
    );
};

const CycleList = (props) => {
    const removeBlockHandler = (index) => {
        props.onRemoveBlock(index);
    };

    let listContent;

    if (props.cycle.length <= 0) {
        listContent = <li className={s.empty}>[ Your added cycles will appear here ]</li>;
    } else {
        listContent = props.cycle.map((block, index) => {
            const key = Math.random() * 100;

            return (
                <CycleItem
                    key={key}
                    name={block.type}
                    seconds={block.seconds}
                    onRemove={removeBlockHandler.bind(null, index)}
                />
            );
        });
    }

    return <ul className={s["list"]}>{listContent}</ul>;
};
export default CycleList;
