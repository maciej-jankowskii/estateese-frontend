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
import AddLand from "./components/lands/AddLand";
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
import Credit from "./components/credit/Credit";
import Notification from "./components/alerts/Notification";
import PrivateRoute from "./components/common/PrivateRoute";
import Properties from "./components/properties/Properties";

function App() {
	return (
		<BrowserRouter>
			<Notification />
			<Navbar />

			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/home/" element={<HomeComponent />} />

				<Route
					path="/apartments"
					element={<PrivateRoute element={<Apartments />} />}
				/>
				<Route
					path="/properties"
					element={<PrivateRoute element={<Properties/>} />}
				/>
				<Route
					path="apartment/:id"
					element={<PrivateRoute element={<ApartmentDetails />} />}
				/>
				<Route
					path="/add-apartment"
					element={<PrivateRoute element={<AddApartment />} />}
				/>
				<Route
					path="/update-apartment/:id"
					element={<PrivateRoute element={<UpdateApartment />} />}
				/>
				<Route
					path="/commercials"
					element={<PrivateRoute element={<Commercials />} />}
				/>
				<Route
					path="/add-commercial"
					element={<PrivateRoute element={<AddCommercial />} />}
				/>
				<Route
					path="commercial/:id"
					element={<PrivateRoute element={<CommercialDetails />} />}
				/>
				<Route
					path="/update-commercial/:id"
					element={<PrivateRoute element={<UpdateCommercial />} />}
				/>
				<Route path="/houses" element={<PrivateRoute element={<Houses />} />} />
				<Route
					path="/add-house"
					element={<PrivateRoute element={<AddHouse />} />}
				/>
				<Route
					path="/house/:id"
					element={<PrivateRoute element={<HouseDetails />} />}
				/>
				<Route
					path="/update-house/:id"
					element={<PrivateRoute element={<UpdateHouse />} />}
				/>
				<Route path="/lands" element={<PrivateRoute element={<Lands />} />} />
				<Route
					path="/add-land"
					element={<PrivateRoute element={<AddLand />} />}
				/>
				<Route
					path="/land/:id"
					element={<PrivateRoute element={<LandDetails />} />}
				/>
				<Route
					path="/update-land/:id"
					element={<PrivateRoute element={<UpdateLand />} />}
				/>
				<Route path="/offers" element={<PrivateRoute element={<Offers />} />} />
				<Route
					path="/add-offer"
					element={<PrivateRoute element={<AddOffer />} />}
				/>
				<Route
					path="/update-offer/:id"
					element={<PrivateRoute element={<UpdateOffer />} />}
				/>
				<Route
					path="/register"
					element={<PrivateRoute element={<RegisterPage />} />}
				/>
				<Route
					path="/clients"
					element={<PrivateRoute element={<Clients />} />}
				/>
				<Route
					path="/add-client"
					element={<PrivateRoute element={<AddClient />} />}
				/>
				<Route
					path="/offer/client/:id"
					element={<PrivateRoute element={<ClientOffers />} />}
				/>
				<Route
					path="/update-client/:id"
					element={<PrivateRoute element={<UpdateClient />} />}
				/>
				<Route path="/credit" element={<PrivateRoute element={<Credit />} />} />
			</Routes>

			<Footer />
		</BrowserRouter>
	);
}

export default App;
