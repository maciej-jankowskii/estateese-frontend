import { Navigate } from "react-router-dom";
import AuthService from "../../service/AuthService";

const PrivateRoute = ({ element }) => {
	return AuthService.isAuthenticated() ? element : <Navigate to="/" />;
};

export default PrivateRoute;
