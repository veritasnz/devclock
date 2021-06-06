export const formatSeconds = (time) => {
    const minutes = ~~(time / 60);
    const seconds = ~~time % 60;

    let returnString = "" + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    return returnString;
};

export const setDarkMode = (isDarkMode) => {
    const root = document.documentElement;

    if (isDarkMode) {
        root.style.setProperty("--c-text", "#FFF");
        root.style.setProperty("--c-background", "#424242");
        root.style.setProperty("--c-background-rgb", "66, 66, 66");
    } else {
        root.style.setProperty("--c-text", "#444");
        root.style.setProperty("--c-background", "#FFF");
        root.style.setProperty("--c-background-rgb", "255, 255, 255");
    }
};
