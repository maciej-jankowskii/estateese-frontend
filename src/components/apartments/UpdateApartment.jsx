import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApartmentService from "../../service/ApartmentService";
import Standard from "../../const/Standard";
import BuildingType from "../../const/BuildingType";
import '../../style/PostStyle.css'
import Notification, { showNotification } from "../../alerts/Notification";

function UpdateApartment() {
	const { id } = useParams();
	const navi = useNavigate();

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

	const [errors, setErrors] = useState({
		address: "",
		price: "",
		area: "",
		rooms: "",
		bathrooms: "",
		buildingType: "",
		standard: ""
	});

	

	useEffect(() => {
		fetchApartmentById(id);
	}, [id]);

	const fetchApartmentById = async (id) => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await ApartmentService.getApartmentById(token, id);
			const {
				address,
				price,
				description,
				area,
				rooms,
				bathrooms,
				duplexApartment,
				buildingType,
				floor,
				elevator,
				balcony,
				garage,
				yearOfConstruction,
				standard,
			} = response.data;
			console.log(response.data);
			setApartmentData({
				address,
				price,
				description,
				area,
				rooms,
				bathrooms,
				duplexApartment,
				buildingType,
				floor,
				elevator,
				balcony,
				garage,
				yearOfConstruction,
				standard,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setApartmentData((prevApartmentData) => ({
			...prevApartmentData,
			[name]: value,
		}));
		setErrors({...errors, [name]: ""});
	};
	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setApartmentData((prevApartmentData) => ({
			...prevApartmentData,
			[name]: checked,
		}));
		setErrors({...errors, [name]: ""});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("accessToken");
			const response = await ApartmentService.updateApartment(
				id,
				apartmentData,
				token
			);
			showNotification("Apartment updated successfully", "success");
			navi("/apartments");
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
				<h2>Update apartment</h2>
				{errors.general && <p className="error-msg">{errors.general}</p>}
				<form onSubmit={handleSubmit} className="post-form">
					<div className="apartment-post-box">
                    <div className='first-input-box-post'>
                    <div className="input-box-post">
						<label htmlFor="">Address:</label>
						<input
							type="text"
							name="address"
							value={apartmentData.address}
							onChange={handleInputChange}
						/>
					</div>
					{errors.address && <p className="error-msg">{errors.address}</p>}
					
					<div className="input-box-post">
						<label htmlFor="">Price:</label>
						<input
							type="number"
							name="price"
							value={apartmentData.price}
							onChange={handleInputChange}
						/>
					</div>
					{errors.price && <p className="error-msg">{errors.price}</p>}
					<div className="input-box-post">
						<label htmlFor="">Description:</label>
						<input
							type="text"
							name="description"
							value={apartmentData.description}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Area:</label>
						<input
							type="number"
							name="area"
							value={apartmentData.area}
							onChange={handleInputChange}
						/>
					</div>
					{errors.area && <p className="error-msg">{errors.area}</p>}

					<div className="input-box-post">
						<label htmlFor="">Rooms:</label>
						<input
							type="number"
							name="rooms"
							value={apartmentData.rooms}
							onChange={handleInputChange}
						/>
					</div>
					{errors.rooms && <p className="error-msg">{errors.rooms}</p>}

					<div className="input-box-post">
						<label htmlFor="">Bathrooms:</label>
						<input
							type="number"
							name="bathrooms"
							value={apartmentData.bathrooms}
							onChange={handleInputChange}
						/>
					</div>
					{errors.bathrooms && <p className="error-msg">{errors.bathrooms}</p>}
                    </div>
                    <div className="second-input-box-post">

					<div className="input-box-post">
						<label htmlFor="">Year of Construction:</label>
						<input
							type="text"
							name="yearOfConstruction"
							value={apartmentData.yearOfConstruction}
							onChange={handleInputChange}
						/>
					</div>

					<div className="input-box-post">
						<label htmlFor="">Floor:</label>
						<input
							type="number"
							name="floor"
							value={apartmentData.floor}
							onChange={handleInputChange}
						/>
					</div>


					<div className="input-box-post">
						<label htmlFor="">Type of building:</label>
						<select
							name="buildingType"
							value={apartmentData.buildingType}
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
					{errors.buildingType && <p className="error-msg">{errors.buildingType}</p>}

					<div className="input-box-post">
						<label htmlFor="">Standard:</label>
						<select
							name="standard"
							value={apartmentData.standard}
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
					{errors.standard && <p className="error-msg">{errors.standard}</p>}

					<div className="input-checkbox-group">
					<div className="input-box-post">
						<label htmlFor="duplex">Duplex:</label>
						<input
							type="checkbox"
							id="duplex"
							name="duplexApartment"
							checked={apartmentData.duplexApartment}
							onChange={handleCheckboxChange}
						/>
					</div>

					

					<div className="input-box-post">
						<label htmlFor="elevator">Elevator:</label>
						<input
							type="checkbox"
							id="elevator"
							name="elevator"
							checked={apartmentData.elevator}
							onChange={handleCheckboxChange}
						/>
					</div>

					<div className="input-box-post">
						<label htmlFor="balcony">Balcony:</label>
						<input
							type="checkbox"
							id="balcony"
							name="balcony"
							checked={apartmentData.balcony}
							onChange={handleCheckboxChange}
						/>
					</div>

					<div className="input-box-post">
						<label htmlFor="garage">Garage:</label>
						<input
							type="checkbox"
							id="garage"
							name="garage"
							checked={apartmentData.garage}
							onChange={handleCheckboxChange}
						/>
					</div>
					</div>


					

				
                    </div>
                    </div>

					
					<button type="submit" className="my-btn">
						Update
					</button>
				</form>
			</div>
		</div>
		
	);
}

export default UpdateApartment;
