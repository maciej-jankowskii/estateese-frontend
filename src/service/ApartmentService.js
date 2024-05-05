import axios from 'axios';

class ApartmentService{
    static BASE_URL = "http://localhost:8080/apartment";


    static async getAllApartments(token, page, pageSize){
        try{
            const response = await axios.get(`${ApartmentService.BASE_URL}/getAll`, {
                headers: {Authorization: `Bearer ${token}`},
                params: {page, size: pageSize}
            })
            console.log(response);
            return response;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    static async getApartmentById(token, id){
        try{
            const respose = await axios.get(`${ApartmentService.BASE_URL}/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            return respose;
        }catch(error){
            console.log(error);
            throw error;
        }

    }

    static async addApartment(apartmentData, token){
        try{
            const response = await axios.post(`${ApartmentService.BASE_URL}`, apartmentData, {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        } catch(error){
            console.log(error);
            throw error;
        }
    }



}

export default ApartmentService;