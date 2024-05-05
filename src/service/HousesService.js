import axios from "axios";

class HousesService{
    static BASE_URL = "http://localhost:8080/house"

    static async getAllHouses(token) {
        try{
            const response = await axios.get(`${HousesService.BASE_URL}/getAll`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response;

    } catch(error){
        console.log(error);
        throw error;
    }
}
}export default HousesService;