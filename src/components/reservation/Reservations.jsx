import React, { useEffect, useState } from 'react'
import ReservationService from '../../service/ReservationService';
import { Link } from 'react-router-dom';

function Reservations() {

    const [reservations, setReservations] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);

    

	useEffect(() => {
		fetchReservations();
	}, [page, pageSize]);

	const fetchReservations = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await ReservationService.getAllReservations(token, page, pageSize);
			setReservations(response.data);
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



	const deleteReservation = async (id) => {
		try{
			const token = localStorage.getItem("accessToken")
			await ReservationService.deleteReservation(id, token);
			fetchReservations();
		}catch(error){
			console.log(error);
		}
	}
  return (
    <div className="main-content">
			<div className="main-content-table">
				<Link className="add-resource-btn" to="/add-reservation">
					Add reservation
				</Link>
                
				<div className="table-container">
					<table className="box-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Description</th>
								<th>Offer</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{reservations.map((reserv) => (
								<tr key={reserv.id}>
									<td>{reserv.id}</td>
									<td>{reserv.description}</td>
									<td>{reserv.offerId}</td>
									<td>
										<Link className="action-btns" to={`/update-reservation/${reserv.id}`}>Update</Link>
										<Link className="action-btns" onClick={()=> deleteReservation(reserv.id)}>Delete</Link>
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
    
  )
}

export default Reservations