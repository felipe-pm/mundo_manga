import './App.css'

import {  Route, Routes } from 'react-router-dom'
import { useLocalStorage } from 'react-use';

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './page/Home';
import DetalleMenu from './page/DetalleMenu';
import Registro from './page/Registro';
import Login from './page/Login';


//rutas protegidas//
import Perfil from './view/Perfil';
import Vender from './view/Vender';

import Car from './page/Car';
import Logout from './view/Logout';
import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Context from './context/Context';
import { useState } from "react"
import Productos from './page/Productos';
import DetalleProducto from './view/DetalleProducto';

function App() {
  const [user, setUser] = useLocalStorage('user');
  const [usuario, setUsuario] = useState(null)
  
  return (
    <>
    <Context.Provider value={{ usuario, setUsuario }} >  
    
      <Navbar />
      <main>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:producto_id" element={<DetalleProducto />} />
          <Route path="/detalleMenu/:id" element={<DetalleMenu />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute canActivate={setUser}/>}>
          
            <Route path="/car" element={<Car/>} />
            <Route path="/perfil" element={<Perfil/>} />
            <Route path="/vender" element={<Vender/>} />
            <Route path="/logout" element={<Logout/>} />
          
          </Route>

        </Routes>
      </main>
      <Footer />
      <ToastContainer/>
      </Context.Provider>
    </>
  );
}




export default App;
