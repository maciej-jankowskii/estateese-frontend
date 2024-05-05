import axios from 'axios';

class AuthService{
    static BASE_URL = "http://localhost:8080/api/auth";

    static async login(email, password){
        try{
            const response = await axios.post(`${AuthService.BASE_URL}/login`, {email, password})
            console.log(response.data);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }

    static async register(userData, token){
        try{
            const response = await axios.post(`${AuthService.BASE_URL}/register`, userData, {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        } catch(error){
            console.log(error);
            throw error;
        }
    }

    static logout(){
        localStorage.removeItem('accessToken')
        
    }

    static isAuthenticated(){
        const token = localStorage.getItem('accessToken')
        return !!token
    }
}

export default AuthService;