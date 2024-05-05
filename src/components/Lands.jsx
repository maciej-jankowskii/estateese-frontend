import React, { useEffect, useState } from 'react'
import LandsService from '../service/LandsService';

function Lands() {
    const [lands, setLands] = useState([]);

    useEffect(()=>{
        fetchLands();
    },[])
    
    const fetchLands = async () => {
        try{
            const token = localStorage.getItem('accessToken');
            const response = await LandsService.getAllLands(token);
            setLands(response.data)
        }catch(error){
            console.log(error);
        }

    }
  return (
    <div className="main-content">
			<div className="main-content-apartment">
				<div className="table-container">
					<button>Add land</button>
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
							{lands.map((land) => (
								<tr key={land.id}>
                                <td>{land.id}</td>
                                <td>{land.address}</td>
                                <td>{land.price} EUR</td>
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

export default Lands