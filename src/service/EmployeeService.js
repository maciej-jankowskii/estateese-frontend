import axios from "axios";
import { ESModulesRunner } from "vite/runtime";

class EmployeeService {

    static BASE_URL = "http://localhost:8080/api/employees";

    static async getAllEmployees (token, page, pageSize){
        try{
            const response = await axios.get(`${EmployeeService.BASE_URL}`,
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

}

export default EmployeeService;