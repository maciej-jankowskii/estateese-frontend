import axios from "axios";

class ReservationService{
    static BASE_URL = 'http://localhost:8080/api/reservations'


    static async getAllReservations(token, page, pageSize) {
		try {
			const response = await axios.get(
				`${ReservationService.BASE_URL}`,
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

	static async getReservationById(token, id){
		try{
			const response = await axios.get(`${ReservationService.BASE_URL}/${id}`,
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

	static async addReservation (reservationData, token){
		try{
			const response = await axios.post(`${ReservationService.BASE_URL}`, reservationData, 
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

	static async updateReservation(id, reservationData, token){
		try{
			const response = await axios.put(`${ReservationService.BASE_URL}/update-reservation/${id}`, reservationData,
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

	static async deleteReservation(id, token){
		try{
			const respone = await axios.delete(`${ReservationService.BASE_URL}/delete-reservation/${id}`,
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


export default ReservationService;