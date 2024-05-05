import axios from "axios";

class CommercialPropertyService {
	static BASE_URL = "http://localhost:8080/commercial";

	static async getAllCommercials(token) {
		try {
			const response = await axios.get(
				`${CommercialPropertyService.BASE_URL}/getAll`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

export default CommercialPropertyService;
