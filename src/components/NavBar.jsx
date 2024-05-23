import { Link } from "react-router-dom"
import '../scss/NavBar.css'


function NavBar() {
    return (
        <div >
            <header className="navBar">
                <ul>
                    <li><Link to="/"> Inicio</Link></li>
                    <li><Link to="/login"> Login </Link></li>
                    <li><Link to="/profile"> Perfil de  usuario</Link></li>
                </ul>
            </header>
        </div>
    )
}

export default NavBar