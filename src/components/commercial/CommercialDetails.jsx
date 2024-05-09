import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommercialPropertyService from '../../service/CommercialPropertyService';

function CommercialDetails() {
    const  {id} = useParams();
    const [commercialData, setCommercialData] = useState({
        address: "",
		price: "",
		description: "",
		area: "",
		rooms: "",
		bathrooms: "",
        buildingType: "",
        floor: "",
        typeOfBusiness: ''
    })

    useEffect(() => {
        fetchCommercialById(id);
    },[id])
    


    const fetchCommercialById = async(id) =>{
        try{
            const token = localStorage.getItem('accessToken');
            const response = await CommercialPropertyService.getCommercialPropertyById(token, id);

            const {
				address,
				price,
				description,
				area,
				rooms,
				bathrooms,
				buildingType,
				floor,
                typeOfBusiness,
			} = response.data;
            setCommercialData({
                address,price, description, area, rooms, bathrooms, buildingType,floor,typeOfBusiness
            })



        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className="main-content">
			<div className="details-box">
				<h2>Details</h2>
				<p>Address: {commercialData.address}</p>
				<p>Price: {commercialData.price}</p>
				<p>Description: {commercialData.description}</p>
				<p>Area: {commercialData.area}</p>
				<p>Rooms: {commercialData.rooms}</p>
				<p>Bathrooms: {commercialData.bathrooms}</p>
				<p>Type of building: {commercialData.buildingType}</p>
				<p>Floor: {commercialData.floor}</p>
				<p>Standard: {commercialData.typeOfBusiness}</p>
				<Link className="back-btn" to="/commercials">Back</Link>
                
			</div>
		</div>
    
  )
}

export default CommercialDetails