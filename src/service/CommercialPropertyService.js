import axios from "axios";

class CommercialPropertyService {
	static BASE_URL = "http://localhost:8080/api/commercials";

	static async getAllCommercials(token, page, pageSize) {
		try {
			const response = await axios.get(
				`${CommercialPropertyService.BASE_URL}`,
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

	static async getCommercialPropertyById(token, id){
		try{
			const response = await axios.get(`${CommercialPropertyService.BASE_URL}/${id}`,
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

	static async addCommercialProperty (commercialData, token){
		try{
			const response = await axios.post(`${CommercialPropertyService.BASE_URL}`, commercialData, 
				{
					headers: {Authorization: `Bearer ${token}`}
				}
			)
			return response.data;
		}catch(error){
			console.log(error);
			throw error;
		}
	}

	static async updateCommercialProperty(id, commercialData, token){
		try{
			const response = await axios.put(`${CommercialPropertyService.BASE_URL}/update-commercial/${id}`, commercialData,
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

	static async deleteCommercialProperty(id, token){
		try{
			const respone = await axios.delete(`${CommercialPropertyService.BASE_URL}/delete-commercial/${id}`,
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
}

export default CommercialPropertyService;
