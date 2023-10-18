import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/vender.css";

const Vender = () => {

    const navigate = useNavigate();
    const url = "https://backend-mundomanga.onrender.com";
    const { usuario, isLoggedIn } = useContext(AuthContext);
  
    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        imagen: "",
        editorial: "",
        usuario_id: isLoggedIn ? usuario.usuario_id : null,
    });
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
  
    const handleSell = async (e) => {
        e.preventDefault();
        const endpoint = "/vender";
        const { titulo, descripcion, precio, imagen, editorial, usuario_id } = formData;

        console.log("usuario_id: ", formData.usuario_id);

        try {
          if (!titulo || !descripcion || !precio || !imagen || !editorial) {
            toast.error("Todos los campos son obligatorios");
            return;
          }
          const response  = await axios.post(url + endpoint, formData);
          toast.success("Producto publicado con éxito 😀", { autoClose: 2000 });
        } catch (error) {
          console.log(error);
        }
    };

  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <form>
        <h1>Publica tu Manga</h1>
        <hr />
        <div className="form-group mt-1 ">
          <label>Titulo:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Titulo"
            onChange={handleInputChange}
            required
            className="form-control"
            minLength="3"
            maxLength="50"
          />
        </div>

        <div className="form-group mt-1 ">
          <label>Editorial:</label>
          <select
            name="editorial"
            id="editorial"
            onChange={handleInputChange}
            required
            className="form-control"
          >
            <option value="" defaultChecked hidden>
              Editorial
            </option>
            <option value="norma">Norma</option>
            <option value="ivreaes">Ivrea España</option>
            <option value="planeta">Planeta Comic</option>
            <option value="milky">Milky Way</option>
            <option value="mascotas">Panini</option>
            <option value="ivreaar">Ivrea Argentina</option>
            <option value="deagostini">Planeta DeAgostini</option>
          </select>
        </div>

        <div className="form-group mt-1 ">
            <label>Descripción:</label>
            <textarea 
                name="descripcion"
                id="descripcion"
                onChange={handleInputChange}
                required
                placeholder="Descripción"
                className="form-control"
            />
        </div>

        <div className="form-group mt-1 ">
          <label>Precio:</label>
          <input
            type="text"
            id="precio"
            name="precio"
            placeholder="Precio"
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group mt-1 ">
          <label>Imagen:</label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            placeholder="URL imagen"
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>

        <button onClick={handleSell} type="submit" className="btn-vender">Publicar Manga</button>

      </form>
    </div>
  );
};

export default Vender;