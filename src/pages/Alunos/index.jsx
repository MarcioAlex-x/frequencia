import { useEffect, useState } from "react"
import { verifyAuth } from "../../config/auth"
import { getDatabase, onValue, ref } from "firebase/database"
import { useNavigate } from "react-router-dom"

export const Alunos = () =>{
    const [user, setUser] = useState('')
    const [alunos, setAlunos] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        verifyAuth((user)=>{
            if(user){
                setUser(user)
            }
        },[])
    })
    useEffect(()=>{
        const db = getDatabase()
        const alunosRef = ref(db,'alunos')

        onValue(alunosRef,(snapshot)=>{
            const data = snapshot.val()
            const lista = data ? Object.keys(data).map((id)=>({
                
                id,
                ...data[id]
            
            })):[]

            setAlunos(lista)
        })
    },[])
    return(
        <div className="container">
             <h2 className="text-center my-2">Lista de alunos</h2>
             {user ? <p className="text-center text-success">Logado como {user.email}</p> : <p className="text-center text-danger">Por favor, faça o login para continuar</p>}

             <div className="border rounded p-5 shadow my-5">
                <ul className="list-group">
                    {alunos.map((aluno) => (
                        <li key={aluno.alunoId} className="list-group-item d-flex align-items-center justify-content-between">
                            {aluno.nome}
                            <button
                                className="btn btn-sm btn-outline-success"
                                onClick={()=>navigate(`/aluno/${aluno.id}`)}>
                                Acompanhar
                            </button>

                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}