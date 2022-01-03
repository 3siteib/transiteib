import React from 'react'

const DatosInteres = () => {
    return (
        <div>
            <div className="row mt-5">
                <h2>Datos de Interes</h2>
                <p>
                    Para que el programa funcione correctamente debe de indicar en el campo de <strong>TURNO</strong> la siguiente información
                </p>
                <ul className='listado-informacion'>
                    <li>LIBRE TRABAJADO - <strong>libre</strong></li>
                    <li>RETEN - <strong>reten</strong></li>
                    <li>FESTIVO NO TRABAJADO - <strong>libre no</strong></li>
                    <li>FESTIVO TRABAJADO - <strong>festivo</strong></li>
                </ul>
                <hr />
                <a href="https://drive.google.com/file/d/194x86Ll2u0i-LNFqje1OxO8c93eM0g8t/view?usp=sharing"> <i className=" icono-documentos bi bi-file-pdf"></i> Información de Interes</a>
                <a href="https://drive.google.com/file/d/141zXdIAJp8r2nvhFpvLFRDsTaEACBNIU/view?usp=sharing"> <i className=" icono-documentos bi bi-file-pdf"></i>Antiguedad horas nocturnas</a>
                <a href="https://drive.google.com/file/d/1lGokT8ub2Ps5gcmrCZuFaSJgGYlr42yv/view?usp=sharing"> <i className=" icono-documentos bi bi-file-pdf"></i>Información sobre tacografo</a>

            </div>
        </div>
    )
}

export default DatosInteres
