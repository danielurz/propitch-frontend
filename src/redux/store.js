import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./features/auth.slice.js"
import adminReducer from "./features/admin.slice.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer
    }
})