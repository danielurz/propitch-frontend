import { fillUserData,updatechargingData } from "../redux/features/auth.slice.js"
import { fetchAdmins,stopChargingAdmins } from "../redux/features/admin.slice.js"

export const autenticacion = async dispatch => {
    const token = localStorage.getItem("propitch-token")

    if (!token) return dispatch(updatechargingData(false))

    try {
        const url = `${import.meta.env.VITE_SUDO_API}/profile`
        const response = await fetch(url,{
            method: "GET",
            headers: {
                "authorization" : `Bearer ${token}`
            }
        }).then(data => {
            console.log(data)
            return data.json()
        })

        if (response?.error) return console.error(response.error)
        if (response?.serverError) return console.error(`Server Error: ${response.serverError}`)

        dispatch(fillUserData(response))
        dispatch(updatechargingData(false))
        if (response?._id) getAllAdmins(dispatch,response._id)

    } catch (error) {
        console.log(error.message)
    }
}


const getAllAdmins = async (dispatch,userId) => {
    try {
        const url = `${import.meta.env.VITE_SUDO_API}/admin/${userId}`
        const response = await fetch(url).then(data => data.json())

        if (response?.error) return console.error(response.error)
        if (response?.serverError) return console.error(`Server Error: ${response.serverError}`)
        
        dispatch(fetchAdmins(response))
        dispatch(stopChargingAdmins(false))

    } catch (error) {
        console.log(error.message)
    }
}


export const formatDate = fecha => {
    const newDate = new Date(fecha.split("T")[0].split("-"))
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    return newDate.toLocaleDateString("es-ES", options)
}