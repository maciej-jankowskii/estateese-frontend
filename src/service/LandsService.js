import axios from "axios";

class LandsService{
    static BASE_URL = "http://localhost:8080/land"

    static async getAllLands(token){
        try{
            const response = await axios.get(`${LandsService.BASE_URL}/getAll`, {
                headers: {Authorization: `Bearer ${token}`}
            })
        return response;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

export default LandsService;