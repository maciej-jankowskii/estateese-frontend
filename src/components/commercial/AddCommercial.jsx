import { useState } from 'react'
import BuildingType from '../../const/BuildingType'
import TypeOfBusiness from '../../const/TypeOfBusiness';
import { useNavigate } from 'react-router-dom'
import '../../style/PostStyle.css';
import CommercialPropertyService from '../../service/CommercialPropertyService';

function AddCommercial() {

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

    const navi = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCommercialData({...commercialData, [name]: value})
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem('accessToken')
            await CommercialPropertyService.addCommercialProperty(commercialData, token);

            navi('/commercials')

        }catch(error){
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
						Add
					</button>
				</form>
			</div>
		</div>
    
  )
}

export default AddCommercial