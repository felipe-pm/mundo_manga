import "../assets/css/galeria.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ButtonAdd from "../components/ButtonAdd"; 


export default function Galeria() {
  const { favorito, setFavorito } = useContext(UserContext);
  const navigate = useNavigate();
  function handleClick(id) {
    const index = favorito.findIndex((ele) => ele.id === id);
    favorito[index].favorito = !favorito[index].favorito;
    setFavorito([...favorito]);
  }

  const favoriteMenu = favorito.filter((item) => item.favorito);

  return (
    <div className=" container">
      <h1 className="text-center"> Agrega tus Platos favoritos aquí 🍔🍰🧁</h1>
      <div className="galeria">
      {favoriteMenu.map((item) => (
        <div className="row-cols-1 row-cols-md-1" key={item.id}>
          <div className="col">
            <div className="card h-100">
              <img src={item.img} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <ul className="card-text">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <hr />
              <div className="card-footer">
                <h5 className="text-muted">$ {item.price}</h5>
                <h5 className="text-muted">👨🏼‍💼 {item.cantidad}</h5>
                <div className="buttonMenuFavorito">
                  <button
                      className="btn btn-warning btnVerMas"
                      onClick={() => {
                        navigate(`/DetalleMenu/${item.id}`);
                      }}
                    >
                      Ver más 👀
                    </button>
                  
                  <ButtonAdd idPlato={item.id} />
                  <button
                    className="btn btn-success"
                    onClick={() => handleClick(item.id)}
                  >
                    {item.favorito ? "Quitar de favoritos ❤️" : "Agregar a favoritos 🤍"}
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

