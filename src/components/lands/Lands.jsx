import { useEffect, useState } from "react";
import LandsService from "../../service/LandsService";
import "../../style/TablesStyle.css";
import { Link } from "react-router-dom";
import Notification, { showNotification } from "../../alerts/Notification";

function Lands() {
	const [lands, setLands] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);

	useEffect(() => {
		fetchLands();
	}, [page, pageSize]);

	const fetchLands = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await LandsService.getAllLands(token, page, pageSize);
			setLands(response.data);
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

	const deleteLand = async (id) => {
		try{
			const token = localStorage.getItem("accessToken")
			await LandsService.deleteLand(id, token);
			showNotification("Land deleted", "success");
			fetchLands();
		}catch(error){
			showNotification("Cannot delete house assigned to an offer", "error");
		}
	}
	return (
		<div className="main-content">
			<div className="main-content-table">
				<Link className="add-resource-btn" to="/add-land">
					Add land
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
							{lands.map((land) => (
								<tr key={land.id}>
									<td>{land.id}</td>
									<td>{land.address}</td>
									<td>{land.price} EUR</td>
									<td>
										<Link className="action-btns"
										to={`/land/${land.id}`}>Details</Link>
										<Link className="action-btns" to={`/update-land/${land.id}`}>Update</Link>
										<Link className="action-btns" onClick={() => deleteLand(land.id)}>Delete</Link>
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

export default Lands;
