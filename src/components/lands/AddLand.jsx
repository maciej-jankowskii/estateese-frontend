import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TypeOfLand from "../../const/TypeOfLand";
import LandsService from "../../service/LandsService";
import "../../style/PostStyle.css";
import Notification, { showNotification } from "../../alerts/Notification";

function AddLand() {
	const [landData, setLandData] = useState({
		address: "",
		price: "",
		description: "",
		typeOfLand: "",
		area: "",
		buildingPermit: "",
	});

	const [errors, setErrors] = useState({
		address: "",
		price: "",
		area: "",
		typeOfLand: "",
	});

	const navi = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setLandData({ ...landData, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setLandData({ ...landData, [name]: checked });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("accessToken");
			await LandsService.addLand(landData, token);
			setErrors({});
			showNotification("Land added successfully", "success");
			navi("/lands");
		} catch (error) {
			if(error instanceof Object){
				setErrors(error)
			}else{
				console.log(error);
			}
		}
	};

	return (
		<div className="main-content">
			<div className="main-content-post">
				<h2>Add land</h2>
				{errors.general && <p className="error-msg">{errors.general}</p>}
				<form onSubmit={handleSubmit} className="post-form">
					<div className="apartment-post-box">
						<div className="first-input-box-post">
							<div className="input-box-post">
								<label htmlFor="">Address:</label>
								<input
									type="text"
									name="address"
									value={landData.address}
									onChange={handleInputChange}
								/>
							</div>
							{errors.address && <p className="error-msg">{errors.address}</p>}
							<div className="input-box-post">
								<label htmlFor="">Price:</label>
								<input
									type="number"
									name="price"
									value={landData.price}
									onChange={handleInputChange}
								/>
							</div>
							{errors.price && <p className="error-msg">{errors.price}</p>}
							<div className="input-box-post">
								<label htmlFor="">Description:</label>
								<input
									type="text"
									name="description"
									value={landData.description}
									onChange={handleInputChange}
								/>
							</div>
							<div className="input-box-post">
								<label htmlFor="">Land area:</label>
								<input
									type="number"
									name="area"
									value={landData.area}
									onChange={handleInputChange}
								/>
							</div>
							{errors.area && <p className="error-msg">{errors.area}</p>}
						</div>
						<div className="second-input-box-post">
							<div className="input-box-post">
								<label htmlFor="">Type of land:</label>
								<select
									name="typeOfLand"
									value={landData.typeOfLand}
									onChange={handleInputChange}
									className="select"
								>
									<option value="">Select type of land</option>
									{Object.values(TypeOfLand).map((type, index) => (
										<option key={index} value={type}>
											{type}
										</option>
									))}
								</select>
							</div>
							{errors.typeOfLand && <p className="error-msg">{errors.typeOfLand}</p>}

							<div className="input-checkbox-group">
								<div className="input-box-post">
									<label htmlFor="duplex">Building permit:</label>
									<input
										type="checkbox"
										id="buildingPermit"
										name="buildingPermit"
										checked={landData.buildingPermit}
										onChange={handleCheckboxChange}
									/>
								</div>
							</div>
						</div>
					</div>

					<button type="submit" className="my-btn">
						Add
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddLand;
