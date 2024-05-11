import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/common/LoginPage";
import HomeComponent from "./components/common/HomePage";
import Apartments from "./components/apartments/Apartments";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import RegisterPage from "./components/employee-register/RegisterPage";
import Clients from "./components/company-clients/Clients";
import ApartmentDetails from "./components/apartments/ApartmentDetails";
import Commercials from "./components/commercial/Commercials";
import Houses from "./components/houses/Houses";
import Lands from "./components/lands/Lands";
import AddLand from './components/lands/AddLand';
import Offers from "./components/offers/Offers";
import AddApartment from "./components/apartments/AddApartment";
import UpdateApartment from "./components/apartments/UpdateApartment";
import AddClient from "./components/company-clients/AddClient";
import ClientOffers from "./components/company-clients/ClientOffers";
import UpdateClient from "./components/company-clients/UpdateClient";
import AddCommercial from "./components/commercial/AddCommercial";
import CommercialDetails from "./components/commercial/CommercialDetails";
import UpdateCommercial from "./components/commercial/UpdateCommercial";
import AddHouse from "./components/houses/AddHouse";
import HouseDetails from "./components/houses/HouseDetails";
import UpdateHouse from "./components/houses/UpdateHouse";
import LandDetails from "./components/lands/LandDetails";
import UpdateLand from "./components/lands/UpdateLand";
import AddOffer from "./components/offers/AddOffer";
import UpdateOffer from "./components/offers/UpdateOffer";
import Reservations from "./components/reservation/Reservations";
import AddReservation from './components/reservation/AddReservation'
import UpdateReservation from "./components/reservation/UpdateReservation";

function App() {
	return (
		<BrowserRouter>
			<Navbar></Navbar>

			<Routes>
				<Route path="/" element={<LoginPage></LoginPage>}></Route>
				<Route path="/home/" element={<HomeComponent></HomeComponent>}></Route>

				<Route path="/apartments" element={<Apartments></Apartments>}></Route>
				<Route
					path="apartment/:id"
					element={<ApartmentDetails></ApartmentDetails>}
				></Route>
				<Route
					path="/add-apartment"
					element={<AddApartment></AddApartment>}
				></Route>
				<Route
					path="/update-apartment/:id"
					element={<UpdateApartment></UpdateApartment>}
				></Route>
				<Route path="/commercials" element={<Commercials></Commercials>}></Route>
				<Route path="/add-commercial" element={<AddCommercial></AddCommercial>}></Route>
				<Route
					path="commercial/:id"
					element={<CommercialDetails></CommercialDetails>}
				></Route>
				<Route
					path="/update-commercial/:id"
					element={<UpdateCommercial></UpdateCommercial>}
				></Route>
				<Route path="/houses" element={<Houses></Houses>}></Route>
				<Route path="/add-house" element={<AddHouse></AddHouse>}></Route>
				<Route path="/house/:id" element={<HouseDetails></HouseDetails>}> </Route>
				<Route path="/update-house/:id" element={<UpdateHouse></UpdateHouse>}></Route>
				<Route path="/lands" element={<Lands></Lands>}></Route>
				<Route path="/add-land" element={<AddLand></AddLand>}></Route>
				<Route path="/land/:id" element={<LandDetails></LandDetails>}></Route>
				<Route path="/update-land/:id" element={<UpdateLand></UpdateLand>}></Route>
				
				<Route path="/offers" element={<Offers></Offers>}></Route>
				<Route path="/add-offer" element={<AddOffer></AddOffer>}></Route>
				<Route path="/update-offer/:id" element={<UpdateOffer></UpdateOffer>}></Route>
				<Route path="/reservations" element={<Reservations></Reservations>}></Route>
				<Route path="/add-reservation" element={<AddReservation></AddReservation>}></Route>
				<Route path="/update-reservation/:id" element={<UpdateReservation></UpdateReservation>}></Route>
				<Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
				<Route path="/clients" element={<Clients></Clients>}></Route>
				<Route path="/add-client" element={<AddClient></AddClient>}></Route>
				<Route path="/offer/client/:id" element={<ClientOffers></ClientOffers>}></Route>
				<Route path="/update-client/:id" element={<UpdateClient></UpdateClient>}></Route>
	
			</Routes>

			<Footer></Footer>
		</BrowserRouter>
	);
}

export default App;
