import './App.css';
import Home from './layout/Home';
import { BrowserRouter, Route, Routes, Link, Outlet} from'react-router-dom';
import LogIn from './layout/LogIn';
import ManagerHomePage from './layout/ManagerHomePage';
//import { Outlet } from "react-router-dom";



function App() {

	return (
	<BrowserRouter>
     <Routes>
       <Route path='/' element={<Home/>}>
         <Route index element={<LogIn />}></Route>
		 <Route path="/ManagerHomePage" element={<ManagerHomePage user="ראם" />} />
       </Route>
     </Routes>
    </BrowserRouter>
	);

}

export default App;
