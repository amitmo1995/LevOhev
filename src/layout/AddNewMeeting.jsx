import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import HomePageButton from '../features/HomePageButton'
import {where,doc,setDoc,getDoc, addDoc,add, collection,onSnapshot, query, getDocs} from 'firebase/firestore';
import Checkbox from '../features/Checkbox';


function AddNewPayment() {
	const dateRef=useRef();
	const apartmentRef=useRef();
	const amountRef=useRef();
	async function handleSubmit(){
		try{
			const building=JSON.parse(localStorage.getItem('userConnected')).data.building;
			await addDoc(collection(firestore,'monthly_payment'),{date :  dateRef.current.value , building : building , apartment : apartmentRef.current.value , amount : amountRef.current.value});			
		}catch{
			alert("error");
		}
	}
	
	return (
		<>
			<div className='wrapper'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
				<div className='formContainer'>
					<span className='formHeading'>הוספת פגישה </span>
						<div className='input-group'>
                            <i class="fa-regular fa-calendar-days"></i>
                            <input ref={dateRef} type ='date' placeholder='תאריך' required/><span className='bar'></span>
						</div>
						{/* Input 2 */}
							<div className='input-group'>
							<i class="fa-solid fa-square-plus"></i>
							<input ref={apartmentRef} type ="Topic" placeholder='נושא' />
							<span className='bar'></span>
						</div>
						<div className='input-group'> 
						</div>
						{/** */}
						{/* Input 1 */}
						<div className='input-group'>
						<button onClick={handleSubmit}>אישור</button>
						</div>

						{/* </form> */}
				</div>
			</div>
	
		</>
	)
 }
export default AddNewPayment;