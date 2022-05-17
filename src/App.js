import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './layout/Home';
import ManagerHomePage from './layout/ManagerHomePage';
import ChooseBuilding from './layout/ChooseBuilding';
import Signup from './layout/Signup';
import MeetingManagement from  './layout/MeetingManagement';
import BuildingOperation from  './layout/BuildingOperation';
import FinancialManagement from './layout/FinancialManagement';
import AppointmentNewHOA from './layout/AppointmentNewHOA';
import AddNewMeeting from './layout/AddNewMeeting';


import Query from './layout/Query';


import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	Outlet,
} from 'react-router-dom';
import HoaHomePage from './layout/HoaHomePage';
import AddNewPayment from './layout/AddNewPayment';
import UpdateExpenses from './layout/UpdateExpenses';
import TrackIncomeExpenses from './layout/TrackIncomeExpenses';

function App() {
	return (
		<>
			{/* project header */}
			<Header />
			{/* project router */}
			<Router>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/query' element={<Query/>}/>
					<Route path='/ManagerHomePage' element={<ManagerHomePage />}></Route>
					<Route path='/ChooseBuilding' element={<ChooseBuilding />}></Route>
					<Route path='/MeetingManagement' element={<MeetingManagement />}></Route>
					<Route path='/BuildingOperation' element={<BuildingOperation />}></Route>
					<Route path='/FinancialManagement' element={<FinancialManagement />}></Route>
					<Route path='/AppointmentNewHOA' element={<AppointmentNewHOA />}></Route>
					<Route path='/AddNewMeeting' element={<AddNewMeeting />}></Route>
					<Route path='/Signup' element={<Signup />}></Route>

					{/* HOA side website */}
					<Route path='/HoaHomePage' element={<HoaHomePage/>}></Route>
					<Route path='/AddNewPayment' element={<AddNewPayment/>}></Route>
					<Route path='/UpdateExpenses' element={<UpdateExpenses/>}></Route>
					<Route path='/TrackIncomeExpenses' element={<TrackIncomeExpenses/>}></Route>
					
				</Routes>
			</Router>
			{/* project footer */}
			<Footer />
		</>
	);
}

export default App;
