import s from "./Button.module.css";

const Button = (props) => {
    const { className, type, ...otherProps } = props;

    return (
        <button
            type={type || "button"}
            className={`${s.button} ${className}`}
            {...otherProps}
        >
            {props.children}
        </button>
    );
};

export default Button;
