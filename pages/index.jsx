
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'

export default function Home() {
  const route = useRouter()
  const goToAcceder = () => {
    route.push('acceder')
  }
  const goToContacto = () => {
    route.push('contacto')
  }
  return (
    <div>
     
    <div className="container">
      <div className="row mt-4">
        <div className="col-12">
          <h1 className='text-center'>BIENVENIDOS A <span>3SITEIB TRANSPORTES</span></h1>
        </div>
        <div className="row mt-5">
          <div className="col-4">
            <div className="tarjeta relieve">
            <Image src="/imagenes/info-image.jpg" height={200} width={400} className="card-img-top p-2" alt="..."/>
              <div className="card-body">
                <h2 className='card-title'>Información general</h2>
                <p className='card-text'>Aqui podras encontrar toda la información general relacionada con nuestro sindicato</p>
                <p>Actas, Laudo y demas información necesaria para estar al dia en todos los aspectos.</p>
                <p className='alert alert-danger'>RECUERDA</p>
                <p>Toda la información contenida en 3siteib es confidencial rogamos a todos nuestros asociados no 
                compartirla con terceros.</p>
                <button className="btn btn-primary">Información</button>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="tarjeta relieve">
            <Image src="/imagenes/acceso.jpg" height={200} width={400} className="card-img-top p-2" alt="..."/>
              <div className="card-body">
                <h2 className='card-title'>Acceso con tu usuario</h2>
                <p className='card-text'>Entra con tu <strong>usuario</strong> y <strong>contraseña</strong> y accede a nuestro panel de control</p>
                <p>Desde nuestro panel podras gestionar tus turnos y calcular tus horas.</p>
                <button onClick={goToAcceder} className='btn btn-primary'>Acceder</button>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="tarjeta relieve">
            <Image src="/imagenes/contacto2.jpg" height={200} width={400} className="card-img-top p-2 " alt="..."/>
              <div className="card-body">
                <h2 className='card-title'>Contacto</h2>
                <p className='card-text'>Si tienes cualquier duda por favor no dudes en ponerte en contacto con nosotros</p>
                <p>Aqui encontraras diferentes formas de ponerte en contacto con 3SITEIB.</p>
                <p>Nuestro horaria de contacto es de: <strong className='badge bg-success'>Lunes a Viernes</strong> de <strong className='badge bg-danger'>11:00 am a 20:00 pm</strong></p>
                <p>Si desdeas enviarnos un correo o cualquier sugerencia pulsa sobre contactar o ponte en contacto con nocotros en el
                  correo <strong>3siteib@gmail.com</strong>
                </p>
                <a className='btn btn-primary' href="mailto:3siteib@gmail.com">Contactar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     
    </div>
  )
}
