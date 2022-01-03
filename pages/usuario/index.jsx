import React,{useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Configuracion from '../../src/components/Configuracion'
import AddTurno from '../../src/components/AddTurno'
import Calculador from '../../src/components/Calculador'
import { comprobarUSuario } from '../../src/FirebaseConfig/Firebaseconfig'
import Reuniones from '../../src/components/Reuniones'
import Convenio from '../../src/components/Convenio'
import DatosInteres from '../../src/components/DatosInteres'
const Index = () => {
    const router = useRouter()
    const [showConfig, setShowConfig] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const [showCalculador, setShowCalculador] = useState(false)
    const [usuario, setUsuario] = useState(null)
    const [showReuniones, setShowReuniones] = useState(false)
    const [showConvenio, setShowConvenio] = useState(false)
    const [showDatosInteres, setShowDatosInteres] = useState(false)
    useEffect(()=>{ 
        comprobarUSuario(router, setUsuario)
    },[])

    return (
        <div>
            <div className="row mt-3">
                <div className="col-12"><h4>Bienvenido a Grupo Ruiz</h4></div>
            </div>
            <div className="row mt-2">
                {/* <div className="col-3">
                <i className="icono bi bi-server"></i>
                    <h2 className='badge bg-secondary'>Nominas</h2>
                </div> */}
                <div className="col-3" onClick={()=>setShowReuniones(!showReuniones)}>
                <i className="icono bi bi-paperclip"></i>
                    <h2 className='badge bg-secondary'>Reuniones</h2>
                </div>
                <div className="col-3" onClick={()=>setShowConvenio(!showConvenio)}>
                <i className="icono bi bi-file-earmark"></i>
                    <h2 className='badge bg-secondary'>Convenio</h2>
                </div>
                <div className="col-3" onClick={()=>setShowDatosInteres(!showDatosInteres)}>
                <i className=" icono -1 bi bi-file-code"></i>
                    <h2 className='badge bg-secondary'>Datos de interes</h2>
                </div>
            </div>
            <hr />
            <div className="row mt-3">
                <div className="col-3 btn-mostrar" onClick={()=>setShowConfig(!showConfig)}>
                 <i className="bi bi-person-lines-fill icon-usuario"></i>
                 <span>Perfil</span>
                </div>
                <div className="col-3 btn-mostrar" onClick={()=>setShowAdd(!showAdd)}>
                <i className="bi bi-journal-text icon-usuario"></i>
                 <span>Añadir Turno</span>
                </div>
                <div className="col-3 btn-mostrar" onClick={()=>setShowCalculador(!showCalculador)}>
                 <i className="bi bi-calculator icon-usuario"></i>
                 <span>Calculo de Horas</span>
                </div>
                
            </div>
            
            <div>
                {showConfig ? (<Configuracion usuario = {usuario}></Configuracion>): ''}
                {showAdd ? (<AddTurno usuario = {usuario}></AddTurno>): ''}
                {showCalculador ? (<Calculador usuario = {usuario}></Calculador>): ''}
                {showReuniones ? (<Reuniones></Reuniones>): ''}
                {showConvenio ? (<Convenio></Convenio>): ''}
                {showDatosInteres ? (<DatosInteres></DatosInteres>): ''}
            </div>
        </div>
    )
}

export default Index
