import { useEffect, useState } from 'react';
import '../style/Clients.css'
import ClientService from '../service/ClientService';

function Clients() {

    const [clients, setClients] = useState([]);
    useEffect(()=>{
        fetchClients();
    }, [])

    const fetchClients = async () => {
        try{
            const token = localStorage.getItem("accessToken");
            const response = await ClientService.getAllClients(token);
            console.log(response.data);
            setClients(response.data);

        }catch(error){
            console.log(error);
        }
    }


  return (
    <div className='main-content'>
        <div className='main-content-clients'>
            <h2>Lista klientow</h2>
            <div className="table-container">
                <button>Add client</button>
					<table className="apartments-table">
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
                                    <button>Client offers</button>
                                    <button>Update</button>
                                    <button>Delete</button>
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

export default Clients