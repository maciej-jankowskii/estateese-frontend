import { useEffect, useState } from "react";
import ApartmentService from "../../service/ApartmentService";
import { Link } from "react-router-dom";
import "../../style/TablesStyle.css";
import Notification, {showNotification} from "../../alerts/Notification";

function Apartments() {
	const [apartments, setApartments] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	
	

	useEffect(() => {
		fetchApartments();
	}, [page, pageSize]);

	const fetchApartments = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await ApartmentService.getAllApartments(
				token,
				page,
				pageSize
			);
			setApartments(response.data);
		} catch (error) {
			console.log("Error: " + error);
		}
	};



	const deleteApartment = async (id) => {
		try {
			const token = localStorage.getItem("accessToken");
			await ApartmentService.deleteApartment(id, token);
			showNotification("Deleted successfully", "success");
			fetchApartments();
		} catch (error) {
			showNotification(error.message, "error");
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
				<Link className="add-resource-btn " to="/add-apartment">
					Add apartment
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
							{apartments.map((apartment) => (
								<tr key={apartment.id}>
									<td>{apartment.id}</td>
									<td>{apartment.address}</td>
									<td>{apartment.price} EUR</td>
									<td>
										<Link
											className="action-btns"
											to={`/apartment/${apartment.id}`}
										>
											Details
										</Link>
										<Link
											className="action-btns"
											to={`/update-apartment/${apartment.id}`}
										>
											Update
										</Link>
										<Link
											className="action-btns"
											onClick={() => deleteApartment(apartment.id)}
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

export default Apartments;
