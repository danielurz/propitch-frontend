import AdminNavBar from "../../components/private/AdminNavBar"
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux"
import { showModal } from "../../redux/features/admin.slice.js"

function Admins() {

  const {admins,chargingAdmins} = useSelector(state => state.admin)
  const dispatch = useDispatch()

  if (chargingAdmins) return null
  return (
    <div id="Admins">
        <AdminNavBar/>
        <main className="adminMain">
        <h1 style={{textAlign: "center", marginBottom:"50px"}}>
          {admins.length > 0 ? "Administradores Actuales" : "Aun no hay administradores"}
        </h1>
        <table id="AdminTable">
            <thead>
                <tr>
                    <th>Nombres</th>
                    <th>Email</th>
                    <th>Residencia</th>
                    <th>Ciudad</th>
                    <th>Activo</th>
                </tr>
            </thead>
            <tbody>
              {admins.map(admin => {
                const {nombre,email,residencia,ciudad,_id} = admin

                return (
                  <tr key={_id}>
                    <td>{nombre}</td>
                    <td>{email}</td>
                    <td>{residencia}</td>
                    <td>{ciudad}</td>
                    <td>No</td>
                    <td>
                      <button onClick={() => dispatch(showModal(_id))}>Mas Info</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
        </table>
        </main>
    </div>
  )
}

export default Admins