import { useEffect, useState } from "react";
import ClientService from "../../service/ClientService";
import '../../style/TablesStyle.css'
import { Link } from "react-router-dom";

function Clients() {
	const [clients, setClients] = useState([]);
	useEffect(() => {
		fetchClients();
	}, []);

	const fetchClients = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await ClientService.getAllClients(token);
			console.log(response.data);
			setClients(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="main-content">
			<div className="main-content-table">

				<Link className="add-resource-btn" to='/add-client'>Add client</Link>
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
										<button className="action-btns">Client offers</button>
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

export default Clients;
