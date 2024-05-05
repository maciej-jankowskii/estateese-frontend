import { Link } from "react-router-dom";
import AuthService from "../service/AuthService"
import "../style/Navbar.css"
import { useState } from "react";

function Navbar() {
    const [showSubMenu, setShowSubMenu] = useState(false);
    

    const handleLogout = () =>{
        AuthService.logout();
    }

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };
    
  return (
    <nav className="navigation">
            <ul className="nav-items">
                <p><Link className="nav-item-logo" to='/home'>EstateEse</Link></p>
                <li className="nav-item dropdown" onMouseEnter={toggleSubMenu} onMouseLeave={toggleSubMenu}>
                    Property
                    {showSubMenu && (
                        <ul className="sub-menu">
                            <li><Link to="/apartments">Apartments</Link></li>
                            <li><Link to="/commercial">Commercial</Link></li>
                            <li><Link to="/houses">Houses</Link></li>
                            <li><Link to="/lands">Lands</Link></li>
                        </ul>
                    )}
                </li>
                <li className="nav-item"><Link to='/clients'>Clients</Link></li>
                <li className="nav-item"><Link to='/offers'>Offers</Link></li>
                <li className="nav-item">Credit</li>
                <li className="nav-item"><Link className="nav-item-logout" to='/' onClick={handleLogout}>Logout</Link></li>
                <li><Link className="nav-item-logout" to="/register">Add employee</Link></li>
            </ul>
        </nav>
  )
}

export default Navbar