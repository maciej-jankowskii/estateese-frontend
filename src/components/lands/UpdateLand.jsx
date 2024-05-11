import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import LandsService from '../../service/LandsService'
import TypeOfLand from '../../const/TypeOfLand'
import '../../style/PostStyle.css'

function UpdateLand() {
  const {id} = useParams();
  const navi = useNavigate();

  const [landData, setLandData] = useState({
    address: "",
		price: "",
		description: "",
    typeOfLand: "",
    area: "",
    buildingPermit: ""
  })

  useEffect(() => {
    fetchLandById(id);
  },[id])
  

  const fetchLandById = async (id) =>{
    try{
      const token = localStorage.getItem('accessToken');
      const response = await LandsService.getLandById(token, id);
      const {
        address, price, description, typeOfLand, area, buildingPermit
      } = response.data;
      setLandData({
        address, price, description, typeOfLand, area, buildingPermit
      })
    } catch(error){
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setLandData((prevLandData) => ({
      ...prevLandData, [name]: value
    }))
  }
  const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setLandData((prevLandData) => ({
			...prevLandData,
			[name]: checked,
		}));
	};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem('accessToken');
      const response = await LandsService.updateLand(id, landData, token)
      
      navi('/lands')
    }catch(error){
      console.log(error.response);
    }
  }

  

  
  return (
    <div className="main-content">
			<div className="main-content-post">
				<h2>Update land</h2>
				<form onSubmit={handleSubmit} className="post-form">
					<div className="apartment-post-box">
                    <div className='first-input-box-post'>
                    <div className="input-box-post">
						<label htmlFor="">Address:</label>
						<input
							type="text"
							name="address"
							value={landData.address}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Price:</label>
						<input
							type="number"
							name="price"
							value={landData.price}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Description:</label>
						<input
							type="text"
							name="description"
							value={landData.description}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Land area:</label>
						<input
							type="number"
							name="area"
							value={landData.area}
							onChange={handleInputChange}
						/>
					</div>

                    </div>
                    <div className="second-input-box-post">

            


					<div className="input-box-post">
						<label htmlFor="">Type of land:</label>
						<select
							name="typeOfLand"
							value={landData.typeOfLand}
							onChange={handleInputChange}
							className="select"
						>
							<option value="">Select type of land</option>
							{Object.values(TypeOfLand).map((type, index) => (
								<option key={index} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>

					<div className="input-checkbox-group">
					<div className="input-box-post">
						<label htmlFor="duplex">Building permit:</label>
						<input
							type="checkbox"
							id="buildingPermit"
							name="buildingPermit"
							checked={landData.buildingPermit}
							onChange={handleCheckboxChange}
						/>
					</div>
					</div>


					

				
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

export default UpdateLand