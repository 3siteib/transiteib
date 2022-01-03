import React,{useState} from 'react'
import { useRouter } from 'next/router'
import {logIn} from '../../src/FirebaseConfig/Firebaseconfig'
const Index = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(false)
    const router = useRouter()
    const goToUser = async() => {
        const p = await logIn(email, pass)
        if(p === 'auth/user-not-found'){    
            setError('Usuario no encontrado')
        }else if(p === 'auth/invalid-email'){
            setError('Email invalido')
        }else if(p === 'auth/wrong-password'){
            setError('Contraseña incorrecta')
        }else{
            router.push('/usuario')
        }
        
    }
    return ( 
        <div>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 mt-4 pt-4 pb-4 relieve">
                    <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Usuario" className="form-control mt-4" />
                    <input onChange={e => setPass(e.target.value)} type="password" placeholder="Contraseña" className="form-control mt-4" />
                    <button onClick={goToUser} className="btn btn-primary mt-4">ACCEDER</button>
                </div>
                <div className="col-4"></div>
                
            </div>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 mt-5">
                    {error ? (
                        <p className="alert alert-danger">{error}</p>
                    ):('')}
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    )
}

export default Index
