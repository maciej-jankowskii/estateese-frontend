import { useEffect, useState } from "react";
import HousesService from "../../service/HousesService";
import "../../style/TablesStyle.css";
import { Link } from "react-router-dom";
import Notification, { showNotification } from "../alerts/Notification";

function Houses() {
	const [houses, setHouses] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);

	useEffect(() => {
		fetchHouses();
	}, [page, pageSize]);

	const fetchHouses = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await HousesService.getAllHouses(token, page, pageSize);
			setHouses(response.data);
		} catch (error) {
			console.log(error.response);
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

	const deleteHouse = async (id) => {
		try {
			const token = localStorage.getItem("accessToken");
			await HousesService.deleteHouse(id, token);
			showNotification("House deleted", "success");
			fetchHouses();
		} catch (error) {
			showNotification("Cannot delete house assigned to an offer", "error");
		}
	};

	return (
		<div className="main-content">
			<div className="main-content-table">
				<Link className="add-resource-btn " to="/add-house">
					Add house
				</Link>
				<div className="table-container">
					<table className="box-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Address</th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{houses.map((house) => (
								<tr key={house.id}>
									<td>{house.id}</td>
									<td>{house.address}</td>
									<td>{house.price} EUR</td>
									<td>
										<Link className="action-btns" to={`/house/${house.id}`}>
											Details
										</Link>
										<Link
											className="action-btns"
											to={`/update-house/${house.id}`}
										>
											Update
										</Link>
										<Link
											className="action-btns"
											onClick={() => deleteHouse(house.id)}
										>
											Delete
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

export default Houses;
