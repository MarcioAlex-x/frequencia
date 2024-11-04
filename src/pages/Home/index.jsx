import { useEffect, useState } from "react"
import { userLogin } from "../../config/auth"
import { useNavigate } from 'react-router-dom'

export const Home = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

   const handleSubmit = (e) =>{
    e.preventDefault()
    userLogin(email, password)
    navigate('/frequencia')
   }

    return(
        <div className="container">
            
            <p className="fs-4 text-center mt-5 fw-bold">
                Login
            </p>
            <form onSubmit={handleSubmit} className="w-75 mx-auto" >
                <div>
                    <label className="label-form">E-mail</label>
                    <input type="text" className="form-control" name="email" onChange={e=>setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="label-form">Senha</label>
                    <input type="password" className="form-control" name="password" onChange={e=>setPassword(e.target.value)} />
                </div>
                <input className="d-block w-100 mt-3 btn btn-outline-primary fw-bold " type="submit" value="Entrar" />
            </form>
        </div>
    )
}