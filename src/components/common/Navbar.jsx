import { Link } from "react-router-dom";
import AuthService from "../../service/AuthService";
import "../../style/CommonStyle.css";
import { useState } from "react";
import Notification, { showNotification } from "../alerts/Notification";

function Navbar() {
	const [showSubMenu, setShowSubMenu] = useState(false);

	const handleLogout = () => {
		showNotification("Log out successfully", "success");
		AuthService.logout();
	};

	const toggleSubMenu = () => {
		setShowSubMenu(!showSubMenu);
	};

	return (
		<nav className="navigation">
			<ul className="nav-items">
				<p>
					<Link className="nav-item-logo" to="/home">
						EstateEse
					</Link>
				</p>
				<li
					className="nav-item dropdown"
					onMouseEnter={toggleSubMenu}
					onMouseLeave={toggleSubMenu}
				>
					Property
					{showSubMenu && (
						<ul className="sub-menu">
							<li>
								<Link to="/properties">All properties</Link>
							</li>
							<li>
								<Link to="/apartments">Apartments</Link>
							</li>
							<li>
								<Link to="/commercials">Commercial</Link>
							</li>
							<li>
								<Link to="/houses">Houses</Link>
							</li>
							<li>
								<Link to="/lands">Lands</Link>
							</li>
						</ul>
					)}
				</li>
				<li>
					<Link className="nav-item" to="/clients">
						Clients
					</Link>
				</li>
				<li>
					<Link className="nav-item" to="/offers">
						Offers
					</Link>
				</li>

				<li>
					<Link className="nav-item" to={"/credit"}>
						Credit
					</Link>
				</li>
				<li>
					<Link
						className="nav-item nav-item-border"
						to="/"
						onClick={handleLogout}
					>
						Logout
					</Link>
				</li>
				<li>
					<Link className="nav-item nav-item-border" to="/register">
						Add employee
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
