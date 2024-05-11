import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OffersService from '../../service/OffersService';

function AddOffer() {
    const [offerData, setOfferData] = useState({
        userId: '',
        clientId: "",
        propertyId: "",
        reservationId: "",
        isBooked: "",
        isAvailable:""
    })

    const navi = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setOfferData({...offerData, [name]: value});
      }
    
      const handleCheckboxChange = (e) => {
        const {name, checked} = e.target;
        setOfferData({...offerData, [name]: checked})
      }


      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const token = localStorage.getItem('accessToken');
          await OffersService.addOffer(offerData, token)
          navi('/offers')
        }catch(error){
          console.log(error);
    
        }
      }





  return (

    <div className="main-content">
			<div className="main-content-post">
				<h2>Add offer</h2>
				<form onSubmit={handleSubmit} className="post-form">
					<div className="apartment-post-box">
                    <div className='first-input-box-post'>
                    <div className="input-box-post">
						<label htmlFor="">User:</label>
						<input
							type="number"
							name="userId"
							value={offerData.userId}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Client:</label>
						<input
							type="number"
							name="clientId"
							value={offerData.clientId}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Property:</label>
						<input
							type="number"
							name="propertyId"
							value={offerData.propertyId}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Reservation:</label>
						<input
							type="number"
							name="reservationId"
							value={offerData.reservationId}
							onChange={handleInputChange}
                            disabled
						/>
					</div>

                    </div>
                    <div className="second-input-box-post">

        

					<div className="input-checkbox-group">
					<div className="input-box-post">
						<label htmlFor="duplex">Booked:</label>
						<input
							type="checkbox"
							id="isBooked"
							name="isBooked"
							checked={offerData.isBooked}
							onChange={handleCheckboxChange}
						/>
					</div>

                    <div className="input-box-post">
						<label htmlFor="duplex">Available:</label>
						<input
							type="checkbox"
							id="isAvailable"
							name="isAvailable"
							checked={offerData.isAvailable}
							onChange={handleCheckboxChange}
						/>
					</div>
					</div>


					

				
                    </div>
                    </div>

					
					<button type="submit" className="my-btn">
						Add
					</button>
				</form>
			</div>
		</div>
    
    
  )
}

export default AddOffer