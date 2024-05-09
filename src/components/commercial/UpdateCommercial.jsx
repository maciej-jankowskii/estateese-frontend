import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommercialPropertyService from '../../service/CommercialPropertyService';
import BuildingType from '../../const/BuildingType'
import TypeOfBusiness from '../../const/TypeOfBusiness';

function UpdateCommercial() {
    const {id} = useParams();
    const navi = useNavigate();

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

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCommercialData((prevCommercialData) => ({
            ...prevCommercialData, [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem('accessToken');
            const response = await CommercialPropertyService.updateCommercialProperty(id, commercialData, token);
            navi('/commercials')
        } catch(error){
            console.log(error);
        }
    }





  return (
    <div className="main-content">
			<div className="main-content-post">
				<h2>Add commercial property</h2>
				<form onSubmit={handleSubmit} className="post-form">
					<div className="apartment-post-box">
                    <div className='first-input-box-post'>
                    <div className="input-box-post">
						<label htmlFor="">Address:</label>
						<input
							type="text"
							name="address"
							value={commercialData.address}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Price:</label>
						<input
							type="number"
							name="price"
							value={commercialData.price}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Description:</label>
						<input
							type="text"
							name="description"
							value={commercialData.description}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Area:</label>
						<input
							type="number"
							name="area"
							value={commercialData.area}
							onChange={handleInputChange}
						/>
					</div>

					<div className="input-box-post">
						<label htmlFor="">Rooms:</label>
						<input
							type="number"
							name="rooms"
							value={commercialData.rooms}
							onChange={handleInputChange}
						/>
					</div>

					<div className="input-box-post">
						<label htmlFor="">Bathrooms:</label>
						<input
							type="number"
							name="bathrooms"
							value={commercialData.bathrooms}
							onChange={handleInputChange}
						/>
					</div>
                    </div>
                    <div className="second-input-box-post">

					<div className="input-box-post">
						<label htmlFor="">Floor:</label>
						<input
							type="number"
							name="floor"
							value={commercialData.floor}
							onChange={handleInputChange}
						/>
					</div>


					<div className="input-box-post">
						<label htmlFor="">Type of building:</label>
						<select
							name="buildingType"
							value={commercialData.buildingType}
							onChange={handleInputChange}
							className="select"
						>
							<option value="">Select building type</option>
							{Object.values(BuildingType).map((type, index) => (
								<option key={index} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>

					<div className="input-box-post">
						<label htmlFor="">Type of Business:</label>
						<select
							name="typeOfBusiness"
							value={commercialData.typeOfBusiness}
							onChange={handleInputChange}
							className="select"
						>
							<option value="">Select standard</option>
							{Object.values(TypeOfBusiness).map((std, index) => (
								<option key={index} value={std}>
									{std}
								</option>
							))}
						</select>
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

export default UpdateCommercial