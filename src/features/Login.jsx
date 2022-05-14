import React, { useRef, useState } from 'react';
import {auth,useAuth,signInWithEmailAndPassword, firestore} from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import { collection,setDoc,doc,getDoc,getDocs, onSnapshot } from "firebase/firestore";


function Login() {
	const emailRef=useRef();
    const passwordRef=useRef();
    const [loding , setLoding] = useState(false);
    const currentUser=useAuth();

	//creat a "useNvigate" to route to dashBoard page after logged in
	const navigate = useNavigate();
	let userConnected=false;
	let userEmail;
	async function handleLogin() {
		console.log("connecting...");
		setLoding(true);
        try{
            await signInWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value);
			userEmail=emailRef.current.value;
			userConnected=true;
        }catch{
            alert("error");
			userConnected=false;
        }
        setLoding(false);
		if(userConnected){ 
			onSnapshot(collection(firestore,'users'),(snapshot)=>{
				var usersArr=snapshot.docs.map(doc=>{return {id : doc.id , data : doc.data()}});
				let ind=-1;
				for(let i=0;i<usersArr.length;i++){
					if(usersArr[i].id==userEmail){
						ind=i;
						break;
					}
				}
				localStorage.setItem("userConnected",JSON.stringify(usersArr[ind]));
				if(usersArr[ind].data.permissions=="admin"){
					navigate("../ManagerHomePage");
				}
				else{
					navigate("../AppointmentNewHOA");
				}
			});
		} 
    }





	return (
		<div className='login-container'>
			<div className='login-box'>
				<div className='left'></div>
				<div className='right'>
					<h1>ברוכים הבאים</h1>
					<br />
					<input ref={emailRef} type='text' className='field' placeholder='אימייל' />
					<input ref={passwordRef} type='password' className='field' placeholder='סיסמא' />
					<button disabled={loding|| currentUser} onClick={handleLogin} className='login-btn'>התחבר</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
