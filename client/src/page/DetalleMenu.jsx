import { useNavigate, useParams } from "react-router-dom"
import { useOperationsContext } from "../context/OperationsContext"
import { useUserContext } from "../context/UserContext"


import ButtonAdd from "../components/ButtonAdd"


export default function PlatoDetail() {

    const { id } = useParams()
    const { platos } = useUserContext()
    const { FormatCoin } = useOperationsContext()
    const navigate = useNavigate()

 
    return (
        <main className="container mt-5 p-5">
            {platos.filter(item => item.id === id)    
                .map((item) => (
                    <div className="card mb-3 mt-5" key={item.id}>
                        <div className="row g-0">
                            <div className="col-md-4 ">
                                <img src={item.img} className="img-fluid rounded-start h-100" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="fs-1">{item.name.charAt(0).toUpperCase() +         
                                        item.name.slice(1).toLowerCase()}</h5>
                                    <p className="card-text">{item.desc}</p>
                                    <p className="card-text">
                                        <b> Detalle de figura:</b>
                                    </p>
                                    <ul className="list-unstyled ps-4">
                                        {item.ingredients.map((item) => (
                                            <li key={Math.random()}>👀 {item}</li>
                                        ))}
                                    </ul>
                                    <h3>Precio: {FormatCoin(item.price)}</h3>
                                    <div className="d-flex justify-content-end gap-3">
                                        <ButtonAdd idPlato={item.id} />
                                        <button className="btn btn-success" onClick={() =>
                                            navigate("/menu")
                                        }>Volver 🏠</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </main>
    )
}