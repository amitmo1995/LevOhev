import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './layout/Home';
import ManagerHomePage from './layout/ManagerHomePage';
import ChooseBuilding from './layout/ChooseBuilding';
import Signup from './layout/Signup';
import MeetingManagement from './layout/MeetingManagement';
import BuildingOperation from './layout/BuildingOperation';
import FinancialManagement from './layout/FinancialManagement';
import AppointmentNewHOA from './layout/AppointmentNewHOA';
import AddNewMeeting from './layout/AddNewMeeting';
import MeetingSummary from './layout/MeetingSummary';
import GivingScholarship from './layout/GivingScholarship';
import Query from './layout/Query';
import HoaHomePage from './layout/HoaHomePage';
import AddNewPayment from './layout/AddNewPayment';
import UpdateExpenses from './layout/UpdateExpenses';
import TrackIncomeExpenses from './layout/TrackIncomeExpenses';
import TrackMeeting from './layout/TrackMeeting';
import BuildingExpenses from './layout/BuildingExpenses';
import Mapping from './layout/Mapping';
import TrackingPayment from './layout/TrackingPayment';
import AddNeighbors from './layout/AddNeighbors';
import HoaTenantsPaymentTracking from './layout/HoaTenantsPaymentTracking';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			{/* project header */}
			{/* <Header /> */}
			{/* project router */}
			<Router>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/query' element={<Query />} />
					<Route path='/ManagerHomePage' element={<ManagerHomePage />}></Route>
					<Route path='/ChooseBuilding' element={<ChooseBuilding />}></Route>
					<Route
						path='/MeetingManagement'
						element={<MeetingManagement />}></Route>
					<Route
						path='/BuildingOperation'
						element={<BuildingOperation />}></Route>
					<Route
						path='/FinancialManagement'
						element={<FinancialManagement />}></Route>
					<Route
						path='/AppointmentNewHOA'
						element={<AppointmentNewHOA />}></Route>
					<Route path='/AddNewMeeting' element={<AddNewMeeting />}></Route>
					<Route path='/Signup' element={<Signup />}></Route>
					<Route path='/TrackMeeting' element={<TrackMeeting />}></Route>
					<Route path='/MeetingSummary' element={<MeetingSummary />}></Route>
					<Route
						path='/GivingScholarship'
						element={<GivingScholarship />}></Route>
					<Route
						path='/BuildingExpenses'
						element={<BuildingExpenses />}></Route>
					<Route path='/Mapping' element={<Mapping />}></Route>
					<Route path='/TrackingPayment' element={<TrackingPayment />}></Route>
					<Route path='/AddNeighbors' element={<AddNeighbors />}></Route>
					{/* HOA side website */}
					<Route path='/HoaHomePage' element={<HoaHomePage />}></Route>
					<Route path='/AddNewPayment' element={<AddNewPayment />}></Route>
					<Route path='/UpdateExpenses' element={<UpdateExpenses />}></Route>
					<Route
						path='/TrackIncomeExpenses'
						element={<TrackIncomeExpenses />}></Route>
					<Route
						path='/HoaTenantsPaymentTracking'
						element={<HoaTenantsPaymentTracking />}></Route>
				</Routes>
			</Router>
			{/* project footer */}
			<Footer />
		</>
	);
}

export default App;
