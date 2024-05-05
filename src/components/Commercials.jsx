import React, { useEffect, useState } from 'react'
import CommercialPropertyService from "../service/CommercialPropertyService";

function Commercials() {
    const [commercials, setCommercials] = useState([]);

    useEffect(() => {
        fetchCommercials();
    },[])

    const fetchCommercials = async () => {
        try{
            const token = localStorage.getItem('accessToken')
            const response = await CommercialPropertyService.getAllCommercials(token);
            setCommercials(response.data)
        } catch(error){
            console.log(error);
        }
    }




  return (
    <div className="main-content">
			<div className="main-content-apartment">
				<div className="table-container">
					<button>Add commercial property</button>
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
							{commercials.map((commercial) => (
								<tr key={commercial.id}>
                                <td>{commercial.id}</td>
                                <td>{commercial.address}</td>
                                <td>{commercial.price} EUR</td>
                                <td>
									<button className='action-btns'>Details</button>
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
    
  )
}

export default Commercials;