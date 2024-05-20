import React, { useEffect, useState } from "react";
import "../../style/TablesStyle.css";
import PropertyService from "../../service/PropertyService";

function Properties() {
	const [properties, setProperties] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
    if (keyword) {
        searchProperties();
    } else {
        fetchProperties();
    }
}, [page, pageSize, keyword]);

const fetchProperties = async () => {
  try {
      const token = localStorage.getItem("accessToken");
      const response = await PropertyService.getAllProperties(token, page, pageSize);
      setProperties(response.data);
  } catch (error) {
      console.log(error);
  }
};
const searchProperties = async () => {
  try {
      const token = localStorage.getItem("accessToken");
      const response = await PropertyService.searchProperties(token, keyword, page, pageSize);
      setProperties(response.data);
  } catch (error) {
      console.log(error);
  }
};

	const handleSearch = (e) => {
		setKeyword(e.target.value);
    setPage(0)
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
				<div className="table-container">
					<input className="search"
						type="text"
						placeholder="Search by address, ID or description"
						value={keyword}
						onChange={handleSearch}
					/>
					<table className="box-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Address</th>
								<th>Price</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{properties.map((property) => (
								<tr key={property.id}>
									<td>{property.id}</td>
									<td>{property.address}</td>
									<td>{property.price} EUR</td>
									<td>{property.description}</td>
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

export default Properties;
