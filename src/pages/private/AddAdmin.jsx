import { useState, useMemo } from "react"
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import { BiReset } from "react-icons/bi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast"
import AdminNavBar from "../../components/private/AdminNavBar"
import { ubicaciones } from "../../helpers/ubicaciones.js"

function AddAdmin() {

  const {userData} = useSelector(state => state.auth)

  const [location, setLocation] = useState({lat:10.39,lng:-75.51})
  const [departamento, setDepartamento] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [barrio, setBarrio] = useState("")
  const [password, setPassword] = useState("")

  const [markup, setMarkup] = useState(null)
  const [zoom, setZoom] = useState(12)

  const {isLoaded} = useLoadScript({googleMapsApiKey:import.meta.env.VITE_MAPS_API})


  // Obtener las ciudades dependiendo del input seleccionado en departamento

  const ciudades = useMemo(() => {
    setCiudad("")
    return ubicaciones.reduce((acc,obj) => {
      if (obj.departamento === departamento) {
        for (let ciudad of obj.ciudades) {
          acc.push(ciudad)
        }
      }
      return acc
    },[])
  }, [departamento])


  // Obtener la ubicacion agregada en el formulario para luego ser mostrada en el google maps

  const searchLocation = async () => {
    
    if ([ciudad,barrio,departamento].includes("")) return toast.error("Llena todos los campos de ubicacion")
    const address = `${barrio},${ciudad},${departamento},"Colombia"`

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${import.meta.env.VITE_MAPS_API}`
      const response = await fetch(url).then(data => data.json())

      if (response.status === "OK") {
        const ubicacion = response.results[0].geometry.location
        setLocation(ubicacion)
        setZoom(16)
      } else {
        toast.error("No se pudo obtener la ubicacion")
      }
    } catch (error) {
      toast.error(`Error al obtener la ubicacion: ${error.message}`)
    }
  }

  // Obtener la latitud y longitud del mapa al hacer click sobre ella y 
  // luego guardarla en la base de datos para luego mostrar las residencias agregadas
  // en el dahsboard tambien a travez de un mapa de google maps

  const handleMarker = e => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()

    setMarkup({lat,lng})
  }

  // Generar contraseña aleatoria en el form

  const genPassword = () => {
    const random = Math.random().toString(36).substring(2)
    setPassword(random)
  }


  const handleSubmit = async e => {
    e.preventDefault()

    const form = e.currentTarget
    const formdata = new FormData(form)

    const nombre = formdata.get("nombre")
    const email = formdata.get("email")
    const residencia = formdata.get("residencia")
    const direccion = formdata.get("direccion")

    const body = {
      nombre,
      email,
      password,
      direccion,
      residencia,
      barrio,
      ciudad,
      departamento
    }

    const VALUES = Object.values(body)

    if (VALUES.length < 8 || VALUES.includes("")) return toast.error("Todos los campos son obligatorios")
    if (nombre.split(" ").length < 2) return toast.error("Nombre y apellido son obligatorios")
    if (password.length < 8) return toast.error("La contraseña debe tener al menos 8 caracteres")
    if (!markup) return toast.error("Añade la ubicacion de la residencia haciendo click en el mapa")

    const toastLoading = toast.loading("Agregando administrador...")

    try {
      const url = `${import.meta.env.VITE_SUDO_API}/admin/${userData._id}/${JSON.stringify(markup)}`
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(data => data.json())

      if (response?.error) return toast.error(response.error)
      if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

      toast.success(response.success)
      form.reset()
      setBarrio("")
      setCiudad("")
      setDepartamento("")
      setPassword("")
      setMarkup(null)

    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    } finally {
      toast.dismiss(toastLoading)
    }
  }


  if (!isLoaded) return null
  return (
    <>
        <AdminNavBar/>
        <main className="adminMain">
          <form className="addAdminForm" onSubmit={handleSubmit}>
            <div className="field">
              <label>Nombre y apellidos: </label>
              <input type="text" name="nombre" />
            </div>
            <div className="field">
              <label>Email: </label>
              <input type="text" name="email" />
            </div>
            <div className="field">
              <label>Contraseña: </label>
              <div className="genPassword">
                <input type="text" onChange={e => setPassword(e.target.value)}
                  name="password" value={password} />
                <button type="button" 
                  onClick={genPassword}>Generar<span><BiReset/></span></button>
              </div>
            </div>
            <div className="field">
              <label>Departamento: </label>
              <select onChange={e => setDepartamento(e.target.value)} value={departamento}>
                <option value=""> --Seleccione el Departamento-- </option>
                {ubicaciones.map((obj,index) => {
                  const {departamento} = obj
                  return (
                    <option key={index} 
                    value={departamento} >{departamento}</option>
                  )
                })}
              </select>
            </div>
            <div className="field">
              <label>Ciudad: </label>
              <select onChange={e => setCiudad(e.target.value)}
                disabled={departamento ? false : true} value={ciudad}>
                <option value=""> --Seleccione la Ciudad-- </option>
                {ciudades.map((ciudad,index) => (
                  <option key={index} value={ciudad}>{ciudad}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Barrio: </label>
              <input type="text" onChange={e => setBarrio(e.target.value)}
                value={barrio} name="barrio" disabled={ciudad ? false : true} />
            </div>
            <div className="field">
              <label>Direccion: </label>
              <input type="text" name="direccion" disabled={ciudad ? false : true} />
            </div>
            <div className="field">
              <label>Residencia: </label>
              <input type="text" name="residencia" disabled={ciudad ? false : true} />
            </div>
            <button type="button" onClick={searchLocation}
              className="searchMap">Buscar ubicacion en el mapa</button>
            <GoogleMap zoom={zoom}   
              center={location} 
              onClick={handleMarker}
              mapContainerClassName="mapClass">
                {markup && (
                  <Marker position={markup}/>
                )}
            </GoogleMap>
            <input type="submit" value="AGREGAR ADMIN" className="smtBtn" />
          </form>
        </main>
    </>  
  )
}

export default AddAdmin