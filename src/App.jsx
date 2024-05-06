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
import Offers from "./components/offers/Offers";
import AddApartment from "./components/apartments/AddApartment";
import UpdateApartment from "./components/apartments/UpdateApartment";

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
				<Route path="/commercial" element={<Commercials></Commercials>}></Route>
				<Route path="/houses" element={<Houses></Houses>}></Route>
				<Route path="/lands" element={<Lands></Lands>}></Route>
				<Route path="/offers" element={<Offers></Offers>}></Route>
				<Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
				<Route path="/clients" element={<Clients></Clients>}></Route>
			</Routes>

			<Footer></Footer>
		</BrowserRouter>
	);
}

export default App;
