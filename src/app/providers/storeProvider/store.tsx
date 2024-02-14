import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {postApi} from "shared/api/RtkService";
import PostSlice from "shared/api/Slice/PostSlice";

const rootReducer = combineReducers({
    PostSlice,
    [postApi.reducerPath]: postApi.reducer
})

export const setupStore =() => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware)
    })
}
export type RootState = ReturnType<typeof  rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type  AppDispatch = AppStore["dispatch"]
