import "../assets/css/menu.css";
import React ,{ useContext } from "react";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../components/ButtonAdd";
import { useUserContext } from "../context/UserContext";
import Context from "../context/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Menu() {
  const { platos, favorito, setFavorito } = useUserContext();
  const { usuario} = useContext(Context);
  const navigate = useNavigate();
  

  const handleToggleFavorite = (id) => {
    if (!usuario) {
      toast.error("Debes iniciar sesión para agregar a favoritos.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const index = favorito.findIndex((ele) => ele.id === id);
    favorito[index].favorito = !favorito[index].favorito;
    setFavorito([...favorito]);
  };


  

  return (
    <div className="container">
      <div className="menu">
        {platos.map((item) => (
          <div className="row-cols-1 row-cols-md-1 " key={item.id}>
            <div className="col">
              <div className="card h-100 cartas">
                <img src={item.img} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <ul className="card-text">
                    <li>{item.ingredients[0]}</li>
                    <li>{item.ingredients[1]}</li>
                    <li>{item.ingredients[2]}</li>
                    <li>{item.ingredients[3]}</li>
                  </ul>
                </div>
                <hr />
                <div className="card-footer">
                  <h5 className="text-muted">$ {item.price}</h5>
                  <h5 className="text-muted">👨🏼‍💼 {item.cantidad}</h5>

                  <div className="buttonMenu">
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        navigate(`/DetalleMenu/${item.id}`);
                      }}
                    >
                      Ver más 👀
                    </button>
                    <ButtonAdd
                      idPlato={item.id}
                    />
                    <button
                      className="btn btn-success "
                      onClick={() => handleToggleFavorite(item.id)}
                    >
                      {favorito.find((photo) => photo.id === item.id)?.favorito
                        ? "Quitar de favorito ❤️"
                        : "Agregar a favoritos 🤍"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

