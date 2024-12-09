import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseURL } from "./baseUrl"


const experninceSlice = createSlice({
    name: "expernince",
    initialState: {
        loading: false,
        expernince: [],
        error: null,
        message: null,
    },
    reducers: {
        getAllExperninceRequest(state, action) {
            state.expernince = [];
            state.error = null;
            state.loading = true;
        },
        getAllExperienceSuccess(state, action) {
            state.expernince = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllExpernincefailed(state, action) {
            state.expernince = state.expernince;
            state.error = action.payload;
            state.loading = true;
        },
        // getOneExperninceRequest(state, action) {
        //     state.singleExp = [];
        //     state.error = null;
        //     state.loading = true;
        // },
        // getOneExpernincesuccess(state, action) {
        //     state.singleExp = action.payload;
        //     state.error = null;
        //     state.loading = false;
        // },
        // getOneExpernincefailed(state, action) {
        //     state.singleExp = state.expernince;
        //     state.error = action.payload;
        //     state.loading = true;
        // },
        addExperninceRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        addExpernincesuccess(state, action) {
            state.expernince = action.payload;
            state.error = null;
            state.loading = false;
            state.message = action.payload;
        },
        addExpernincefailed(state, action) {
            state.expernince = null;
            state.error = action.payload;
            state.loading = true;
        },
        deleteExperninceRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteExpernincesuccess(state, action) {
            state.expernince = action.payload;
            state.error = null;
            state.loading = false;
            state.message = action.payload;
        },
        deleteExpernincefailed(state, action) {
            state.expernince = null;
            state.error = action.payload;
            state.loading = true;
        },
        updateExperninceRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        updateExpernincesuccess(state, action) {
            state.expernince = action.payload;
            state.error = null;
            state.loading = false;
            state.message = action.payload;
        },
        updateExpernincefailed(state, action) {
            state.expernince = null;
            state.error = action.payload;
            state.loading = true;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.message = state.message;
        },
    }
})

export const getAllExperience = () => async (dispatch) => {
    dispatch(experninceSlice.actions.getAllExperninceRequest())
    try {
        const response = await axios.get(`${baseURL}/api/v1/expernince/getall`, { withCredentials: true })
        dispatch(experninceSlice.actions.getAllExperienceSuccess(response.data))
        // console.log(response);

        dispatch(experninceSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(experninceSlice.actions.getAllExpernincefailed(error.response.data.message))
    }
}

// export const getOneExperience = (id) => async (dispatch) => {
//     dispatch(experninceSlice.actions.getOneExperninceRequest())
//     try {
//         const response = await axios.get(`${baseURL}/api/v1/expernince/${id}`)
//         dispatch(experninceSlice.actions.getOneExpernincesuccess(response.data))
//         console.log(response);
        
//         dispatch(experninceSlice.actions.clearAllErrors())
//     } catch (error) {
//         dispatch(experninceSlice.actions.getOneExpernincefailed(error.response.data.message))
//     }
// }

export const addExperience = (data) => async (dispatch) => {
    dispatch(experninceSlice.actions.addExperninceRequest())
    try {
        const response = await axios.post(`${baseURL}/api/v1/expernince/add`, data, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        })
        dispatch(experninceSlice.actions.addExpernincesuccess(response.data)),
            dispatch(experninceSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(experninceSlice.actions.addExpernincefailed(error.response.data.message))
    }
}

export const deleteExperience = (id) => async (dispatch) => {
    dispatch(experninceSlice.actions.deleteExperninceRequest())
    try {
        const response = await axios.delete(`${baseURL}/api/v1/expernince/delete/${id}`, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        })
        dispatch(experninceSlice.actions.deleteExpernincesuccess(response.data)),
            dispatch(experninceSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(experninceSlice.actions.deleteExpernincefailed(error.response.data.message))
    }
}

export const updateExperience = (id, data) => async (dispatch) => {
    dispatch(experninceSlice.actions.updateExperninceRequest())
    try {
        const response = await axios.put(`${baseURL}/api/v1/expernince/update/${id}`, data, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        })
        dispatch(experninceSlice.actions.updateExpernincesuccess(response.data)),
            dispatch(experninceSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(experninceSlice.actions.updateExpernincefailed(error.response.data.message))
    }
}

export const clearAllExperninceErrors = () => (dispatch) => {
    dispatch(experninceSlice.actions.clearAllErrors())
}

export default experninceSlice.reducer;
