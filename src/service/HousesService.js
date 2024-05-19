import axios from "axios";

class HousesService {
	static BASE_URL = "http://localhost:8080/api/houses";

	static async getAllHouses(token, page, pageSize) {
		try {
			const response = await axios.get(`${HousesService.BASE_URL}`, {
				headers: { Authorization: `Bearer ${token}` },
				params: {page, size: pageSize}
			});
			return response;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getHouseById(token, id) {
		try {
			const response = await axios.get(`${HousesService.BASE_URL}/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async addHouse(houseData, token) {
		try {
			const response = await axios.post(
				`${HousesService.BASE_URL}`,
				houseData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if(error.response && error.response.data){
                throw error.response.data
            }else{
                throw new Error("Adding the house failed. Please try again")
            }
		}
	}

	static async updateHouse(id, houseData, token) {
		try {
			const response = await axios.put(
				`${HousesService.BASE_URL}/update-house/${id}`,
				houseData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			return response;
		} catch (error) {
			if(error.response && error.response.data){
                throw error.response.data
            }else{
                throw new Error("Adding the house failed. Please try again")
            }
		}
	}

	static async deleteHouse(id, token) {
		try {
			const respone = await axios.delete(
				`${HousesService.BASE_URL}/delete-house/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return respone;
		} catch (error) {
			if (error.response && error.response.status === 403) {
                throw new Error(error.response.data);
              } else {
                throw error;
              }
		}
	}
}
export default HousesService;
