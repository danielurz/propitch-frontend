import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useDispatch } from "react-redux"
import { autenticacion } from "./helpers/functions.js"
import { useEffect } from "react"
// Public
import PublicLayout from "./layouts/PublicLayout"
import Login from "./pages/public/Login.jsx"
import OlvidePassword from "./pages/public/OlvidePassword"
import NuevoPassword from "./pages/public/NuevoPassword"
// Private
import AdminLayout from "./layouts/AdminLayout"
import Dashboard from "./pages/private/Dashboard"
import Profile from "./pages/private/Profile"
import Admins from "./pages/private/Admins"
import DashLayout from "./layouts/DashLayout"
import AddAdmin from "./pages/private/AddAdmin"

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    autenticacion(dispatch)
  }, [])
  

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Publicas */}
        <Route path="/" element={<PublicLayout/>}>
          <Route index element={<Login/>}/>
          <Route path="olvide-password" element={<OlvidePassword/>}/>
          <Route path="nuevo-password" element={<NuevoPassword/>}/>
        </Route>
        {/* Rutas Privadas */}
        <Route path="/dashboard" element={<AdminLayout/>}>
          <Route path="profile" element={<Profile/>}/>
          <Route path="" element={<DashLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="admins" element={<Admins/>}/>
            <Route path="admins/add-admin" element={<AddAdmin/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
