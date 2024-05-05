import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApartmentService from "../service/ApartmentService";
import Standard from "../const/Standard";
import BuildingType from "../const/BuildingType";

function AddApartment() {
	const [apartmentData, setApartmentData] = useState({
		address: "",
		price: "",
		description: "",
		area: "",
		rooms: "",
		bathrooms: "",
		duplexApartment: false,
		buildingType: "",
		floor: "",
		elevator: false,
		balcony: false,
		garage: false,
		yearOfConstruction: "",
		standard: "",

	});

	const navi = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setApartmentData({ ...apartmentData, [name]: value });
	};

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setApartmentData({ ...apartmentData, [name]: checked });
    };

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("accessToken");
			await ApartmentService.addApartment(apartmentData, token);
			navi("/apartments");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="main-content">
			<div className="main-content-register">
				<h2>Add new employee</h2>
				<form onSubmit={handleSubmit} className="register-form">
					<div className="input-box-register">
						<label htmlFor="">Address:</label>
						<input
							type="text"
							name="address"
							value={apartmentData.address}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-register">
						<label htmlFor="">Price:</label>
						<input
							type="number"
							name="price"
							value={apartmentData.price}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-register">
						<label htmlFor="">Description:</label>
						<input
							type="text"
							name="description"
							value={apartmentData.description}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-register">
						<label htmlFor="">Area:</label>
						<input
							type="number"
							name="area"
							value={apartmentData.area}
							onChange={handleInputChange}
						/>
					</div>

					<div className="input-box-register">
						<label htmlFor="">Rooms:</label>
						<input
							type="number"
							name="rooms"
							value={apartmentData.rooms}
							onChange={handleInputChange}
						/>
					</div>

					<div className="input-box-register">
						<label htmlFor="">Bathrooms:</label>
						<input
							type="number"
							name="bathrooms"
							value={apartmentData.bathrooms}
							onChange={handleInputChange}
						/>
					</div>

					<div className="input-box-register">
						<label htmlFor="duplex">Duplex:</label>
						<input
							type="checkbox"
							id="duplex"
							name="duplex"
							checked={apartmentData.duplexApartment}
							onChange={handleCheckboxChange}
						/>
					</div>

					<div className="input-box-register">
						<label htmlFor="">Type of building:</label>
						<select
							name="buildingType"
							value={apartmentData.buildingType}
							onChange={handleInputChange}
						>
							<option value="">Select building type</option>
							{Object.values(BuildingType).map((type, index) => (
								<option key={index} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>

					<div className="input-box-register">
						<label htmlFor="">Floor:</label>
						<input
							type="number"
							name="floor"
							value={apartmentData.floor}
							onChange={handleInputChange}
						/>
					</div>

					<div className="input-box-register">
						<label htmlFor="elevator">Elevator:</label>
						<input
							type="checkbox"
							id="elevator"
							name="elevator"
							checked={apartmentData.elevator}
							onChange={handleCheckboxChange}
						/>
					</div>

					<div className="input-box-register">
						<label htmlFor="balcony">Balcony:</label>
						<input
							type="checkbox"
							id="balcony"
							name="balcony"
							checked={apartmentData.balcony}
							onChange={handleCheckboxChange}
						/>
					</div>

					<div className="input-box-register">
						<label htmlFor="garage">Garage:</label>
						<input
							type="checkbox"
							id="garage"
							name="garage"
							checked={apartmentData.garage}
							onChange={handleCheckboxChange}
						/>
					</div>

					<div className="input-box-register">
						<label htmlFor="">Year of Construction:</label>
						<input
							type="text"
							name="yearOfConstruction"
							value={apartmentData.yearOfConstruction}
							onChange={handleInputChange}
						/>
					</div>

					<div className="input-box-register">
						<label htmlFor="">Standard:</label>
						<select
							name="standard"
							value={apartmentData.standard}
							onChange={handleInputChange}
						>
							<option value="">Select standard</option>
							{Object.values(Standard).map((std, index) => (
								<option key={index} value={std}>
									{std}
								</option>
							))}
						</select>
					</div>
					<button type="submit" className="register-btn">
						Add
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddApartment;
