import { toast } from "react-hot-toast"
import {useDispatch} from "react-redux"
import { autenticacion } from "../../helpers/functions.js"

function Login() {

  const dispatch = useDispatch()

  const handleForm = async e => {
    e.preventDefault()

    const form = e.currentTarget
    const formdata = new FormData(form)

    const email = formdata.get("email")
    const password = formdata.get("password")

    console.log(import.meta.env.VITE_SUDO_API)
    try {
      const url = `${import.meta.env.VITE_SUDO_API}/login`
      const response = await fetch(url,{
        method: "POST",
        body: JSON.stringify({email,password}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(data => data.json())

      if (response?.error) return toast.error(response.error)
      if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

      localStorage.setItem("propitch-token", response.token)
      form.reset()
      autenticacion(dispatch)

    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    }
  }

  return (
    <div id="Login">
      <div className="formbox">
        <div className="legend">
          <p>Propitch</p>
          <img src="../../logo.svg" alt="" />
        </div>
      <form autoComplete="off" onSubmit={handleForm}>
          <input type="text" name="email" placeholder="Tu email" />
          <input type="password" name="password" placeholder="Tu contraseña" />
          <input type="submit" value="INICIAR SESION" className="smtBtn" />
      </form>
      </div>
    </div>
  )
}

export default Login