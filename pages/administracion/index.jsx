import React,{useState, useEffect} from 'react'
import { comprobarAdmin, addUsuario } from '../../src/FirebaseConfig/Firebaseconfig'
import { useRouter } from 'next/router'
const Index = () => {
    const rutas = useRouter()
    const[email, setEmail] = useState('')
    const[pass, setPass] = useState('')
    const [admin, setAdmin] = useState('')
    const registrarUsuario = () => {
        addUsuario(email,pass)
        alert('usuario añadido')
        setEmail('')
        setPass('')
    }
    useEffect(()=> {
        //comprobarAdmin(rutas, setAdmin)
        
    },[])
    return (
        <div>
            <div className="row">
                <div className="col-5">
                    <h2>Nuevo Registro</h2>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="text" placeholder='email' className='form-control mt-3' />
                    <input value={pass} onChange={e=>setPass(e.target.value)} type="text" placeholder='contraseña' className='form-control mt-3' />
                    <button onClick={registrarUsuario} className='btn btn-success mt-5'>Registrar</button>
                </div>
            </div>
        </div>
    )
}

export default Index
