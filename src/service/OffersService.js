import axios from "axios";

class OffersService {
	static BASE_URL = "http://localhost:8080/api/offers";

	static async getAllOffers(token, page, pageSize) {
		try {
			const response = await axios.get(
				`${OffersService.BASE_URL}`,
				{
					headers: { Authorization: `Bearer ${token}` },
					params: {page, size: pageSize}
				}
			);
			return response;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getOfferById(token, id){
		try{
			const response = await axios.get(`${OffersService.BASE_URL}/${id}`,
				{
					headers: {Authorization: `Bearer ${token}`}
				}
			)
			return response;
		}catch(error){
			console.log(error);
			throw error;
		}
	}

	static async addOffer (offerData, token){
		try{
			const response = await axios.post(`${OffersService.BASE_URL}`, offerData, 
				{
					headers: {Authorization: `Bearer ${token}`}
				}
			)
			return response.data;
		}catch(error){
			if(error.response && error.response.data){
                throw error.response.data
            }else{
                throw new Error("Adding the offer failed. Please try again")
            }
		}
	}

	static async updateOffer(id, offerData, token){
		try{
			const response = await axios.put(`${OffersService.BASE_URL}/update-offer/${id}`, offerData,
				{
					headers: {Authorization: `Bearer ${token}`}
				}
			)

			return response;
		}catch(error){
			if(error.response && error.response.data){
                throw error.response.data
            }else{
                throw new Error("Adding the offer failed. Please try again")
            }
		}
	}

	static async deleteOffer(id, token){
		try{
			const respone = await axios.delete(`${OffersService.BASE_URL}/delete-offer/${id}`,
				{
					headers: {Authorization: `Bearer ${token}`}
				}
			)
			return respone;
		}catch(error){
			console.log(error);
			throw error;
		}
	}

	static async markOfferAsSold(id, token){
		try{
			const response = await axios.patch(`${OffersService.BASE_URL}/sold/${id}`, null,
				{
					headers: {Authorization: `Bearer ${token}`}
				}
			)
			return response;
		}catch(error){
			console.log(error);
			throw error;
		}
	}
}
export default OffersService;
