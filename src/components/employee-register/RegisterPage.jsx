import { useState } from "react";
import "../../style/PostStyle.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";

function RegisterPage() {
	const [userData, setUserData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const navi = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
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
			navi("/home");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="main-content">
			<div className="main-content-post">
				<h2>Register new employee</h2>
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
					<div className="input-box-post">
						<label htmlFor="">Surname:</label>
						<input
							type="text"
							name="lastName"
							value={userData.lastName}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">E-mail:</label>
						<input
							type="email"
							name="email"
							value={userData.email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Password:</label>
						<input
							type="password"
							name="password"
							value={userData.password}
							onChange={handleInputChange}
						/>
					</div>
					<button type="submit" className="my-btn">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

export default RegisterPage;
