import { useEffect, useState } from "react";
import "../style/Apartments.css";
import ApartmentService from "../service/ApartmentService";
import { Link } from 'react-router-dom';
function Apartments() {
	const [apartments, setApartments] = useState([]);

	useEffect(() => {
		fetchApartments();
	}, []);

	const fetchApartments = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await ApartmentService.getAllApartments(token);
			setApartments(response.data);
		} catch (error) {
			console.log("Error: " + error);
		}
	};

	return (
		<div className="main-content">
			<div className="main-content-apartment">
				<div className="table-container">
					<button>Add apartment</button>
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
							{apartments.map((apartment) => (
								<tr key={apartment.id}>
                                <td>{apartment.id}</td>
                                <td>{apartment.address}</td>
                                <td>{apartment.price} EUR</td>
                                <td>
									<Link className='action-btns' to={`/apartment/${apartment.id}`}>Details</Link>
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

export default Apartments;
