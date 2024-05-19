import axios from "axios";

class CreditService {
    static BASE_URL = "http://localhost:8080/api/credit/calculate"


    static async calculateLoanEligibility(creditData, token){
        try{
            const response = await axios.post(`${CreditService.BASE_URL}`, creditData, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
        } catch(error){
            if(error.response && error.response.data){
                throw error.response.data
            }else{
                throw new Error("Please try again")
            }
        }
    }
}

export default CreditService;