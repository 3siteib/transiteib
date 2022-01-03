// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,getDocs, collection, addDoc, query, where, doc, updateDoc, setDoc, deleteDoc, getDoc} from 'firebase/firestore'

const firebaseConfig = {
  // apiKey: process.env.apiKey,
  // authDomain: process.env.authDomain,
  // projectId: process.env.projectId,
  // storageBucket: process.env.storageBucket,
  // messagingSenderId: process.env.messagingSenderId,
  // appId: process.env.appId,
  // measurementId: process.env.measurementId
  apiKey: "AIzaSyBnVNXhBNYB8j7aVfmSMejo9-B4RjRKyM8",
  authDomain: "siteib-9cb83.firebaseapp.com",
  projectId: "siteib-9cb83",
  storageBucket: "siteib-9cb83.appspot.com",
  messagingSenderId: "136980953194",
  appId: "1:136980953194:web:5ad07757e66025dbb63213",
  measurementId: "G-78F60W2RZC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const db = getFirestore()
console.log(process.env.measurementId)

const logIn = async(email, pass) => {
  try{
    const sing = await signInWithEmailAndPassword(auth, email, pass)
    return sing.user
  }catch(e){
    return e.code
  }
}
const comprobarUSuario = (r, state) => {
  auth.onAuthStateChanged(user => {
    if(!user){
      r.push('/acceder')
    }else{
      state({
        id:user.uid,
        email:user.email
      })
    }
  })
}
const comprobarAdmin = (state) => {
  auth.onAuthStateChanged(user=>{
    if(user){
      state(user)
    }
  })
}
const comprobrarConfiguracion = async(id, docid, update, ant) => {
  try{
    const refer = collection(db, 'configuraciones')
    const p =  query(refer, where('id', '==', id))
    const data = await getDocs(p)
    data.forEach(i => {
      const user = i.data()
      docid(i.id)
      update(true)
      ant(user.antiguedad)
    })
  }catch(e){
    console.log({e})
  }
}
const ingresarConfiguracion = async(datos) => {
  try{
    await addDoc(collection(db, 'configuraciones'),datos)
  }catch(e){
    console.log(e)
  }
}
const actualizarConfiguracion = async (id, datos) => {
  try{
    const refer = doc(db, 'configuraciones', id )
    await updateDoc(refer, datos)
  }catch(e){
    console.log(e)
  }
}
const addTurno = async(turno)=> {
  try{
    await addDoc(collection(db, 'turnos'), turno)
  }catch(e){
    console.log(e)
  }
}
const consultarTurnos = async(id,desde, hasta, turnos) => {
  try{
    const filtroFechas = []
    const refer = collection(db, 'turnos')
    const p = query(refer, where('id', '==', id))
    const data = await getDocs(p)
    const {docs} = await data
    
    docs.map(i=>{
      let user = {id:i.id, data:i.data()}
      if(user.data.dia >= desde && user.data.dia <= hasta){
        filtroFechas.push(user)
      }
    })
    turnos(filtroFechas)
  }catch(e){
    console.log(e)
  }
}
const borrarTurno = async(id) => {
  await deleteDoc(doc(db, 'turnos', id))
}
const getAntiguedad = async (id,t) => {
  
 try{
  const refer = collection(db, 'configuraciones')
  const p =  query(refer, where('id', '==', id))
    const data = await getDocs(p)
    data.forEach(i => {
      const user = i.data()
      t(user.antiguedad)
    })
 }catch(e){
   console.log(e)
 }
//  callback(antiguedad)
}
const addUsuario = async(email, pass) => {
  try{
    await createUserWithEmailAndPassword(auth, email, pass)
  }catch(e){
    console.log(e)
  }
}



export {
   logIn, 
   comprobarUSuario,
   ingresarConfiguracion,
    comprobrarConfiguracion,
    actualizarConfiguracion,
    addTurno,
    consultarTurnos,
    borrarTurno,
    getAntiguedad,
    addUsuario,
    comprobarAdmin
  }