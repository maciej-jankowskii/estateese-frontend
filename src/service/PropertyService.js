import axios from "axios";

class PropertyService {
    static BASE_URL = "http://localhost:8080/api/properties";

    static async getAllProperties (token, page, pageSize){
        try{
            const response = await axios.get(`${PropertyService.BASE_URL}`,
                {
                    headers: {Authorization: `Bearer ${token}`},
                    params: {page, size: pageSize}
                }
            )
            return response;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    static async searchProperties(token, keyword) {
        try {
            const response = await axios.get(`${PropertyService.BASE_URL}/search`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { keyword }
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    

  
}



export default PropertyService;