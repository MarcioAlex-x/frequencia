import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Frequencia } from '../pages/Frequencia'
import { CadastroAluno } from '../pages/CadastroAluno'
import { Navegacao } from '../components/Navegacao'
import { Aluno } from '../pages/Aluno'
import { Alunos } from '../pages/Alunos'
import { app } from '../config/firebase'
import { verifyAuth } from '../config/auth'
import{ getAuth, signOut } from 'firebase/auth' 
import { useState, useEffect } from 'react'
const auth = getAuth(app)
export const Rotas = () =>{
    const [user, setUser] = useState(null)

    useEffect(() => {
        verifyAuth((user) => {
            if (user) {
                setUser(user)
            }else{
                setUser(null)
            }
        })
    }, [])

    const handleSair = () =>{
        signOut(auth)
            .then(()=>{
                setUser(null)
                alert('Logout realizado com sucesso!')
            })
            .catch((err)=>{
                alert('Ocorreu um erro ao tentar sair do sistema!')
            })
    }
   
    return(
        <>
            <Router>
                <Navegacao user={user} handleSair={handleSair}/>
                <Routes>
                    <Route path='/' element={user? <Navigate to='/frequancia' /> : <Home />} /> 
                    {user && <Route path='/frequencia' element={user ? <Frequencia /> : <Navigate to='/' /> } />}
                    {user && <Route path='/cadastro' element={user ? <CadastroAluno /> : <Navigate to ='/' />} />}
                    { user && <Route path='/aluno/:id' element={user ? <Aluno /> : <Navigate to='/' />} />}
                    {user && <Route path='/alunos' element={user ? <Alunos /> : <Navigate to='/' />} />}
                </Routes>
            </Router>
        </>
    )
}