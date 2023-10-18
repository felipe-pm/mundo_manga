import { toast } from "react-toastify"
import { useOperationsContext } from "../context/OperationsContext"

export default function ButtonAdd({idPlato}) {

    const { AddPlatos } = useOperationsContext()

    return (
        <button className="btn btn-danger" onClick={() => {
            AddPlatos(idPlato)
            toast.success("Agregaste el producto al carro")
        }}>Añadir 🛒</button>
    )
}