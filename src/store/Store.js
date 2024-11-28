import { configureStore } from "@reduxjs/toolkit"

import userReducer from "./slices/userSlices"
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice"
import messageReducer from "./slices/messageSlice"
import timelineReducer from "./slices/timelineSlice"
import skillReducer from "./slices/skillSlice"
import projectReducer from "./slices/projectSlice"
import softwareApplicationReducer from "./slices/softwareApplicationSlice"
import experninceReducer from "./slices/experninceSlice"


export const store = configureStore({
    reducer: {
        user: userReducer,
        forgotPassword: forgotResetPasswordReducer,
        messages: messageReducer,
        timeline: timelineReducer,
        skills: skillReducer,
        project: projectReducer,
        softwareApplication: softwareApplicationReducer,
        expernince: experninceReducer
    }
})