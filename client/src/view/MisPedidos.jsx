import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function MisPedidos() {
  const { setUsuario } = useContext(UserContext);

  useEffect(() => {
    const usuarioLocalStorage = localStorage.getItem("usuario");
    if (usuarioLocalStorage) {
      setUsuario(JSON.parse(usuarioLocalStorage));
    }
  }, []);

  return (
    <div>
      <h1>pagina de mis pedidos se encuenta en mantenimiento</h1>
    </div>
  );
}