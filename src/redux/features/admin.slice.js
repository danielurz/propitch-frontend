import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    admins: [],
    chargingAdmins: true,
    modal: ""
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        fetchAdmins: (state,{payload:adminArr}) => {
            state.admins = adminArr
        },
        stopChargingAdmins: (state,{payload:boolean}) => {
            state.chargingAdmins = boolean
        },
        showModal: (state, {payload:adminId}) => {
            state.modal = adminId
        }
    }
})


export const {fetchAdmins,stopChargingAdmins,showModal} = adminSlice.actions

export default adminSlice.reducer