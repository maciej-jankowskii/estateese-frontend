import axios from "axios";

class OffersService {
	static BASE_URL = "http://localhost:8080/offer";

	static async getAllOffers(token) {
		try {
			const response = await axios.get(
				`${OffersService.BASE_URL}/getAll`,
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
export default OffersService;
