import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ReservationService from '../../service/ReservationService';

function UpdateReservation() {
    const {id} = useParams();
    
    const [reservationData, setReservationData] = useState({
		description: "",
		offerId: "",
	});

    const [errors, setErrors] = useState({
        offerId: ""
    })

    const navi = useNavigate();
    

    useEffect(() => {
        fetchReservationById(id);
    },[id])

    const fetchReservationById = async (id) => {
        try{
            const token = localStorage.getItem('accessToken');
            const response = await ReservationService.getReservationById(token, id);
            const {
                description, offerId} = response.data;
            setReservationData({
                description, offerId
            })
        }catch(error){
            console.log(error);
        }
    }

    const handleInputChange = (e) =>{
        const{name, value} = e.target;
        setReservationData((prevReservationData) => ({
            ...prevReservationData, [name]:value
        }))
        setErrors({...errors, [name]: ""});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('accessToken');
            const response = await ReservationService.updateReservation(id, reservationData, token)
            navi('/reservations')
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
				<h2>Update reservation</h2>
                {errors.general && <p className="error-msg">{errors.general}</p>}
				<form onSubmit={handleSubmit} className="post-form">
					<div className="apartment-post-box">
						<div className="first-input-box-post">
							<div className="input-box-post">
								<label htmlFor="">Description:</label>
								<input
									type="text"
									name="description"
									value={reservationData.description}
									onChange={handleInputChange}
								/>
							</div>
							<div className="input-box-post">
								<label htmlFor="">Offer:</label>
								<input
									type="number"
									name="offerId"
									value={reservationData.offerId}
									onChange={handleInputChange}
								/>
							</div>
                            {errors.offerId && <p className="error-msg">{errors.offerId}</p>}
						</div>
					</div>

					<button type="submit" className="my-btn">
						Update
					</button>
				</form>
			</div>
		</div>
   
  )
}

export default UpdateReservation