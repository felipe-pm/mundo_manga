import React, { createContext, useState, useEffect } from "react";

export const perfilContext = createContext();

export default function PerfilProvider({ children }) {
  const [usuarios, setUsuarios] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/v1/user/usuario/:id_usuario");
        if (!response.ok) throw new Error("NO SE PUEDE DESPLEGAR LA INFORMACIÓN");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  return (
    <perfilContext.Provider value={{ usuarios, setUsuarios, error, setError }}>
      {children}
    </perfilContext.Provider>
  );
}





















// import { createContext, useState,useEffect} from "react"

// export const perfilContext = createContext()

// export default function perfilProvider({ children }) {
//     const [usuarios, setUsuarios] = useState(null);
//     const [error, setError] = useState()
  

//     const getData = async () => {
//         try {
//             const response = await fetch("/usuarios.json")
//             if (!response.ok) throw "NO SE PUEDE DESPLEGAR LA INFORMACIÓN"
//             const data = await response.json()
//             setUsuarios(data)
            
//         } catch (error) {
//             setError(error)
//         }
//     }
    


//     useEffect(() => {                    //llamada a fx getData() para renderizar 1 vez el sitio
//         getData();
//     }, [])

//     return (
//         <perfilContext.Provider value={{usuarios,setUsuarios,error, setError }}>
//             {children}
//         </perfilContext.Provider>
//     )
// }

