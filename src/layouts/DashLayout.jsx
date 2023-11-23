import { Outlet } from "react-router-dom"
import SideBar from "../components/private/SideBar"

function DashLayout() {

  return (
    <div id="Mainboard">
      <SideBar/>
      <main id="MainDash">
        <Outlet/>
      </main>
    </div>
  )
}

export default DashLayout