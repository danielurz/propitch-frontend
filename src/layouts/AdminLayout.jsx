import {Outlet, Navigate} from "react-router-dom"
import { useSelector } from "react-redux"
import NavBar from "../components/private/NavBar"
import ModalAdmin from "../components/private/ModalAdmin"


function AdminLayout() {

    const {userData,chargingData} = useSelector(state => state.auth)
    const {modal} = useSelector(state => state.admin)


    if (chargingData) return null
    if (!userData?._id) return <Navigate to="/" />
    return (
        <div className={modal ? "showModal" : ""}>
            <NavBar/>
            <Outlet/>
            {modal && (
                <ModalAdmin
                    adminId={modal}/>
            )}
        </div>
    )
}

export default AdminLayout