import { Link } from "react-router-dom"
import '../scss/NavBar.css'


function NavBar() {
    return (
        <div >
            <header className="navBar">
                <ul>
                    <li><Link to="/profile"> Inicio</Link></li>
                    <li><Link to="/menu"> Plan Semanal </Link></li>
                    <li><Link to="/food"> Mis comidas</Link></li>
                </ul>
            </header>
        </div>
    )
}

export default NavBar