import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {establishmentReducer, userReducer} from "./slices";

const rootReducer = combineReducers({
    users: userReducer,
    establishments: establishmentReducer
});

const setupStore = () => configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export {
    setupStore
}