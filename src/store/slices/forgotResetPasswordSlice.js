import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { baseURL } from "./baseUrl"


const forgotResetPassSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        forgotPasswordRequest(state) {
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        forgotPasswordSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        forgotPasswordFailed(state, action) {
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        },
        resetPasswordRequest(state) {
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        resetPasswordSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        resetPasswordFailed(state, action) {
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        },
        clearAllErrors(state) {
            state.error = null;
        }
    }
});


export const forgotPassword = (email) => async (dispatch) => {
    dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
    try {
        const { data } = await axios.post(`${baseURL}/api/v1/user/password/forgot`, { email },
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(forgotResetPassSlice.actions.forgotPasswordSuccess(data.message));
    } catch (error) {
        dispatch(forgotResetPassSlice.actions.forgotPasswordFailed(error.response.data.message));
    }
};


export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
    try {
        const { data } = await axios.post(`${baseURL}/api/v1/user/password/reset/${token}`, { password, confirmPassword }, // Fixed the typo here
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(forgotResetPassSlice.actions.resetPasswordSuccess(data.message));
    } catch (error) {
        dispatch(forgotResetPassSlice.actions.resetPasswordFailed(error.response.data.message));
    }
};


export const clearAllForgotPasswordErrors = () => (dispatch) => {
    dispatch(forgotResetPassSlice.actions.clearAllErrors());
};

export default forgotResetPassSlice.reducer;
