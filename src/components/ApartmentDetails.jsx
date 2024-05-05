import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApartmentService from '../service/ApartmentService';
import '../style/Apartment.css'
import { Link } from 'react-router-dom';

function ApartmentDetails() {


    const {id} = useParams();

    const [apartmentData, setApartmentData] = useState({
        address: '',
        price: '',
        description: '',
        area: '',
        rooms: '',
        bathrooms: '',
        duplexApartment: '',
        buildingType: '',
        floor: '',
        elevator: '',
        balcony: '',
        garage: '',
        yearOfConstruction: '',
        standard: ''
    })

    useEffect(()=>{
        fetchApartmentById(id);
    }, [id])

    const fetchApartmentById = async (id) =>{
        try{
            const token = localStorage.getItem('accessToken');
            console.log(token);
            const response = await ApartmentService.getApartmentById(token, id);
            const {address, price, description, area, rooms, bathrooms, duplexApartment, buildingType, floor, elevator, balcony, garage, yearOfConstruction, standard} = response.data;
            setApartmentData({address, price, description, area, rooms, bathrooms, duplexApartment, buildingType, floor, elevator, balcony, garage, yearOfConstruction, standard})
            console.log(response);
            console.log(response.data);
        } catch(error){
            console.log(error);
        }
    }




  return (
    <div className='apartment-container'>
        <div className="apartment-box">
            <h2>Apartment info</h2>
            <p>Address: {apartmentData.address}</p>
            <p>Price: {apartmentData.price}</p>
            <p>Description: {apartmentData.description}</p>
            <Link to='/apartments'>Back</Link>
        </div>
    </div>
  )
}

export default ApartmentDetails