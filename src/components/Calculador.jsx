import React,{useEffect, useState} from 'react'
import { consultarTurnos, borrarTurno, getAntiguedad } from '../FirebaseConfig/Firebaseconfig'
import { calculoTotal, calcularHoras } from '../funciones/calculoadd'
import {useRouter} from 'next/router'

const Calculador = (props) => {
    const {usuario} = props
    const runtas = useRouter()
    const [refresco, setRefresco] = useState(false)
    const [desde, setDesde] = useState('')
    const [hasta, setHasta] = useState('')
    const [turnos, setTurnos] = useState(null)
    const [turnosCalculados, setTurnosCalculados] = useState(null)
    const [antiguedad, setAntiguedad] = useState(0)
    const consulta = async()=> {
        await consultarTurnos(usuario.id, desde, hasta, setTurnos)
        getAntiguedad(usuario.id, setAntiguedad)
        
    }
    const calcular = () => {
        setTurnosCalculados(calculoTotal(usuario.id,turnos, antiguedad))
        setRefresco(!refresco)
    }
    const showPDF = () => {
        runtas.push('/pdf')
    }
    const borrar = (id) => {
        borrarTurno(id)
        consultarTurnos(usuario.id, desde, hasta, setTurnos)
        setRefresco(!refresco)
    }
   
    useEffect(()=> {
        window.localStorage.setItem('turno_calculados', JSON.stringify(turnosCalculados))
        window.localStorage.setItem('turnos', JSON.stringify(turnos))
    },[refresco])
    
    return (
        <div className="mt-3">
            <div className="row mt-3">
                <div className="col-12">
                    <h2>Modulo de calculo de horas</h2>
                    <p>Por favor seleccina una fecha de inicio y una fecha de fin para calcular lo
                        necesario entre dichas fechas.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <p className="badge bg-primary">Desde: </p>
                    <input onChange={e=>setDesde(e.target.value)} type="date" className="form-control" />
                </div>
                <div className="col-2">
                <p className="badge bg-danger">Hasta:</p>
                <input onChange={e=>setHasta(e.target.value)} type="date" className="form-control" />
                </div>
                <div className="col-2">   
                    <button onClick={consulta} className="btn btn-primary mt-5">Consultar</button>
                </div>
                <div className="col-2">   
                    <button onClick={calcular} className="btn btn-success mt-5">Calcular</button>
                </div>
                <div className="col-2">   
                    <button onClick={showPDF} className="btn btn-success mt-5">PDF</button>
                </div>
                {/* <div className="col-2">   
                    <a className='btn btn-primary' href='https://docs.google.com/spreadsheets/d/1ifgkuf_NWn7NGsfHAsm0DS5zvt68k07NPmCp9aN8VK0/edit?usp=sharing'>TABLA</a>
                </div> */}
            </div>
                
                    
                        {turnosCalculados != null ? (
                            
                                <div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-1">dias</div>
                                        <div className="col-1">dietas</div>
                                        <div className="col-1">cenas</div>
                                        <div className="col-1">T. horas</div>
                                        <div className="col-1">H. extra</div>
                                        <div className="col-1">N. comp</div>
                                        <div className="col-1">H. noche</div>
                                        <div className="col-1">€ EXTRA</div>
                                        <div className="col-1">€ DIETA</div>
                                        <div className="col-1">€ CENA</div>
                                        <div className="col-1">€ NOCHE</div>
                                        
                                    </div>
                                    <div className="row">
                                        <div className="col-1">{turnosCalculados.diastrabajados}</div>
                                        <div className="col-1">{turnosCalculados.totaldietas}</div>
                                        <div className="col-1">{turnosCalculados.totalcenas}</div>
                                        <div className="col-1">{turnosCalculados.horastotalesmostrar}</div>
                                        <div className="col-1">{turnosCalculados.horasextramostrar}</div>
                                        <div className="col-1">{turnosCalculados.horasnocomputablesmostrar}</div>
                                        <div className="col-1">{turnosCalculados.horasnocturnasmostrar}</div>
                                        <div className="col-1">{turnosCalculados.cantidadmonedahorasextra}</div>
                                        <div className="col-1">{turnosCalculados.cantidadmonedadieta}</div>
                                        <div className="col-1">{turnosCalculados.cantidadmonedacena}</div>
                                        <div className="col-1">{turnosCalculados.cantidadmonedanocturnidad}</div>
                                        
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-2">€ Festivo</div>
                                        <div className="col-2">€ Festivo no</div>
                                        <div className="col-2">€ libre</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">{turnosCalculados.cantidadmonedafestivo}</div>
                                        <div className="col-2">{turnosCalculados.cantidadmonedafestivonotrabajado}</div>
                                        <div className="col-2">{turnosCalculados.cantidadmonedalibre}</div>
                                    </div>
                                    <hr />
                                </div>
                                    
                               
                        ):
                        ('')}
                    
                
            
                <table className="table">
                    <thead>
                        <tr>
                            <th>dia</th>
                            <th>turno</th>
                            <th>H inicio</th>
                            <th>I descanso</th>
                            <th>F descanso</th>
                            <th>H fin</th>
                            <th>H Trabajadas</th>
                            <th>N computo</th>
                            <th>dieta</th>
                            <th>cena</th>
                            <th>nocturnidad</th>
                        </tr>
                    </thead>
                    <tbody>
                    {turnos != null ? (
                        turnos.map(i => (
                        <tr key={i.id}>
                            <td>{i.data.dia}</td>
                            <td>{i.data.turnot}</td>
                            <td>{i.data.horaInicio}</td>
                            <td>{i.data.horaDescanso}</td>
                            <td>{i.data.horaFinDescanso}</td>
                            <td>{i.data.horaFin}</td>
                            <td>{i.data.totalhorasturno_mostrar}</td>
                            <td>{i.data.totalhorasnocomputables_mostrar}</td>
                            <td>{i.data.dieta}</td>
                            <td>{i.data.cena}</td>
                            <td>{i.data.totalhorasnocturnas_mostrar}</td>
                            <td><button onClick={()=>{borrar(i.id)}} className='btn btn-danger'>X</button></td>
                        </tr>
                        ))
                        ): ('')}
                    </tbody>
                </table>
        </div>
    )
}

export default Calculador
