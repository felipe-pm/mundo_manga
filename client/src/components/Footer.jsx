import { Link } from "react-router-dom";
import "../assets/css/navbarFooter.css";

const Footer = () => {

    return (
        <footer className=" text-center text-light p-2 footer">
            <div className="d-flex">
                <p className="p-2 flex-grow-1 fs-4">© 2023. Todos los derechos reservados.</p>
                <Link className="p-2 text-decoration-none text-light fs-1" to={"https://www.facebook.com/"} target="_blank" > 
                    <i className="fa-brands fa-facebook-f"></i></Link>
                <Link className="p-2 text-decoration-none text-light fs-1" to={"https://www.linkedin.com/"} target="_blank" >
                    <i className="fa-brands fa-linkedin"></i></Link>
                <Link className="p-2 text-decoration-none text-light fs-1" to={"https://www.instagram.com/"} target="_blank" >
                    <i className="fa-brands fa-instagram"></i></Link>
            </div>
        </footer>
    );
}

export default Footer;
