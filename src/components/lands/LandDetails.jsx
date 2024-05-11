import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import LandsService from '../../service/LandsService';

function LandDetails() {
  const  {id} = useParams();
  const [landData, setLandData] = useState({
    address: "",
		price: "",
		description: "",
    typeOfLand: "",
    area: "",
    buildingPermit: ""
  })
  

  useEffect(()=>{
    fetchLandById(id);
  },[id])

  const fetchLandById = async (id) => {
    try{
      const token = localStorage.getItem('accessToken');
      const response = await LandsService.getLandById(token, id);
      const {
        address, price, description, typeOfLand, area, buildingPermit
      } = response.data;
      setLandData({
        address, price, description, typeOfLand, area, buildingPermit
      })
    }catch(error){
      console.log(error);
    }
  }
  






  return (
    <div className="main-content">
			<div className="details-box">
				<h2>Details</h2>
				<p>Address: {landData.address}</p>
				<p>Price: {landData.price}</p>
				<p>Description: {landData.description}</p>
				<p>Type of land: {landData.typeOfLand}</p>
				<p>Area: {landData.area}</p>
				<p>Building permit: {landData.buildingPermit ? 'Yes' : 'No'}</p>
				<Link className="back-btn" to="/lands">Back</Link>
    
                
			</div>
		</div>
  )
}

export default LandDetails