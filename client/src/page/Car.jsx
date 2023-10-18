    import "../assets/css/car.css";
    import React, { useContext } from "react";
    import { useUserContext } from "../context/UserContext";
    import { useOperationsContext } from "../context/OperationsContext";
    import Context from "../context/Context";
    import { toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";

    export default function Car() {
    const { platos } = useUserContext();
    const { carro, total, SubtractPlato, AddPlatos, FormatCoin } = useOperationsContext();
    const { usuario } = useContext(Context);

    const handleToggleCar = (id) => {
        if (!usuario) {
        toast.error("Debes iniciar sesión para continuar con el pago.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        } 
        if (carro.length === 0) {
            toast.error("Debes agregar al menos un plato al carrito.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });}
            if(usuario) {
            toast.success(
                `¡Felicidades! Has pagado tus pedidos. Por ser el primero, te sale gratis.`,
                {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }
            );
        }
    };

    return (
        <div className="container mt-5 p-5">
        <div>
            <h1 className="text-center">Carrito 🛒</h1>
            <div className="cart-table">
            <table className="table table-striped-columns mt-5">
                <caption className="title-table">Detalle del carro:</caption>
                <tbody>
                {carro.map((i) => {
                    let plato = platos.find((item) => item.id === i.id);
                    return (
                    <tr key={i.id}>
                        <th scope="row">
                        <img
                            src={plato.img}
                            className="carImg"
                            alt={plato.name}
                        />{" "}
                        {plato.name}
                        </th>
                        <td valign="middle" className="text-end fs-4 align-center">
                        {FormatCoin(Number(i.precio) * Number(i.cantidad))}
                        </td>
                        <td valign="middle">
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => SubtractPlato(i.id)}
                        >
                            -
                        </button>
                        <button className="btn btn-outline">{i.cantidad}</button>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => AddPlatos(i.id)}
                        >
                            +
                        </button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            <h4>Total: {FormatCoin(total)}</h4>
            <div className="d-flex justify-content-center mt-3">
                <button
                className="btn btn-success"
                onClick={handleToggleCar}
                >
                Ir a pagar 💲
                </button>
            </div>
            </div>
        </div>
        </div>
    );
    }

