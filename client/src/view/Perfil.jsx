import "../assets/css/perfil.css";
import { useContext, useState, useEffect } from "react";
import Context from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function Perfil() {

  const navigate = useNavigate()
  const { setUsuario: setUsuarioGlobal } = useContext(Context);
  const [usuarioLocal, setUsuarioLocal] = useState({});
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    direccion: '',
    email: '',
    password: '',
  });
  const url = "https://backend-mundomanga.onrender.com";

  const getUsuarioData = async () => {
    const endpoint = "/usuarios";
    const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(url + endpoint, {
          headers: { Authorization: "Bearer " + token },
        });
        setFormData({
          ...formData,
          id: data.usuario_id,
          nombre: data.nombre,
          apellido: data.apellido,
          direccion: data.direccion,
          email: data.email,
          password: data.password,
        });
        const result = { data };
        setUsuarioLocal(result);
        setUsuarioGlobal(result);
      } catch (error) {
          console.log(error);
        } finally {
          setLoading(true);
        }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleUpdateData = async (e) => {
    e.preventDefault();
    const endpoint = `/update/${formData.id}`;
    const { nombre, apellido, direccion, email, password } = formData;
    try {
      if (!nombre || !apellido || !direccion || !email || !password) {
        toast.error("Por favor, complete todos los datos");
      }
      await axios.patch(url + endpoint, formData);
      toast.success("Datos actualizados con exito");
      /*setFormData({
        id: '',
        nombre: '',
        apellido: '',
        direccion: '',
        email: '',
        password: '',
      }); */
      getUsuarioData();
      navigate("/perfil");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsuarioData();
  }, []);

  

  return (
    <>
      <div className="container">

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="col-8">
                <span className="fs-4">Hola: </span>
                <h1 className="fs-4">{formData.nombre} {formData.apellido}</h1>
              </div>
              <div className="">


              </div>

            </div>
          </div>


          <div className="col-6">
            <div className="card h-100">
              <div class="list-group">

                <button type="button" className="list-group-item list-group-item-action">Datos Personales</button>
                <button type="button" className="list-group-item list-group-item-action">Seguridad Cuenta</button>
                <button type="button" className="list-group-item list-group-item-action">Mis Direcciones</button>
                
              </div>

            </div>
          </div>
          <div className="col-6">
            <div className="card h-100">
              <div className=" text-center">
                <div className="row">
                  <div className="perfil">
                    <div className="row-cols-1 row-cols-md-1 ">
                      <div className="card h-100">
                        <div className="card-body">
                          <h2>Datos Personales</h2>
                          {editMode ? (
                            <>
                              <form>
                                <div className="mb-1">
                                  <label
                                    htmlFor="nombre"
                                    className="form-label text-muted m-1">Nombre:</label>
                                  <input
                                    type="text"
                                    className="form-control text-center"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Nuevo nombre"
                                    maxLength="50"
                                  />

                                </div>
                                <div className="mb-1">
                                  <label
                                    htmlFor="apellido"
                                    className="form-label text-muted m-1">Apellido:</label>
                                  <input
                                    type="text"
                                    className="form-control text-center"
                                    id="apellido"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    placeholder="Nuevo apellido"
                                    maxLength="50"
                                  />
                                </div>
                                
                                

                                <div className="mb-3">
                                  <label htmlFor="claveEditada" className="form-label text-muted m-1">Contraseña:</label>
                                  <input
                                    type="password"
                                    id="passwordEditado"
                                    className="form-control text-center"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Nueva contraseña"
                                    aria-describedby="passwordlHelp"
                                    maxLength="50"
                                  />
                                  <div id="passworMessenger" className="form-text ">(Deben ser más de 6 digitos)</div>
                                </div>

                                <hr />
                                <div className="mb-1 card-footer-perfil">
                                  <h2>Dirección de entrega</h2>
                                  <label htmlFor="telefonoEditado" className="form-label text-muted m-1">Direccion:</label>
                                  <input
                                    type="text"
                                    id="DireccionEditado"
                                    className="form-control text-center"
                                    name="direccion"
                                    //value={formData.direccion}
                                    onChange={handleChange}
                                    placeholder="Nueva direccion"
                                    maxLength="100"
                                  />
                                  
                                </div>
                              </form>
                            </>
                          ) : (
                            <>
                              <h4 className="text-muted">Nombre: <span><h5>{formData.nombre}</h5></span> </h4>

                              <h4 className="text-muted">Apellido: <span><h5>{formData.apellido}</h5></span> </h4>

                              <h4 className="text-muted">Correo: <span><h6>{formData.email}</h6></span> </h4>

                              <hr />
                              <div className="card-footer">
                                <h2>Dirección de entrega</h2>
                                <h5 className="text-muted">Dirección: {formData.direccion}</h5>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="d-flex justify-content-center gap-3 card-footer">
                          {editMode ? (
                            <>
                              <button className="btn-guardar" onClick={handleUpdateData}>
                                Guardar
                              </button>
                              <Link to="/productos" className="btn-volver">Volver</Link>
                            </>
                          ) : (
                            <button
                              className="btn-editar" boton-perfil
                              onClick={() => setEditMode(true)}
                            >
                              Editar Usuario
                            </button>

                          )}
                          <button
                            className="btn-eliminar"
                            onClick={() => {
                              // Agrega la lógica para la acción de "Eliminar usuario"
                              console.log("Eliminar usuario");
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>



      </div>
    </>
  )
}