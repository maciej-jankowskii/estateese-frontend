import axios from "axios";

class ClientService{
    static BASE_URL = "http://localhost:8080/api/clients";
    static URL_FOR_CLIENT_OFFER = "http://localhost:8080/api/offers/client"

    static async getAllClients(token, page,  pageSize){
        try{
            const response = await axios.get(`${ClientService.BASE_URL}`, {
                headers: {Authorization: `Bearer ${token}`},
                params: {page, size: pageSize}
            })
            return response;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    static async getOfferByClientId(token, id){
        try{
            const response = await axios.get(`${ClientService.URL_FOR_CLIENT_OFFER}/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log(response);
            return response;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    static async getClientById(token, id){
        try{
            const respose = await axios.get(`${ClientService.BASE_URL}/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            return respose;
        }catch(error){
            console.log(error);
            throw error;
        }

    }

    static async addClient(clientData, token){
        try{
            const response = await axios.post(`${ClientService.BASE_URL}`, clientData,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response;
        }catch(error){
            if(error.response && error.response.data){
                throw error.response.data
            }else{
                throw new Error("Adding the client failed. Please try again")
            }
        }
    }

    static async updateClient(id, clientData, token){
        try{
            const response = await axios.put(`${ClientService.BASE_URL}/update-client/${id}`, clientData, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response;
        }catch(error){
            if(error.response && error.response.data){
                throw error.response.data
            }else{
                throw new Error("Adding the client failed. Please try again")
            }
        }
    }

    static async deleteClient(id, token){
        try{
            const response = await axios.delete(`${ClientService.BASE_URL}/delete-client/${id}`, 
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
}

export default ClientService;