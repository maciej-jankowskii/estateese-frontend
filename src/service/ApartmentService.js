import axios from "axios";

class ApartmentService {
	static BASE_URL = "http://localhost:8080/api/apartments";

	static async getAllApartments(token, page, pageSize) {
		try {
			const response = await axios.get(`${ApartmentService.BASE_URL}`, {
				headers: { Authorization: `Bearer ${token}` },
				params: { page, size: pageSize },
			});
			return response;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getApartmentById(token, id) {
		try {
			const respose = await axios.get(`${ApartmentService.BASE_URL}/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return respose;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async addApartment(apartmentData, token) {
		try {
			const response = await axios.post(
				`${ApartmentService.BASE_URL}`,
				apartmentData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (error.response && error.response.data) {
				throw error.response.data;
			} else {
				throw new Error("Adding the apartment failed. Please try again");
			}
		}
	}

	static async updateApartment(id, apartmentData, token) {
		try {
			const response = await axios.put(
				`${ApartmentService.BASE_URL}/update-apartment/${id}`,
				apartmentData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response;
		} catch (error) {
			if (error.response && error.response.data) {
				throw error.response.data;
			} else {
				throw new Error("Updating the apartment failed. Please try again");
			}
		}
	}

	static async deleteApartment(id, token) {
		try {
			const response = await axios.delete(
				`${ApartmentService.BASE_URL}/delete-apartment/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response;
		} catch (error) {
			if (error.response && error.response.status === 403) {
				throw new Error(error.response.data);
			} else {
				throw error;
			}
		}
	}
}

export default ApartmentService;
