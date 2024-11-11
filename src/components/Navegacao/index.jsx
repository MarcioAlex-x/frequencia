import { Link } from "react-router-dom";

export const Navegacao = ({ user, handleSair }) => {

    return (
        <nav className="">
            <div className="navbar d-flex justify-content-center gap-4 mb-4">
                {user ?
                    <span className="fs-4 fw-bold btn" onClick={handleSair}>Sair</span>
                    :
                    <Link className="navbar-link text-dark fw-bold fs-4"
                        style={{ textDecoration: 'none' }}
                        to='/'>
                        Início
                    </Link>
                }

                {user && <Link className="navbar-link text-dark fw-bold fs-4"
                    style={{ textDecoration: 'none' }}
                    to='/cadastro'>
                    Cadastro
                </Link>}

                {user && <Link className="navbar-link text-dark fw-bold fs-4"
                    style={{ textDecoration: 'none' }}
                    to='/alunos'>
                    Lista de alunos
                </Link>}

                {user && <Link className="navbar-link text-dark fw-bold fs-4"
                    style={{ textDecoration: 'none' }}
                    to='/frequencia'>
                    Frequência
                </Link>}
            </div>

            <div className="row mx-auto">
                <img className="col-12 d-block m-auto border  border-2 rounded-5 border-primary shadow" src="hero.png" alt="Alex Freitas engenheiro front-end" style={{ width: '200px' }} />
                <p className="fs-3 text-primary col-12 text-center">Frequência da Turma de Desenvolvimento de Sistemas NodeJS</p>
            </div>
        </nav>
    )

}