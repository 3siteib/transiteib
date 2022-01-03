import React,{useState} from 'react'
import { addTurno } from '../FirebaseConfig/Firebaseconfig'
const AddTurno = (props) => {
    const {usuario} = props
    const [dia, setDia] = useState('')
    const [turnot, setTurnoT] = useState('')
    const [horaInicio, setHoraInicio] = useState('')
    const [horaDescanso, setHoraDescanso] = useState('')
    const [horaFinDescanso, setFinDescanso] = useState('')
    const [horaFin, setHoraFin] = useState('')
    //Funcion para dividir el string time recibido
    const parseTime = obj => {
        let h = parseInt(obj.split(':')[0])
        let m = parseInt(obj.split(':')[1])
        
        return {h,m}
    }
    //Funcion para calcular las horas recibiendo el tiempo
    const calcularHoras = (t) => {
        let horas = Math.floor(t / 60)
        let minutos = t % 60
        return {horas,minutos}
    }
    const calcularHorasMostrar = (t) => {
        let horas = Math.floor(t / 60)
        let minutos = t % 60
        return `${horas}:${minutos}`
    }

    const add = () => {
        
        let inicio, descanso, findescanso, fin, totalhorasturno, dieta, cena, totalhorasnocomputables
        let totalhorasnocturnas = {
            h:0,
            m:0
        }
        let totalhorasturno_mostrar,totalhorasnocomputables_mostrar,totalhorasnocturnas_mostrar
        //4 TIEMPOS
        if(horaDescanso != '' && horaFinDescanso != ''){
             inicio = parseTime(horaInicio)
             descanso = parseTime(horaDescanso)
             findescanso = parseTime(horaFinDescanso)
             fin = parseTime(horaFin)
             //pasar horas nocturnas
             fin.h === 0 ? fin.h = 24 : fin.h = fin.h
             fin.h === 1 ? fin.h = 25 : fin.h = fin.h
             fin.h === 2 ? fin.h = 26 : fin.h = fin.h
             fin.h === 3 ? fin.h = 27 : fin.h = fin.h
             
             if(inicio.h >= 15 ||inicio.h >= 16 || inicio.h >= 17 ||  inicio.h >= 18 || inicio.h >= 19 || inicio.h >= 20  || inicio.h >= 21 || inicio.h >= 22 || inicio.h >= 23 ){
                fin.h === 0 ? fin.h = 24 : fin.h = fin.h
                fin.h === 1 ? fin.h = 25 : fin.h = fin.h
                fin.h === 2 ? fin.h = 26 : fin.h = fin.h
                fin.h === 3 ? fin.h = 27 : fin.h = fin.h
                fin.h === 4 ? fin.h = 28 : fin.h = fin.h
                fin.h === 5 ? fin.h = 29 : fin.h = fin.h
                fin.h === 6 ? fin.h = 30 : fin.h = fin.h
                fin.h === 7 ? fin.h = 31 : fin.h = fin.h
                console.log(fin.h)
               }

             totalhorasturno = {
                h:((descanso.h - inicio.h) + (fin.h - findescanso.h)) * 60, 
                m: Math.abs((descanso.m - inicio.m) + (fin.m - findescanso.m))
            } 
            totalhorasturno_mostrar = calcularHorasMostrar(totalhorasturno.h + totalhorasturno.m)

            inicio.h <= 12 && descanso.h >= 15 && fin.h >=15 && turnot !== 'reten' ? dieta = 1 : dieta = 0
            
            fin.h >= 20 && fin.h >=23 && turnot !== 'reten' ? cena = 1 : cena = 0
            
            totalhorasnocomputables = {
                h: (totalhorasturno.h + totalhorasturno.m) - 540,
                m: Math.abs(fin.m - inicio.m)
            }
            if(totalhorasnocomputables.h < 0){
                totalhorasnocomputables = {
                    h: 0,
                    m: 0
                }
            }
            totalhorasnocomputables_mostrar = calcularHorasMostrar(totalhorasnocomputables.h + totalhorasnocomputables.m)
            if(fin.h >= 22){
                totalhorasnocturnas = {
                    h: (fin.h - 22) * 60,
                    //m: Math.abs(fin.m - inicio.m)
                    m:fin.m
                }
            }   
            totalhorasnocturnas_mostrar = calcularHorasMostrar(totalhorasnocturnas.h + totalhorasnocturnas.m)
            ////////////////////DOS CAMPOS /////////////////////
            
        }else{
             inicio = parseTime(horaInicio)
             fin = parseTime(horaFin)
             //pasar horas nocturnas
             fin.h === 0 ? fin.h = 24 : fin.h = fin.h
             fin.h === 1 ? fin.h = 25 : fin.h = fin.h
             fin.h === 2 ? fin.h = 26 : fin.h = fin.h
             fin.h === 3 ? fin.h = 27 : fin.h = fin.h
            //Calculo de horas nocturnas apartir de las 22
            if( inicio.h >= 15 ||inicio.h >= 16 || inicio.h >= 17 ||  inicio.h >= 18 || inicio.h >= 19 || inicio.h >= 20  || inicio.h >= 21 || inicio.h >= 22 || inicio.h >= 23 ){
             fin.h === 0 ? fin.h = 24 : fin.h = fin.h
             fin.h === 1 ? fin.h = 25 : fin.h = fin.h
             fin.h === 2 ? fin.h = 26 : fin.h = fin.h
             fin.h === 3 ? fin.h = 27 : fin.h = fin.h
             fin.h === 4 ? fin.h = 28 : fin.h = fin.h
             fin.h === 5 ? fin.h = 29 : fin.h = fin.h
             fin.h === 6 ? fin.h = 30 : fin.h = fin.h
             fin.h === 7 ? fin.h = 31 : fin.h = fin.h
             console.log(fin.h)
            }

             totalhorasturno = {
                h:(fin.h - inicio.h)  * 60, 
                m: Math.abs(fin.m - inicio.m)
            }
            totalhorasturno_mostrar = calcularHorasMostrar(totalhorasturno.h + totalhorasturno.m)
            //comprobar dieta
            inicio.h <= 12 && fin.h >=15 && turnot !== 'reten' && turnot !== 'festivo no'  ? dieta = 1 : dieta = 0
            
            //calcular cena
            fin.h >= 20 && fin.h >=23 && turnot !== 'reten' ? cena = 1 : cena = 0

            totalhorasnocomputables = {
                h: (totalhorasturno.h + totalhorasturno.m) - 540,
                m: Math.abs(fin.m - inicio.m)
            }
            
            if(totalhorasnocomputables.h < 0){
                totalhorasnocomputables = {
                    h: 0,
                    m: 0
                }
            }
            totalhorasnocomputables_mostrar = calcularHorasMostrar(totalhorasnocomputables.h + totalhorasnocomputables.m)
            //NOCTURNIDAD HORAS NOCTURAS
            if(fin.h >= 22){
                totalhorasnocturnas = {
                    h: (fin.h - 22) * 60,
                    //m: Math.abs(fin.m - inicio.m)
                    m:fin.m
                }
            } 
            totalhorasnocturnas_mostrar = calcularHorasMostrar(totalhorasnocturnas.h + totalhorasnocturnas.m)
        }
        let turno = {
            id:usuario.id,
            dia,
            turnot,
            horaInicio,
            horaDescanso,
            horaFinDescanso,
            horaFin,
            totalhorasturno, 
            dieta, 
            cena, 
            totalhorasnocturnas,
            totalhorasnocomputables,
            totalhorasturno_mostrar,
            totalhorasnocomputables_mostrar,
            totalhorasnocturnas_mostrar
        }
        addTurno(turno)
        setTurnoT('')
        setDia('')
        setHoraInicio('')
        setHoraDescanso('')
        setFinDescanso('')
        setHoraFin('')
        alert('Turno agregado correctamente')
    }




    return (
        <div className="mt-4">
            <div className="row">
                
                <div className="col-2">
                <p>DIA</p>
                <input value={dia} onChange={e => setDia(e.target.value)} type="date" placeholder="DIA" className="form-control mt-3" />
                </div>
                <div className="col-2">
                     <p>TURNO</p>
                <input value={turnot} onChange={e => setTurnoT(e.target.value.toLocaleLowerCase())} type="text" placeholder="TURNO" className="form-control mt-3" />
                </div>
                <div className="col-2">
                    <p>HORA INICIO</p>
                <input value={horaInicio} onChange={e => setHoraInicio(e.target.value)} type="time" className="form-control mt-3" />
                </div>
                <div className="col-2">
                    <p>HORA DESCANSO</p>
                <input value={horaDescanso} onChange={e => setHoraDescanso(e.target.value)} type="time" className="form-control mt-3" />
                </div>
                <div className="col-2">
                    <p>FIN DESCANSO</p>
                <input value={horaFinDescanso} onChange={e => setFinDescanso(e.target.value)} type="time" className="form-control mt-3" />
                </div>
                <div className="col-2">
                    <p>HORA FIN</p>
                <input value={horaFin} onChange={e => setHoraFin(e.target.value)} type="time" className="form-control mt-3" />
                </div>
            </div>
            <div className="row">
                <div className="col-3 mt-4">
                    <button onClick={add} className="btn btn-primary">AÑADIR TURNO</button>
                </div>
            </div>
        </div>
    )
}

export default AddTurno 
