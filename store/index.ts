import {configureStore } from "@reduxjs/toolkit"
import appSlice from "./app-slice"

const store = configureStore({
    reducer: { 
        app: appSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;