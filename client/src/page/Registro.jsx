import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../assets/css/registro.css'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegistroForm() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({});

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setUsuario({ ...usuario, ...field });
  };

const validarCamposLlenos = ()=>{
  const camposRequeridos = [
    "nombre",
      "apellido",
      "direccion",
      "email",
      "password",
  ];
  return camposRequeridos.every((campo)=> usuario[campo]?.trim() !== ""); 
};

  const registrarUsuario = async () => {

    if (!(validarCamposLlenos)) {
      toast.error("Todos los campos son obligatorios", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      return;
    }

      const urlServer = "https://backend-mundomanga.onrender.com";
      const endpoint = "/usuarios";
      try {
        // const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
        // const endpoint = "/register"

        // const urlServer = "http://localhost:3001/api/v1/user";
        //const endpoint = "/register"

        await axios.post(urlServer + endpoint, usuario)
        toast.success("Usuario registrado con éxito 😀", { autoClose: 2000 });
       

      navigate("/login");
    } catch (error) {
        if(usuario.email == usuario.email){

        toast.error("Algo salió mal...", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
        console.log(error);
    }
      }
    };

  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <form>
      <h1>Registro nuevo usuario</h1>
      <hr />
      <div className="form-group mt-1 ">
        <label>Nombre</label>
        <input
          value={usuario.nombre}
          onChange={handleSetUsuario}
          type="text"
          name="nombre"
          className="form-control"
          placeholder="Nombre"
          minLength="3"
          maxLength="50"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Apellido</label>
        <input
          value={usuario.apellido}
          onChange={handleSetUsuario}
          type="text"
          name="apellido"
          className="form-control"
          placeholder="Apellido"
          minLength="3"
          maxLength="50"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Dirección</label>
        <input
          value={usuario.direccion}
          onChange={handleSetUsuario}
          type="text"
          name="direccion"
          className="form-control"
          placeholder="Dirección"
          minLength="3"
          maxLength="50"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Correo electrónico </label>
        <input
          value={usuario.email}
          onChange={handleSetUsuario}
          type="email"
          name="email"
          className="form-control"
          placeholder="Ingrese Correo"
          minLength="3"
          maxLength="50"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Password</label>
        <input
          value={usuario.password}
          onChange={handleSetUsuario}
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          minLength="3"
          maxLength="100"
        />
        <h5 className="fs-6 fw-lighter">(Deben ser mínimo 6 digitos)</h5>
      </div>
      </form>

      <button onClick={registrarUsuario} className="btn-registro">
        Registrarme
      </button>
    </div>
  );
}
