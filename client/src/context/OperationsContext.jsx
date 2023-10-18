import { createContext, useContext, useState } from "react"
import { useUserContext } from "./UserContext"

//OPERACIONES

export const OperationsContext = createContext()

export default function OperationsContextProvider({ children }) {

    const { platos } = useUserContext()
    const [carro, setCarro] = useState([])
    

    //FORMATEADOR VALOR A CLP
    const FormatCoin = (number) => 
        ( new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number))
    
    //CALCULO TOTAL
    let total = 0
    carro.map((i) => (
        total += Number(i.precio) * Number(i.cantidad)
    ))
    


    //SUMAR PLATOS
    const AddPlatos = (idPlato) => {
        const platoSeleccionado = platos.find(item => item.id === idPlato)       
        if (carro.find(item => item.id === idPlato)) {                          
            setCarro(carro.                                                       
                map((i) => {
                    if (i.id === idPlato) {                                     
                        return { ...i, cantidad: Number(i.cantidad) + 1 }
                    } else {                                                   
                        return i
                    }
                }))
        } else {                                               
            const objetoCarro = {
                "id": platoSeleccionado.id,
                "cantidad": "1",
                "precio": platoSeleccionado.price,
            }
            setCarro([...carro, objetoCarro])                  
        } 
    }


    //RESTAR PLATO
    const SubtractPlato = (idPlato) => {
        let platoActual = carro.find(item => item.id === idPlato)        
        if (Number(platoActual.cantidad) === 1) {
            setCarro(carro.filter(item => item.id !== idPlato))         
        } else {
            setCarro(carro.
                map((i) => {
                    if (i.id === idPlato) {
                        return { ...i, cantidad: Number(i.cantidad) - 1 }                                         
                    }
                }))
        }
    }

    return (
        <OperationsContext.Provider value={{ carro, setCarro,  FormatCoin, total, AddPlatos, SubtractPlato }}>
            {children}
        </OperationsContext.Provider>
    )
}

export const useOperationsContext = () => useContext(OperationsContext);

