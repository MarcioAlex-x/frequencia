import { useEffect, useState } from "react"
import { app } from "../../config/firebase"
import { getDatabase, onValue, ref, update } from "firebase/database"
import { verifyAuth } from "../../config/auth"

export const Frequencia = () => {
    const [user, setUser] = useState('')
    const [alunos, setAlunos] = useState([])
    const [data, setData] = useState('')

    useEffect(() => {
        verifyAuth((user) => {
            if (user) {
                setUser(user)
            }
        })
    }, [])

    useEffect(() => {
        const db = getDatabase()
        const alunosRef = ref(db, 'alunos')

        onValue(alunosRef, (snapshot) => {
            const data = snapshot.val()
            if (data) { 
                
                const listaIds = Object.keys(data)

                const listaAlunos = listaIds.map((id) => ({
                    id,
                    nome: data[id].nome,
                    presente: false
                }))
                setAlunos(listaAlunos)
            } else {
                setAlunos([])
            }
        })
    }, [])

    const handleChamada = (id) => {
        setAlunos((prevAlunos) =>
            prevAlunos.map((aluno) =>
                aluno.id === id ? { ...aluno, presente: !aluno.presente } : aluno
            )
        )
    }

    const salvarPresenca = () => {
        const db = getDatabase()
        const updates = {}

        alunos.forEach((aluno) => {
            updates[`alunos/${aluno.id}/presenca/${data}`] = aluno.presente
        })

        update(ref(db), updates)
            .then(() => {
                alert('Frequência realizada com sucesso')
            })
            .catch((err) => {
                alert('Não foi possível salvar a frequência')
            })
    }

    return (
        <div className="container">
            <h2 className="text-center my-2">Frequência</h2>
            <p className="text-center">Ao marcar o aluno receberá presença no dia selecionado</p>
            {user ? (
                <p className="text-center text-success">Logado como {user.email}</p>
            ) : (
                <p className="text-center text-danger">Por favor, faça o login para continuar</p>
            )}

            <div className="row mt-5">
                <div className="col-12 col-md-6 col-lg-4">
                    <input
                        className="form-control"
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                    <ul className="list-group">
                        {alunos.map((aluno) => (
                            <li key={aluno.id} className="list-group-item d-flex justify-content-between">
                                {aluno.nome}
                                <input
                                    type="checkbox"
                                    checked={aluno.presente}
                                    onChange={() => handleChamada(aluno.id)}
                                    style={{ marginLeft: "10px" }}
                                />
                            </li>
                        ))}
                    </ul>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={salvarPresenca}
                        disabled={!data}
                    >
                        Salvar Presença
                    </button>
                </div>
            </div>
        </div>
    )
}
