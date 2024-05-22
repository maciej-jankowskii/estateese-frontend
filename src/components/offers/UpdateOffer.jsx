import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OffersService from "../../service/OffersService";
import { showNotification } from "../alerts/Notification";
import ClientService from "../../service/ClientService";
import PropertyService from "../../service/PropertyService";
import EmployeeService from "../../service/EmployeeService";

function UpdateOffer() {
	/*
		REACT HOOKS 
	*/

	const { id } = useParams();
	const [offerData, setOfferData] = useState({
		userId: "",
		clientId: "",
		propertyId: "",

		isBooked: "",
		isAvailable: "",
	});

	const [errors, setErrors] = useState({
		userId: "",
		clientId: "",
		propertyId: "",
	});

	const [clients, setClients] = useState([]);
	const [properties, setProperties] = useState([]);
	const [employees, setEmployees] = useState([]);

	const navi = useNavigate();

	useEffect(() => {
		fetchOfferById(id);
		fetchClients();
		fetchProperties();
		fetchEmployees();
	}, [id]);

	/*
		FETCH AND FORM EVENT HANDLING METHODS 
	*/

	const fetchOfferById = async (id) => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await OffersService.getOfferById(token, id);
			const {
				userId,
				clientId,
				propertyId,
				reservationId,
				isBooked,
				isAvailable,
			} = response.data;
			setOfferData({
				userId,
				clientId,
				propertyId,
				reservationId,
				isAvailable,
				isBooked,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const fetchClients = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await ClientService.getAllClients(token);
			setClients(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchProperties = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await PropertyService.getAllProperties(token);
			setProperties(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchEmployees = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await EmployeeService.getAllEmployees(token);
			console.log(response.data);
			setEmployees(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setOfferData((prevOfferData) => ({
			...prevOfferData,
			[name]: value,
		}));
		setErrors({ ...errors, [name]: "" });
	};

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setOfferData((prevOfferData) => ({
			...prevOfferData,
			[name]: checked,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("accessToken");
			const response = await OffersService.updateOffer(id, offerData, token);
			showNotification("Offer updated successfully", "success");
			setOfferData({
				userId: "",
				clientId: "",
				propertyId: "",
				isBooked: "",
				isAvailable: "",
			});
			navi("/offers");
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
				<h2>Update offer</h2>
				{errors.general && <p className="error-msg">{errors.general}</p>}
				<form onSubmit={handleSubmit} className="post-form">
					<div className="apartment-post-box">
						<div className="first-input-box-post">
							<div className="input-box-post">
								<label htmlFor="">User:</label>
								<select
									name="userId"
									className="select"
									value={offerData.userId}
									onChange={handleInputChange}
								>
									<option value="">Select Employee</option>
									{employees.map((empl) => (
										<option key={empl.id} value={empl.id}>
											{empl.firstName}
										</option>
									))}
								</select>
							</div>
							{errors.userId && <p className="error-msg">{errors.userId}</p>}

							<div className="input-box-post">
								<label htmlFor="clientId">Client:</label>
								<select
									name="clientId"
									className="select"
									value={offerData.clientId}
									onChange={handleInputChange}
								>
									<option value="clientId">Select Client</option>
									{clients.map((client) => (
										<option key={client.id} value={client.id}>
											{client.firstName} {client.lastName}
										</option>
									))}
								</select>
							</div>
							{errors.clientId && (
								<p className="error-msg">{errors.clientId}</p>
							)}
							<div className="input-box-post">
								<label htmlFor="">Property:</label>
								<select
									name="propertyId"
									className="select"
									value={offerData.propertyId}
									onChange={handleInputChange}
								>
									<option value="propertyId">Select Property</option>
									{properties.map((property) => (
										<option key={property.id} value={property.id}>
											{property.address}, {property.price} EUR
										</option>
									))}
								</select>
							</div>
							{errors.propertyId && (
								<p className="error-msg">{errors.propertyId}</p>
							)}
						</div>
						<div className="second-input-box-post">
							<div className="input-checkbox-group">
								<div className="input-box-post">
									<label htmlFor="duplex">Booked:</label>
									<input
										type="checkbox"
										id="isBooked"
										name="isBooked"
										checked={offerData.isBooked}
										onChange={handleCheckboxChange}
									/>
								</div>

								<div className="input-box-post">
									<label htmlFor="duplex">Available:</label>
									<input
										type="checkbox"
										id="isAvailable"
										name="isAvailable"
										checked={offerData.isAvailable}
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

export default UpdateOffer;
