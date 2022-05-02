import logo from './logo.svg';
import './App.css';
//import router
import { BrowserRouter, Route, Routes, Link, Outlet} from'react-router-dom';
import { Login } from './Login';
import { Home } from './Home';
import { User } from './User';



function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Home/>}>
         <Route index element={<Login />}/>
         <Route path='user/:userId' element={<User/>} />
       </Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
