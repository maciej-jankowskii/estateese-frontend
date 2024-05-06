import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApartmentService from "../../service/ApartmentService";
import { Link } from "react-router-dom";
import '../../style/DetailsStyle.css'

function ApartmentDetails() {
	const { id } = useParams();

	const [apartmentData, setApartmentData] = useState({
		address: "",
		price: "",
		description: "",
		area: "",
		rooms: "",
		bathrooms: "",
		duplexApartment: "",
		buildingType: "",
		floor: "",
		elevator: "",
		balcony: "",
		garage: "",
		yearOfConstruction: "",
		standard: "",
	});

	useEffect(() => {
		fetchApartmentById(id);
	}, [id]);

	const fetchApartmentById = async (id) => {
		try {
			const token = localStorage.getItem("accessToken");
			console.log(token);
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

	return (
		<div className="main-content">
			<div className="details-box">
				<h2>Details</h2>
				<p>Address: {apartmentData.address}</p>
				<p>Price: {apartmentData.price}</p>
				<p>Description: {apartmentData.description}</p>
				<p>Area: {apartmentData.area}</p>
				<p>Rooms: {apartmentData.rooms}</p>
				<p>Bathrooms: {apartmentData.bathrooms}</p>
				<p>Duplex: {apartmentData.duplexApartment ? 'Yes' : 'No'}</p>
				<p>Type of building: {apartmentData.buildingType}</p>
				<p>Floor: {apartmentData.floor}</p>
				<p>Elevator: {apartmentData.elevator ? 'Yes' : 'No'}</p>
				<p>Balcony: {apartmentData.balcony ? 'Yes' : 'No'}</p>
				<p>Garage: {apartmentData.garage ? 'Yes' : 'No'}</p>
				<p>Construction year: {apartmentData.yearOfConstruction}</p>
				<p>Standard: {apartmentData.standard}</p>
				<Link className="back-btn" to="/apartments">Back</Link>
			</div>
		</div>
	);
}

export default ApartmentDetails;
