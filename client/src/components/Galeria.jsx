import { useContext } from "react";
import "../assets/css/galeria.css";
import { UserContext } from "../context/UserContext";
import Heart from "./Heart";

export default function Galeria() {
  const { photos, setPhotos } = useContext(UserContext);

  function handleClick(id) {
    const index = photos.findIndex((ele) => ele.id === id);
    photos[index].favorito = !photos[index].favorito;
    setPhotos([...photos]);
  }

  return (
    <div className="galeria">
      {photos.map((item) => (
        <article
          onClick={() => handleClick(item.id)}
          className="position"
          id={item.id}
          key={item.id}
          style={{ backgroundImage: `url(${item.img})` }}
        >
          <img src={item.img} alt={item.name} />
          <Heart className="absolute" filled={item.favorito} />
        </article>
      ))}
    </div>
  );
}
