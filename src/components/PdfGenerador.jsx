import React, {useEffect,useState} from 'react'
import  Image  from 'next/image'
const PdfGenerador = () => {
    
    const [turnos, setTurnos] = useState([])
    const [turnosCalculados, setTurnosCalculados] = useState({})

    useEffect(()=> {
        setTurnos(JSON.parse(window.localStorage.getItem('turnos')))
        setTurnosCalculados(JSON.parse(window.localStorage.getItem('turno_calculados')))
    },[])
    
      
    return (
        
            <div className='pdf'>
                <div className='imagen-pdf'>
                    <Image alt="logo de el comite" src="/imagenes/logo-ruiz-site.png" height={300} width={300} ></Image>
                </div>
            <p className='no-pdf alert alert-danger mt-3'>
                Para guardar el turno como pdf por favor pulsa <strong>boton derecho</strong> - <strong>Imprimir</strong> - <strong>Guardar como PDF</strong>
            </p>
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
                                    <div className="col-1 dia-imprimir">{turnosCalculados.diastrabajados}</div>
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
                        </tr>
                        ))
                        ): ('')}
                    </tbody>
                </table>
        </div>
            
        
    )
  
    
}


export default PdfGenerador
