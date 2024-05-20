import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommercialPropertyService from "../../service/CommercialPropertyService";
import BuildingType from "../../const/BuildingType";
import TypeOfBusiness from "../../const/TypeOfBusiness";
import Notification, { showNotification } from "../alerts/Notification";

function UpdateCommercial() {
	const { id } = useParams();
	const navi = useNavigate();

	const [commercialData, setCommercialData] = useState({
		address: "",
		price: "",
		description: "",
		area: "",
		rooms: "",
		bathrooms: "",
		buildingType: "",
		floor: "",
		typeOfBusiness: "",
	});

	const [errors, setErrors] = useState({
		address: "",
		price: "",
		area: "",
		rooms: "",
		bathrooms: "",
		buildingType: "",
		typeOfBusiness: "",
	});

	useEffect(() => {
		fetchCommercialById(id);
	}, [id]);

	const fetchCommercialById = async (id) => {
		try {
			const token = localStorage.getItem("accessToken");
			const response =
				await CommercialPropertyService.getCommercialPropertyById(token, id);

			const {
				address,
				price,
				description,
				area,
				rooms,
				bathrooms,
				buildingType,
				floor,
				typeOfBusiness,
			} = response.data;
			setCommercialData({
				address,
				price,
				description,
				area,
				rooms,
				bathrooms,
				buildingType,
				floor,
				typeOfBusiness,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCommercialData((prevCommercialData) => ({
			...prevCommercialData,
			[name]: value,
		}));
		setErrors({ ...errors, [name]: "" });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("accessToken");
			const response = await CommercialPropertyService.updateCommercialProperty(
				id,
				commercialData,
				token
			);
			showNotification("Commercial property updated successfully", "success");
			navi("/commercials");
		} catch (error) {
			if (error instanceof Object) {
				setErrors(error);
			} else {
				console.log(error);
			}
		}
	};

	return (
		<div className="main-content">
			<div className="main-content-post">
				<h2>Update commercial property</h2>
				{errors.general && <p className="error-msg">{errors.general}</p>}
				<form onSubmit={handleSubmit} className="post-form">
					<div className="apartment-post-box">
						<div className="first-input-box-post">
							<div className="input-box-post">
								<label htmlFor="">Address:</label>
								<input
									type="text"
									name="address"
									value={commercialData.address}
									onChange={handleInputChange}
								/>
							</div>
							{errors.address && <p className="error-msg">{errors.address}</p>}
							<div className="input-box-post">
								<label htmlFor="">Price:</label>
								<input
									type="number"
									name="price"
									value={commercialData.price}
									onChange={handleInputChange}
								/>
							</div>
							{errors.price && <p className="error-msg">{errors.price}</p>}
							<div className="input-box-post">
								<label htmlFor="">Description:</label>
								<input
									type="text"
									name="description"
									value={commercialData.description}
									onChange={handleInputChange}
								/>
							</div>
							<div className="input-box-post">
								<label htmlFor="">Area:</label>
								<input
									type="number"
									name="area"
									value={commercialData.area}
									onChange={handleInputChange}
								/>
							</div>
							{errors.area && <p className="error-msg">{errors.area}</p>}

							<div className="input-box-post">
								<label htmlFor="">Rooms:</label>
								<input
									type="number"
									name="rooms"
									value={commercialData.rooms}
									onChange={handleInputChange}
								/>
							</div>
							{errors.rooms && <p className="error-msg">{errors.rooms}</p>}

							<div className="input-box-post">
								<label htmlFor="">Bathrooms:</label>
								<input
									type="number"
									name="bathrooms"
									value={commercialData.bathrooms}
									onChange={handleInputChange}
								/>
							</div>
							{errors.bathrooms && (
								<p className="error-msg">{errors.bathrooms}</p>
							)}
						</div>
						<div className="second-input-box-post">
							<div className="input-box-post">
								<label htmlFor="">Floor:</label>
								<input
									type="number"
									name="floor"
									value={commercialData.floor}
									onChange={handleInputChange}
								/>
							</div>

							<div className="input-box-post">
								<label htmlFor="">Type of building:</label>
								<select
									name="buildingType"
									value={commercialData.buildingType}
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
								<label htmlFor="">Type of Business:</label>
								<select
									name="typeOfBusiness"
									value={commercialData.typeOfBusiness}
									onChange={handleInputChange}
									className="select"
								>
									<option value="">Select standard</option>
									{Object.values(TypeOfBusiness).map((std, index) => (
										<option key={index} value={std}>
											{std}
										</option>
									))}
								</select>
							</div>
							{errors.typeOfBusiness && (
								<p className="error-msg">{errors.typeOfBusiness}</p>
							)}
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

export default UpdateCommercial;
