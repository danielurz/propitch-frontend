import { Link, useLocation } from "react-router-dom"
import { FaFlipboard, FaUser } from "react-icons/fa";


function SideBar() {
    
    const location = useLocation()

    const isThisPath = path => {
        let thisLocation = location.pathname.split("/")
        let url = ""
        
        thisLocation[2] ? 
            url = `/${thisLocation[1]}/${thisLocation[2]}` : 
            url = `/${thisLocation[1]}` 

        return url === path ? "icon activeLink" : "icon"
    }

  return (
    <div id="Sidebar">
        <div className="links">
            <Link to="/dashboard">
                <span 
                    className={isThisPath("/dashboard")}>
                    <FaFlipboard/>
                </span>
                <span className="legend">Dashboard</span>
            </Link>
            <Link to="/dashboard/admins">
                <span 
                    className={isThisPath("/dashboard/admins")}>
                    <FaUser/>
                </span>
                <span className="legend">Admins</span>
            </Link>
        </div>
    </div>
  )
}

export default SideBar