import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClientService from "../../service/ClientService";

function AddClient() {
    const [clientData, setClientData] = useState({
        firstName: '',
        lastName: "",
        telephone: '',
        email: ''

    })

    const navi = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setClientData({...clientData, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem('accessToken');
            await ClientService.addClient(clientData, token);
            navi('/clients')
        }catch(error){
            console.log(error);
        }
    }


  return (
    <div className="main-content">
			<div className="main-content-post">
				<h2>Add Client</h2>
				<form onSubmit={handleSubmit} className="post-form">
					
                    <div className="input-box-post">
						<label htmlFor="">First name:</label>
						<input
							type="text"
							name="firstName"
							value={clientData.firstName}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Last name:</label>
						<input
							type="text"
							name="lastName"
							value={clientData.lastName}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Telephone:</label>
						<input
							type="text"
							name="telephone"
							value={clientData.telephone}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">E-mail address:</label>
						<input
							type="text"
							name="email"
							value={clientData.email}
							onChange={handleInputChange}
						/>
					</div>

                 
					
					<button type="submit" className="my-btn">
						Add
					</button>
				</form>
			</div>
		</div>
   
  )
}

export default AddClient