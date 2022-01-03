import React,{useState, useEffect} from 'react'
import { ingresarConfiguracion, comprobrarConfiguracion,actualizarConfiguracion } from '../FirebaseConfig/Firebaseconfig'
const Configuracion = (props) => {
    
    const {usuario} = props
    const [update, setUpdate] = useState(false)
    const [nominaBase, setNominaBase] = useState(0)
    const [irpf, setIRPF] = useState(0)
    const [antiguedad, setAntiguedad] = useState(0)
    const [docId, setDocId] = useState('')

    const actualizar = () => {
        
        const datos = {
            id:usuario.id,
            antiguedad
        }
        comprobrarConfiguracion(usuario.id, setDocId, setUpdate, setNominaBase, setIRPF, setAntiguedad)
        actualizarConfiguracion(docId, datos )
    }
    const ingresar = () => {
        const datos = {
            id:usuario.id,
            antiguedad
        }
        ingresarConfiguracion(datos)
        setUpdate(true)
    }

    useEffect(()=> {
        comprobrarConfiguracion(usuario.id, setDocId, setUpdate,setAntiguedad)
    },[])

    return (
        <div className="mt-4">
            <div className="row">
                <div className="col-8">
                    <h4>Cual es tu antigüedad en la empresa?</h4>
                    <small>Selecciona tu antiguedad dentro del rango por favor.</small>
                    <select className='form-control' onChange={e=>setAntiguedad(e.target.value)}>
                        <option value="0">0</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                    {/* <input value={antiguedad} onChange={e => setAntiguedad(e.target.value)} type="text" className="form-control mt-3" /> */}
                    {update ? (
                        <button onClick={actualizar} className="btn btn-info mt-4">ACTUALIZAR</button>
                    ):(
                        <button onClick={ingresar} className=" mt-4 btn btn-success">INGRESAR</button>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default Configuracion
