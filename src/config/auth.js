import { app } from './firebase'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

const auth = getAuth()

export const userLogin = (email,password) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user
        alert('Usuário logado com sucesso')
    })
    .catch((err)=>{
        alert('E-mail ou senha incorretos')
    })
}

export const verifyAuth = (logado) =>{
    onAuthStateChanged(auth, (user)=>{
        logado(user)
    })
}

// export const handleSair = () =>{
//     signOut(auth)
//     .then(()=>{
//         alert('saiu')
//     })
//     .catch((err)=>{
//         alert(err)
//     })
// }
