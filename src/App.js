import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './layout/Home';
import ManagerHomePage from './layout/ManagerHomePage';
import ChooseBuilding from './layout/ChooseBuilding';
import Signup from './layout/Signup';

import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	Outlet,
} from 'react-router-dom';

function App() {
	return (
		<>
			{/* project header */}
			<Header />
			{/* project router */}
			<Router>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/ManagerHomePage' element={<ManagerHomePage />}></Route>
					<Route path='/ChooseBuilding' element={<ChooseBuilding />}></Route>
					<Route path='/Signup' element={<Signup />}></Route>
					<Route></Route>
				</Routes>
			</Router>
			{/* project footer */}
			<Footer />
		</>
	);
}

export default App;
