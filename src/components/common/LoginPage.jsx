import { useState } from "react";
import "../../style/CommonStyle.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navi = useNavigate();

	const handleSubmitLogin = async (e) => {
		e.preventDefault();

		try {
			const userData = await AuthService.login(email, password);
			console.log(userData);
			if (userData.accessToken) {
				localStorage.setItem("accessToken", userData.accessToken);
				navi("/home");
			} else {
				setError(userData.errorMessage);
				setTimeout(() => {
					setError("");
				}, 5000);
			}
		} catch (error) {
			setError("Invalid e-mail or password");
		}
	};

	return (
		<div className="container">
			<div className="boxes">
				<div className="first-box">
					<div className="main-info">
						<h1>Welcome to EstateEase!</h1>
					</div>
				</div>
				<div className="second-box">
					<div className="form-box">
						<h2>Login</h2>
						{error && <p className="error-msg">{error}</p>}
						<form onSubmit={handleSubmitLogin}>
							<div className="input-box">
								<label>E-mail:</label>
								<input
									type="email"
									placeholder="Your e-mail address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="input-box">
								<label>Password:</label>
								<input
									type="password"
									placeholder="Enter password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button type="submit" className="login-btn">
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
