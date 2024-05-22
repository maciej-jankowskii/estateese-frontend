import { useState } from "react";
import "../../style/PostStyle.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";
import { showNotification } from "../alerts/Notification";

function RegisterPage() {
	/*
		REACT HOOKS 
	*/

	const [userData, setUserData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const navi = useNavigate();

	/*
		FORM EVENT HANDLING METHODS 
	*/

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const handleSubmitRegister = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("accessToken");
			await AuthService.register(userData, token);

			setUserData({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
			});
			showNotification("Employee register successfully", "success");
			setErrors({});

			navi("/home");
		} catch (error) {
			if (error instanceof Object) {
				setErrors(error);
			} else if (error) {
				showNotification("Email is taken", "error");
			} else {
				console.log(error);
			}
		}
	};

	/*
		JSX CODE 
	*/

	return (
		<div className="main-content">
			<div className="main-content-post">
				<h2>Register new employee</h2>
				{errors.general && <p className="error-msg">{errors.general}</p>}
				<form onSubmit={handleSubmitRegister} className="post-form">
					<div className="input-box-post">
						<label htmlFor="">Name:</label>
						<input
							type="text"
							name="firstName"
							value={userData.firstName}
							onChange={handleInputChange}
						/>
					</div>
					{errors.firstName && <p className="error-msg">{errors.firstName}</p>}
					<div className="input-box-post">
						<label htmlFor="">Surname:</label>
						<input
							type="text"
							name="lastName"
							value={userData.lastName}
							onChange={handleInputChange}
						/>
					</div>
					{errors.lastName && <p className="error-msg">{errors.lastName}</p>}
					<div className="input-box-post">
						<label htmlFor="">E-mail:</label>
						<input
							type="email"
							name="email"
							value={userData.email}
							onChange={handleInputChange}
						/>
					</div>
					{errors.email && <p className="error-msg">{errors.email}</p>}
					<div className="input-box-post">
						<label htmlFor="">Password:</label>
						<input
							type="password"
							name="password"
							value={userData.password}
							onChange={handleInputChange}
						/>
					</div>
					{errors.password && <p className="error-msg">{errors.password}</p>}
					<button type="submit" className="my-btn">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

export default RegisterPage;
