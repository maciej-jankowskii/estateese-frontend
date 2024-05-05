import axios from "axios";

class ClientService{
    static BASE_URL = "http://localhost:8080/client";

    static async getAllClients(token){
        try{
            const response = await axios.get(`${ClientService.BASE_URL}/getAll`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log(response);
            return response;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

export default ClientService;