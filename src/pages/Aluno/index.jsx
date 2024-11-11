import { app } from "../../config/firebase"
import { getDatabase, ref, onValue, set } from "firebase/database"
import { verifyAuth } from "../../config/auth"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Aluno = () => {
    const { id } = useParams()
    const [user, setUser] = useState('')
    const [aluno, setAluno] = useState(null)
    const [notas, setNotas] = useState([])
    const [novaNota, setNovaNota] = useState('')
    const [observacao, setObservacao] = useState('')
    const [tipoNota, setTipoNota] = useState('Avaliação')
    const [presenca, setPresenca] = useState({})

    useEffect(() => {
        verifyAuth((user) => {
            if (user) {
                setUser(user)
            }
        })
    }, [])

    useEffect(() => {
        const db = getDatabase()
        const alunoRef = ref(db, `alunos/${id}`)



        onValue(alunoRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                setAluno(data)
                setNotas(data.notas || [])
                
                setPresenca(data.presenca || {})
            }
        })
    }, [id])

    const handleAddNota = () => {
        const db = getDatabase()
        const newNota = {
            tipo: tipoNota,
            valor: novaNota,
            observacao: observacao,
        }

        const updatedNotas = [...notas, newNota]
        set(ref(db, `alunos/${id}/notas`), updatedNotas)
        setNotas(updatedNotas)
        setNovaNota('')
        setObservacao('')
    }

    // Cálculo da média
    const calcularMedia = () => {
        if (notas.length === 0) return 0
        const soma = notas.reduce((acc, nota) => acc + parseFloat(nota.valor), 0)
        return (soma / notas.length).toFixed(2)
    }

    return (
        <div className="container">
            <h2 className="text-center my-2">Aluno: {aluno?.nome}</h2>
            {user && <p className="text-center text-success">Logado como {user.email}</p>}

            <div className="my-5 row border border-2 rounded-3 p-5">
                    <div className="col-6">
                        <input
                        className="form-control my-1"
                            type="text"
                            placeholder="Nota"
                            value={novaNota}
                            onChange={(e) => setNovaNota(e.target.value)}
                        />
                    </div>
                    <div className="col-6">
                        <select
                        className="form-control my-1"
                            value={tipoNota}
                            onChange={(e) => setTipoNota(e.target.value)}
                        >
                            <option value="Avaliação">Avaliação</option>
                            <option value="Teste">Teste</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <textarea
                        className="form-control my-1"
                            type="text"
                            placeholder="Observação"
                            value={observacao}
                            onChange={(e) => setObservacao(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="px-3">
                        {!novaNota ? <button className="btn btn-secondary w-100 btn-sm mt-3 disabled" onClick={handleAddNota}>Informe a nota</button> : <button className="btn btn-primary w-100 btn-sm mt-3" onClick={handleAddNota}>Adicionar Nota</button> }
                    </div>
                
            </div>

            <div className="mb-3 row mt-4 border border-2 p-5 rounded-3">
                <div className="col-6">
                    <h4>Notas</h4>
                    <ul className="list-group">
                        {notas.map((nota, index) => (
                            <li key={index} className="list-group-item">
                                {nota.tipo}: {nota.valor} - {nota.observacao}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-6">
                    <h4>Faltas</h4>
                    <ul className="list-group">
                        {Object.keys(presenca).map((data) => {
                            return !presenca[data] ? ( // Exibe apenas as datas em que a falta foi registrada
                                <li key={data} className="list-group-item">
                                    {data} (Falta)
                                </li>
                            ) : null
                        })}
                    </ul>
                </div>
            </div>

            <div className="mb-3">
                <h4>Média das Notas: {calcularMedia()}</h4>
            </div>
        </div>
    )
}
