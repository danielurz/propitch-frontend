import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaAngleDown } from "react-icons/fa";
import Dropdown from "./Dropdown";
import { useState } from "react";


function NavBar() {

    const {userData} = useSelector(state => state.auth)

    const [dropdown, setDropdown] = useState(false)

    return (
    <nav id="NavBar">
        <div className="container">
            <div className="logo">
                <Link to="">Pro<span>pitch</span></Link>
            </div>
            <div className="actions">
                <Link to="profile">perfil</Link>
                <button>
                    <span onClick={() => setDropdown(!dropdown)}>{userData.nombre}</span>
                    <span><FaAngleDown/></span>
                </button>
            </div>
        </div>
        <Dropdown dropdown={dropdown}/>
    </nav>
    )
}

export default NavBar