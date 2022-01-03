import { getAntiguedad } from "../FirebaseConfig/Firebaseconfig"

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



const calculoTotal = (id,turnos,a) => {
    let diastrabajados = turnos.length 
    let antiguedad = parseInt(a)
    let horasdiastrabajados = turnos.length * 8
    let preciohoraextra = 0.211166666666667
    let preciodieta = 11.3
    let preciocena = 8.78
    let precionocturnidad
    switch(antiguedad){
        case 0:
        precionocturnidad = 0.044666666666667
        break
        case 2:
        precionocturnidad = 0.046
        break
        case 4:
        precionocturnidad = 0.0475
        break
        case 8:
        precionocturnidad = 0.050333333333333
        break
        case 12:
        precionocturnidad = 0.052666666666667
        case 16:
        precionocturnidad = 0.056
        break
        case 20:
        precionocturnidad = 0.058833333333333
        break
        case 25:
        precionocturnidad = 0.066
        break
    }
    let preciofestivo = 121
    let preciofestivonotrabajado = 101
    let preciolibre = 95

    let horastotales = 0
    let horastotalesnocomputables = 0
    let horastotalesnocturnas = 0
    let totaldietas = 0
    let totalcenas = 0
    let suma = 0
    let sumanocomputables = 0
    let sumanocturnas = 0

    let festivo = 0
    let festivonotrabajado = 0
    let libre = 0

    turnos.map( turno => {
        const t = turno.data.turnot.toLowerCase()
        
        if(turno.data.turnot !== 'festivo' && turno.data.turnot !== 'festivo no' && turno.data.turnot !== 'reten' && turno.data.turnot !== 'libre'){
            
            suma = turno.data.totalhorasturno.h + turno.data.totalhorasturno.m
            sumanocomputables = turno.data.totalhorasnocomputables.h + turno.data.totalhorasnocomputables.m
            sumanocturnas = turno.data.totalhorasnocturnas.h + turno.data.totalhorasnocturnas.m
            horastotales += suma
            horastotalesnocomputables += sumanocomputables
            horastotalesnocturnas += sumanocturnas
            totaldietas += turno.data.dieta
            totalcenas += turno.data.cena
        } 
        if(turno.data.turnot === 'festivo' && turno.data.turnot !== 'reten' && turno.data.turnot !== 'festivo no' && turno.data.turnot !== 'libre'){
            totaldietas += turno.data.dieta
            totalcenas += turno.data.cena
            sumanocturnas = turno.data.totalhorasnocturnas.h + turno.data.totalhorasnocturnas.m
            festivo += 1
            horastotalesnocturnas += sumanocturnas
        } 
        if(turno.data.turnot === 'libre' && turno.data.turnot !== 'reten' && turno.data.turnot !== 'festivo no' && turno.data.turnot !== 'festivo'){
            totaldietas += turno.data.dieta
            totalcenas += turno.data.cena
            sumanocturnas = turno.data.totalhorasnocturnas.h + turno.data.totalhorasnocturnas.m
            libre += 1
            horastotalesnocturnas += sumanocturnas
        } 
        if(turno.data.turnot === 'festivo no' && turno.data.turnot !== 'reten' && turno.data.turnot !== 'festivo' && turno.data.turnot != 'libre'){
            // totaldietas += turno.data.dieta
            // totalcenas += turno.data.cena
            festivonotrabajado += 1
            diastrabajados = diastrabajados - 1
        }
        if(turno.data.turnot === 'reten' && turno.data.turnot !== 'festivo no' && turno.data.turnot !== 'festivo' && turno.data.turnot != 'libre'){
            suma = turno.data.totalhorasturno.h + turno.data.totalhorasturno.m
            sumanocomputables = turno.data.totalhorasnocomputables.h + turno.data.totalhorasnocomputables.m
            sumanocturnas = turno.data.totalhorasnocturnas.h + turno.data.totalhorasnocturnas.m
            horastotales += suma
            horastotalesnocomputables += sumanocomputables
            horastotalesnocturnas += sumanocturnas
        }
            
    })
    let horasextra = horastotales - horasdiastrabajados  * 60 
    if(horasextra < 0){
        horasextra = 0
    }
    let cantidadmonedahorasextra = parseFloat(horasextra * preciohoraextra).toFixed(2)
    if(horasextra < 0){
        horasextra = 0
    }
    let cantidadmonedadieta = parseFloat(totaldietas * preciodieta).toFixed(2)
    let cantidadmonedacena = parseFloat(totalcenas * preciocena).toFixed(2)
    let cantidadmonedanocturnidad = parseFloat(horastotalesnocturnas * precionocturnidad).toFixed(2)
    

    let cantidadmonedafestivo = parseFloat(festivo * preciofestivo).toFixed(2)
    let cantidadmonedafestivonotrabajado = parseFloat(festivonotrabajado * preciofestivonotrabajado).toFixed(2)
    let cantidadmonedalibre = parseFloat(libre * preciolibre).toFixed(2)

    let horasextramostrar = calcularHorasMostrar(horasextra)
    let horastotalesmostrar = calcularHorasMostrar(horastotales)
    let horasnocomputablesmostrar = calcularHorasMostrar(horastotalesnocomputables)
    let horasnocturnasmostrar = calcularHorasMostrar(horastotalesnocturnas)
    
    return {
        diastrabajados,
        totaldietas,
        totalcenas,
        cantidadmonedahorasextra,
        cantidadmonedadieta,
        cantidadmonedacena,
        cantidadmonedanocturnidad,
        cantidadmonedafestivo,
        cantidadmonedafestivonotrabajado,
        cantidadmonedalibre,
        horasextramostrar,
        horastotalesmostrar,
        horasnocomputablesmostrar,
        horasnocturnasmostrar,
        festivo,
        festivonotrabajado,
        libre
    }


}


export {calculoTotal, calcularHoras}