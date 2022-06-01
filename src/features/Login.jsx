import React, { useEffect, useRef, useState } from 'react';
import {auth,useAuth,signInWithEmailAndPassword,signOut, firestore} from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import { doc,getDoc} from "firebase/firestore";


function Login() {
	const emailRef=useRef();
    const passwordRef=useRef();
    const [loding , setLoding] = useState(false);
    const currentUser=useAuth();
	//outomatic logout when render the page
	useEffect(()=>{
		if(!loding&&!currentUser){
		    signOut(auth);
		}
	},[])

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
		if(userConnected){ 
			try{
				console.log(emailRef.current.value);
				const docId=emailRef.current.value;
				const docRef = doc(firestore,'users',docId);
				const docSnap =await getDoc(docRef);
				if(docSnap.exists()){
					let data={"id" : docSnap.id , "data" : docSnap.data()};
					console.log(data);
					localStorage.setItem("userConnected",JSON.stringify(data));
				
				
				
				if(data.data.permissions=="admin"){
					navigate("../ManagerHomePage");
				}
				else{
					let navTO="../HoaHomePage/"+data.data.building;
					navigate(navTO);
				}
				}else{
					console.log("no such document!");
				}
			}catch(e){
				console.log("error- ",e);
			}
		} 
		setLoding(false);
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
