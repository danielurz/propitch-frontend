import {FaPowerOff} from 'react-icons/fa'

function Dropdown({dropdown}) {

    const cerrarSesion = () => {
        localStorage.removeItem('propitch-token')
        window.location.href = '/'
    }

    return (
        <div id='Dropdown' className={dropdown ? "showDrop" : ""}>
            <ul>
                <li onClick={cerrarSesion}>
                    <span>Cerrar Sesion</span>
                    <FaPowerOff className='off'/>
                </li>
            </ul>
        </div>
    )
}

export default Dropdown