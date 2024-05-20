import { useEffect, useState } from "react";
import ClientService from "../../service/ClientService";
import "../../style/TablesStyle.css";
import { Link } from "react-router-dom";
import Notification, { showNotification } from "../alerts/Notification";

function Clients() {
	const [clients, setClients] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);

	useEffect(() => {
		fetchClients();
	}, [page, pageSize]);

	const fetchClients = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await ClientService.getAllClients(token, page, pageSize);

			setClients(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteClient = async (id) => {
		try {
			const token = localStorage.getItem("accessToken");
			await ClientService.deleteClient(id, token);
			fetchClients();
		} catch (error) {
			showNotification("Cannot delete client who has offers", "error");
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

	return (
		<div className="main-content">
			<div className="main-content-table">
				<Link className="add-resource-btn" to="/add-client">
					Add client
				</Link>
				<div className="table-container">
					<table className="box-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>First name</th>
								<th>Last name</th>
								<th>Telephone</th>
								<th>Email</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{clients.map((client) => (
								<tr key={client.id}>
									<td>{client.id}</td>
									<td>{client.firstName}</td>
									<td>{client.lastName}</td>
									<td>{client.telephone}</td>
									<td>{client.email}</td>
									<td>
										<Link
											to={`/offer/client/${client.id}`}
											className="action-btns"
										>
											Client offers
										</Link>
										<Link
											to={`/update-client/${client.id}`}
											className="action-btns"
										>
											Update
										</Link>

										<Link
											className="action-btns"
											onClick={() => deleteClient(client.id)}
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

export default Clients;
