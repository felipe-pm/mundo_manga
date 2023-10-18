import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import '../assets/css/login.css'

export default function RegistroForm() {
  const { setUsuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [usuario, setUsuarioLocal] = useState({
    email: "", 
    password: "",
  });

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setUsuarioLocal({ ...usuario, ...field });
  };

  const iniciarSesion = async () => {
    // const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
    // const endpoint = "/login";

    const urlServer = "http://localhost:3000";
    const endpoint = "/login";

    const { email, password } = usuario;
    try {
      if (!email || !password) 
      return alert("correo y password obligatorias");
      
      setLoading(true);

      const { data: token } = await axios.post(urlServer + endpoint, usuario);
      toast.success("Usuario identificado con éxito 😀", { autoClose: 3000 });
      localStorage.setItem("token",token); // Guardar el token en el localStorage
      setUsuario();
      setLoading(false);
      navigate("/perfil");
    } catch ({ response: { data: message } }) {
      alert( "Correo o Password incorrecto 🙁, intente nuevamente  ");
      console.log(message);
    }
  };


  return (
    
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className="form-group mt-1">
        <label>Correo Electrónico</label>
        <input
          value={usuario.email}
          onChange={handleSetUsuario}
          type="email"
          name="email"
          className="form-control"
          placeholder="Ingresa tu correo"
        />
      </div>
      <div className="form-group mt-1">
        <label>Contraseña</label>
        <input
          value={usuario.password}
          onChange={handleSetUsuario}
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <button onClick={iniciarSesion} className="btn-iniciar">
        {loading ? "Cargando..." : "Iniciar Sesión"}
      </button>
    </div>
    
  );
}


