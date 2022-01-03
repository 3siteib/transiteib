import '../styles/globals.css'
import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Script from 'next/script'
import {useRouter} from 'next/router'
import {comprobarAdmin} from '../src/FirebaseConfig/Firebaseconfig'


function MyApp({ Component, pageProps }) {
  
  const route = useRouter()
  const [admin, setAdmin] = useState('')
  const goInicio = () =>{
    route.push('/')
  }
  const goAdmin= () => {
    route.push('/administracion')
  }

  useEffect(()=>{
    comprobarAdmin( setAdmin)
  },[])

  return (
    <>
    <div className="container mt-4">
    <Head>
    <title>3SITEIB</title>
      <meta name="description" content="Aplicacion creada por Manuel Muñoz @Codificandolo" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/> 
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"></link> 
      </Head>
      <nav className="no-pdf navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="no-pdf navbar-brand" href="#">3SITEIB</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={goInicio}>INICIO</a>
        </li>
        {
          admin.email === 'josecharijose@gmail.com' ? 
          (
            <li>
              <a className="nav-link" href="#" onClick={goAdmin} >REGISTRO USUARIOS</a>
            </li>
          )
          :('')
        }
        
      </ul>
    </div>
  </div>
</nav>
  <Component {...pageProps} />

  <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossOrigin="anonymous"></Script>
 <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossOrigin="anonymous"></Script>
    </div>
  </>
    
  )
}

export default MyApp
