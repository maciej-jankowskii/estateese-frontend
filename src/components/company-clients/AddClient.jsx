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

	const [errors, setErrors] = useState({
		firstName: "",
		lastName: ""

	})

    const navi = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setClientData({...clientData, [name]:value})
		setErrors({...errors, [name]: ""})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem('accessToken');
            await ClientService.addClient(clientData, token);
			setErrors({})
            navi('/clients')
        }catch(error){
            if(error instanceof Object){
				setErrors(error)
			}else{
				console.log(error);
			}
        }
    }


  return (
    <div className="main-content">
			<div className="main-content-post">
				<h2>Add Client</h2>
				{errors.general && <p className="error-msg">{errors.general}</p>}
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
					{errors.firstName && <p className="error-msg">{errors.firstName}</p>}
					<div className="input-box-post">
						<label htmlFor="">Last name:</label>
						<input
							type="text"
							name="lastName"
							value={clientData.lastName}
							onChange={handleInputChange}
						/>
					</div>
					{errors.lastName && <p className="error-msg">{errors.lastName}</p>}
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