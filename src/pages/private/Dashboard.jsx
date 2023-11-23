import { useSelector } from "react-redux"

function Dashboard() {

    const {userData} = useSelector(state => state.auth)

  return (
    <div id="Dashboard">
      <h1>Hola {userData.nombre}</h1>
    </div>
  )
}

export default Dashboard