import { configureStore } from "@reduxjs/toolkit";

import settingsSlice from "./settings-slice";

const store = configureStore({
    reducer: {
        settings: settingsSlice.reducer,
    },
});

export default store;
