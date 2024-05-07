import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClientService from "../../service/ClientService";

function ClientOffers() {
	const { id } = useParams();
	const navi = useNavigate();
	const [offerData, setOfferData] = useState([]);

	useEffect(() => {
		fetchOffersByClient(id);
	}, [id]);

	const fetchOffersByClient = async (clientId) => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await ClientService.getOfferByClientId(token, clientId);

			setOfferData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="main-content">
			<div className="main-content-table">
				<div className="table-container">
					<table className="box-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>User ID</th>
								<th>Property ID</th>
								<th>Reservation ID</th>
								<th>Booked</th>
								<th>Available</th>
							</tr>
						</thead>
						<tbody>
							{offerData.map((offer) => (
								<tr key={offer.id}>
									<td>{offer.id}</td>
									<td>{offer.userId}</td>
									<td>{offer.propertyId}</td>
									<td>{offer.reservationId}</td>
									<td>{offer.isBooked ? "Yes" : "No"}</td>
									<td>{offer.isAvailable ? "Yes" : "No"}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default ClientOffers;
