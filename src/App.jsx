import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import HomeComponent from "./components/HomePage";
import Apartments from "./components/Apartments";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterPage from "./components/RegisterPage";
import Clients from "./components/Clients";
import ApartmentDetails from "./components/ApartmentDetails";
import Commercials from "./components/Commercials";
import Houses from "./components/Houses";
import Lands from "./components/Lands";
import Offers from "./components/Offers";

function App() {
	return (
		<BrowserRouter>
			<Navbar></Navbar>

			<Routes>
				<Route path="/" element={<LoginPage></LoginPage>}></Route>
				<Route path="/home/" element={<HomeComponent></HomeComponent>}></Route>

				<Route path="/apartments" element={<Apartments></Apartments>}></Route>
				<Route path="apartment/:id" element={<ApartmentDetails></ApartmentDetails>}></Route>
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
