import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HousesService from "../../service/HousesService";

function HouseDetails() {
	/*
		REACT HOOKS 
	*/

	const { id } = useParams();
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

	useEffect(() => {
		fetchHouseById(id);
	}, [id]);

	/*
		  FETCH METHODS 
	*/

	const fetchHouseById = async (id) => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await HousesService.getHouseById(token, id);
			const {
				address,
				price,
				description,
				landArea,
				houseArea,
				rooms,
				bathrooms,
				balcony,
				garage,
				twoStoryHouse,
				buildingType,
				yearOfConstruction,
				standard,
			} = response.data;
			setHouseData({
				address,
				price,
				description,
				landArea,
				houseArea,
				rooms,
				bathrooms,
				balcony,
				garage,
				twoStoryHouse,
				buildingType,
				yearOfConstruction,
				standard,
			});
		} catch (error) {
			console.log(error);
		}
	};

	/*
		JSX CODE 
	*/

	return (
		<div className="main-content">
			<div className="details-box">
				<h2>Details</h2>
				<p>Address: {houseData.address}</p>
				<p>Price: {houseData.price}</p>
				<p>Description: {houseData.description}</p>
				<p>Land area: {houseData.landArea}</p>
				<p>House area: {houseData.houseArea}</p>
				<p>Rooms: {houseData.rooms}</p>
				<p>Bathrooms: {houseData.bathrooms}</p>
				<p>Balcony: {houseData.balcony ? "Yes" : "No"}</p>
				<p>Garage: {houseData.garage ? "Yes" : "No"}</p>
				<p>Two story house: {houseData.twoStoryHouse ? "Yes" : "No"}</p>
				<p>Type of building: {houseData.buildingType}</p>
				<p>Standard: {houseData.typeOfBusiness}</p>
				<p>Year of construction: {houseData.yearOfConstruction}</p>
				<Link className="back-btn" to="/houses">
					Back
				</Link>
			</div>
		</div>
	);
}

export default HouseDetails;
