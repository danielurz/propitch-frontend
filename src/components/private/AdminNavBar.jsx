import { Link } from "react-router-dom"

function AdminNavBar() {
  return (
    <nav id="AdminNavBar">
        <Link to="/dashboard/admins">Administradores</Link>
        <Link to="/dashboard/admins/add-admin">Agregar Administrador</Link>
    </nav>
  )
}

export default AdminNavBar