import { useEffect, useState } from "react";
import OffersService from "../../service/OffersService";
import "../../style/TablesStyle.css";
import { Link } from "react-router-dom";
import Notification, { showNotification } from "../alerts/Notification";
import ClientService from "../../service/ClientService";

function Offers() {
	const [offers, setOffers] = useState([]);
	const [clients, setClients] = useState({});
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);

	useEffect(() => {
		fetchOffers();
	}, [page, pageSize]);

	const fetchOffers = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await OffersService.getAllOffers(token, page, pageSize);
			const offersData = response.data;

			const clientsData = await Promise.all(
				offersData.map(async (offer) => {
					const clientResponse = await ClientService.getClientById(token, offer.clientId);
					return { ...clientResponse.data, clientId: offer.clientId };
				})
			);

			const clientsMap = clientsData.reduce((acc, client) => {
				acc[client.clientId] = client;
				return acc;
			}, {});

			setClients(clientsMap);
			setOffers(offersData);
		} catch (error) {
			console.log(error);
		}
	};

	const nextPage = () => {
		setPage(page + 1);
	};

	const prevPage = () => {
		if (page > 0) {
			setPage(page - 1);
		}
	};

	const deleteOffer = async (id) => {
		try {
			const token = localStorage.getItem("accessToken");
			await OffersService.deleteOffer(id, token);
			showNotification("Offer deleted", "success");
			fetchOffers();
		} catch (error) {
			console.log(error);
		}
	};

	const soldOffer = async (id) => {
		try {
			const token = localStorage.getItem("accessToken");
			await OffersService.markOfferAsSold(id, token);
			fetchOffers();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="main-content">
			<div className="main-content-table">
				<Link className="add-resource-btn" to="/add-offer">
					Add offer
				</Link>
				<div className="table-container">
					<table className="box-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Employee</th>
								<th>Client</th>
								<th>Property</th>
								<th>Booked</th>
								<th>Available</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{offers.map((offer) => (
								<tr key={offer.id}>
									<td>{offer.id}</td>
									<td>{offer.userId}</td>
									<td>{clients[offer.clientId] ? `${clients[offer.clientId].firstName} ${clients[offer.clientId].lastName}` : "Loading..."}</td>
									<td>{offer.propertyId}</td>
									<td>{offer.isBooked ? "Yes" : "No"}</td>
									<td>{offer.isAvailable ? "Yes" : "No"}</td>
									<td>
										<Link
											className="action-btns"
											to={`/update-offer/${offer.id}`}
										>
											Update
										</Link>
										<Link
											className="action-btns"
											onClick={() => deleteOffer(offer.id)}
										>
											Delete
										</Link>
										<Link
											className="action-btns"
											onClick={() => soldOffer(offer.id)}
										>
											Sold
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className="page-btns">
						<button onClick={prevPage}>Previous Page</button>
						<button onClick={nextPage}>Next Page</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Offers;
