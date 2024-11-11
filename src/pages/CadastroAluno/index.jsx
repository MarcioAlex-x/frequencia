import { useEffect, useState } from "react"
import { app } from "../../config/firebase"
import { verifyAuth } from "../../config/auth"
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { useNavigate } from "react-router-dom"

export const CadastroAluno = () => {
    const [user, setUser] = useState('')
    const [nome, setNome] = useState('')
    const [alunos, setAlunos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        verifyAuth((user) => {
            if (user) {
                setUser(user)
            }
        })
    }, [])

    const handleCadastro = () => {
        const db = getDatabase()
        const alunoId = Date.now()

        set(ref(db, `alunos/${alunoId}`), {
            nome
        })
            .then(() => {
                alert('Aluno Cadastrado com sucesso.')
                setNome('')
            })
            .catch(err => alert('Erro ao tentar cadastrar aluno.'))
            .finally(() => setNome(''))
    }

    useEffect(() => {
        const db = getDatabase()
        const alunosRef = ref(db, 'alunos')

        onValue(alunosRef, (snapshot) => {
            const data = snapshot.val()
            const lista = data ? Object.keys(data).map((id) => ({
                id, ...data[id]
            })) : []
            setAlunos(lista)
        })
    }, [])

    return (
        <div className="container">
            <h2 className="text-center my-2">Cadastro</h2>
            {user ? <p className="text-center text-success">Logado como {user.email}</p> : <p className="text-center text-danger">Por favor, faça o login para continuar</p>}

            <div>
                <label htmlFor="nome" className="form-label">Nome:</label>
                <input type="text"
                    placeholder="Informe o nome do aluno"
                    className="form-control"
                    value={nome}
                    onChange={e => setNome(e.target.value)} />
            </div>
            <div>
                <input className="btn btn-primary d-block w-100 mx-auto mt-3" type="submit" value="Salvar" onClick={handleCadastro} />
            </div>
            

        </div>
    )
}