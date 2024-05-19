import axios from "axios";

class LandsService{
    static BASE_URL = "http://localhost:8080/api/lands"

    static async getAllLands(token, page, pageSize){
        try{
            const response = await axios.get(`${LandsService.BASE_URL}`, {
                headers: {Authorization: `Bearer ${token}`},
                params: {page, size:pageSize}
            })
        return response;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    static async getLandById(token, id) {
		try {
			const response = await axios.get(`${LandsService.BASE_URL}/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async addLand(landData, token) {
		try {
			const response = await axios.post(
				`${LandsService.BASE_URL}`,
				landData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if(error.response && error.response.data){
                throw error.response.data
            }else{
                throw new Error("Adding the land failed. Please try again")
            }
		}
	}

	static async updateLand(id, landData, token) {
		try {
			const response = await axios.put(
				`${LandsService.BASE_URL}/update-land/${id}`,
				landData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			return response;
		} catch (error) {
			if(error.response && error.response.data){
                throw error.response.data
            }else{
                throw new Error("Adding the land failed. Please try again")
            }
		}
	}

	static async deleteLand(id, token) {
		try {
			const respone = await axios.delete(
				`${LandsService.BASE_URL}/delete-land/${id}`,
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

export default LandsService;