import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function PublicLayout() {

  const {userData,chargingData} = useSelector(state => state.auth)

  if (chargingData) return null
  if (userData?._id) return <Navigate to="/dashboard" />
  return (
    <>
        <Outlet/>
    </>
  )
}

export default PublicLayout