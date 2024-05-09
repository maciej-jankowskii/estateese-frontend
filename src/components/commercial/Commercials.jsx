import { useEffect, useState } from "react";
import CommercialPropertyService from "../../service/CommercialPropertyService";
import "../../style/TablesStyle.css";
import { Link } from "react-router-dom";

function Commercials() {
	const [commercials, setCommercials] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);

	useEffect(() => {
		fetchCommercials();
	}, [page, pageSize]);

	const fetchCommercials = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await CommercialPropertyService.getAllCommercials(token, page, pageSize);
			setCommercials(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteCommercial = async (id) => {
		try{
			const token = localStorage.getItem('accessToken');
			await CommercialPropertyService.deleteCommercialProperty(id, token);
			fetchCommercials();
		}catch(error){
			console.log(error);
		}
	}

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
				<Link className="add-resource-btn " to="/add-commercial">
					Add commercial property
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
							{commercials.map((commercial) => (
								<tr key={commercial.id}>
									<td>{commercial.id}</td>
									<td>{commercial.address}</td>
									<td>{commercial.price} EUR</td>
									<td>
										<Link className="action-btns" to={`/commercial/${commercial.id}`}>
										Details
										</Link>
										<Link className="action-btns" to={`/update-commercial/${commercial.id}`}>Update</Link>
										<Link
											className="action-btns"
											onClick={() => deleteCommercial(commercial.id)}
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

export default Commercials;
