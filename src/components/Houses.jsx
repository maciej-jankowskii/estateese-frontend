import React, { useEffect, useState } from "react";
import HousesService from "../service/HousesService";

function Houses() {
	const [houses, setHouses] = useState([]);

	useEffect(() => {
		fetchHouses();
	}, []);

	const fetchHouses = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await HousesService.getAllHouses(token);
			setHouses(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="main-content">
			<div className="main-content-apartment">
				<div className="table-container">
					<button>Add house</button>
					<table className="apartments-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Address</th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
                            =
							{houses.map((house) => (
								<tr key={house.id}>
									<td>{house.id}</td>
									<td>{house.address}</td>
									<td>{house.price} EUR</td>
									<td>
										<button className="action-btns">Details</button>
										<button className="action-btns">Update</button>
										<button className="action-btns">Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Houses;
