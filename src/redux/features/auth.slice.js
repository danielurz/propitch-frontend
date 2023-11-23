import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    userData: {},
    chargingData: true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fillUserData: (state, {payload:userInfo}) => {
            state.userData = userInfo
        },
        updatechargingData: (state, {payload:boolean}) => {
            state.chargingData = boolean
        }
    }
})

export const {fillUserData,updatechargingData} = authSlice.actions
export default authSlice.reducer