import { useState } from "react";
import BuildingType from "../../const/BuildingType";
import Standard from "../../const/Standard";
import "../../style/PostStyle.css";
import { useNavigate } from "react-router-dom";
import HousesService from "../../service/HousesService";
import { showNotification } from "../alerts/Notification";

function AddHouse() {
	/*
		REACT HOOKS 
	*/

	const [houseData, setHouseData] = useState({
		address: "",
		price: "",
		description: "",
		landArea: "",
		houseArea: "",
		rooms: "",
		bathrooms: "",
		balcony: "",
		garage: "",
		twoStoryHouse: "",
		buildingType: "",
		yearOfConstruction: "",
		standard: "",
	});

	const [errors, setErrors] = useState({
		address: "",
		price: "",
		landArea: "",
		houseArea: "",
		rooms: "",
		bathrooms: "",
		buildingType: "",
		standard: "",
	});

	const navi = useNavigate();

	/*
		FROM EVENT HANDLING METHODS 
	*/

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setHouseData({ ...houseData, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setHouseData({ ...houseData, [name]: checked });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("accessToken");
			await HousesService.addHouse(houseData, token);
			setErrors({});
			showNotification("House added successfully", "success");
			navi("/houses");
		} catch (error) {
			if (error instanceof Object) {
				setErrors(error);
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
				<h2>Add house</h2>
				{errors.general && <p className="error-msg">{errors.general}</p>}
				<form onSubmit={handleSubmit} className="post-form">
					<div className="apartment-post-box">
						<div className="first-input-box-post">
							<div className="input-box-post">
								<label htmlFor="">Address:</label>
								<input
									type="text"
									name="address"
									value={houseData.address}
									onChange={handleInputChange}
								/>
							</div>
							{errors.address && <p className="error-msg">{errors.address}</p>}
							<div className="input-box-post">
								<label htmlFor="">Price:</label>
								<input
									type="number"
									name="price"
									value={houseData.price}
									onChange={handleInputChange}
								/>
							</div>
							{errors.price && <p className="error-msg">{errors.price}</p>}

							<div className="input-box-post">
								<label htmlFor="">Description:</label>
								<input
									type="text"
									name="description"
									value={houseData.description}
									onChange={handleInputChange}
								/>
							</div>
							<div className="input-box-post">
								<label htmlFor="">Land area:</label>
								<input
									type="number"
									name="landArea"
									value={houseData.landArea}
									onChange={handleInputChange}
								/>
							</div>
							{errors.landArea && (
								<p className="error-msg">{errors.landArea}</p>
							)}

							<div className="input-box-post">
								<label htmlFor="">House area:</label>
								<input
									type="number"
									name="houseArea"
									value={houseData.houseArea}
									onChange={handleInputChange}
								/>
							</div>
							{errors.houseArea && (
								<p className="error-msg">{errors.houseArea}</p>
							)}

							<div className="input-box-post">
								<label htmlFor="">Rooms:</label>
								<input
									type="number"
									name="rooms"
									value={houseData.rooms}
									onChange={handleInputChange}
								/>
							</div>
							{errors.rooms && <p className="error-msg">{errors.rooms}</p>}

							<div className="input-box-post">
								<label htmlFor="">Bathrooms:</label>
								<input
									type="number"
									name="bathrooms"
									value={houseData.bathrooms}
									onChange={handleInputChange}
								/>
							</div>
							{errors.bathrooms && (
								<p className="error-msg">{errors.bathrooms}</p>
							)}
						</div>
						<div className="second-input-box-post">
							<div className="input-box-post">
								<label htmlFor="">Year of Construction:</label>
								<input
									type="text"
									name="yearOfConstruction"
									value={houseData.yearOfConstruction}
									onChange={handleInputChange}
								/>
							</div>

							<div className="input-box-post">
								<label htmlFor="">Type of building:</label>
								<select
									name="buildingType"
									value={houseData.buildingType}
									onChange={handleInputChange}
									className="select"
								>
									<option value="">Select building type</option>
									{Object.values(BuildingType).map((type, index) => (
										<option key={index} value={type}>
											{type}
										</option>
									))}
								</select>
							</div>
							{errors.buildingType && (
								<p className="error-msg">{errors.buildingType}</p>
							)}

							<div className="input-box-post">
								<label htmlFor="">Standard:</label>
								<select
									name="standard"
									value={houseData.standard}
									onChange={handleInputChange}
									className="select"
								>
									<option value="">Select standard</option>
									{Object.values(Standard).map((std, index) => (
										<option key={index} value={std}>
											{std}
										</option>
									))}
								</select>
							</div>
							{errors.standard && (
								<p className="error-msg">{errors.standard}</p>
							)}

							<div className="input-checkbox-group">
								<div className="input-box-post">
									<label htmlFor="duplex">Balcony:</label>
									<input
										type="checkbox"
										id="balcony"
										name="balcony"
										checked={houseData.balcony}
										onChange={handleCheckboxChange}
									/>
								</div>

								<div className="input-box-post">
									<label htmlFor="garage">Garage:</label>
									<input
										type="checkbox"
										id="garage"
										name="garage"
										checked={houseData.garage}
										onChange={handleCheckboxChange}
									/>
								</div>

								<div className="input-box-post">
									<label htmlFor="garage">Two story house:</label>
									<input
										type="checkbox"
										id="twoStoryHouse"
										name="twoStoryHouse"
										checked={houseData.twoStoryHouse}
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

export default AddHouse;
