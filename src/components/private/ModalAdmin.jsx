import { useDispatch, useSelector } from "react-redux"
import { showModal } from "../../redux/features/admin.slice.js"
import { FaWindowClose } from "react-icons/fa";
import { formatDate } from "../../helpers/functions.js";
import { useState, useEffect } from "react";

function ModalAdmin({adminId}) {

    const {admins} = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const [sudoName, setSudoName] = useState("")

    const admin = admins.find(({_id}) => _id === adminId)

    const {nombre,email,residencia,ciudad,token,direccion,barrio,departamento,
    agregadoPor,propietarios,asistente,revisorFiscal,contador,consejo,createdAt} = admin


    useEffect(() => {
        try {
            const url = `${import.meta.env.VITE_SUDO_API}/user/${agregadoPor}`
            fetch(url)
                .then(data => data.json())
                .then(response => {
                    if (response?.serverError) return console.log(response.serverError)
                    setSudoName(response.nombre)
                })
        } catch (error) {
            console.log(error.message)
        }
    }, [])


    return (
    <div id="ModalAdmin">
        <h2>Datos del administrador</h2>
        <div className="info">
            <p>Nombres: <span>{nombre}</span></p>
            <p>Email: <span>{email}</span></p>
            <p>Residencia: <span>{residencia}</span></p>
            <p>Departamento: <span>{departamento}</span></p>
            <p>Ciudad: <span>{ciudad}</span></p>
            <p>Direccion: <span>{direccion}</span></p>
            <p>Barrio: <span>{barrio}</span></p>
            <p>Confirmado: <span>{token ? "No" :  "Si"}</span></p>
            <p>Propietarios:  
                <span> {propietarios.length > 0 ? propietarios.length : "Ninguno registrado"}</span>
            </p>
            <p>Consejo: 
                <span> {consejo.length > 0 ? consejo.length : "Ninguno registrado"}</span>
            </p>
            <p>Asistente: <span>{asistente ? "Si" : "No registrado"}</span></p>
            <p>Revisor Fiscal: <span>{revisorFiscal ? "Si" : "No registrado"}</span></p>
            <p>Contador: <span>{contador ? "Si" : "No registrado"}</span></p>
            <p>Agregado por: <span>{sudoName}</span></p>
            <p>Creado el: <span>{formatDate(createdAt)}</span></p>
        </div>
        <button className="closeBtn"
            onClick={() => dispatch(showModal(""))}>
            <FaWindowClose/>        
        </button>
    </div>
    )
}

export default ModalAdmin