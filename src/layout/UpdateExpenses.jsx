import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import {doc,setDoc,getDoc, addDoc,add, collection,onSnapshot} from 'firebase/firestore';
import {firestore} from '../firebase/firebase'

function UpdateExpenses() {
	const dateRef=useRef();
	const reasonRef=useRef();
	const amountRef=useRef();

	async function handleSubmit(){
		try{
			const building=JSON.parse(localStorage.getItem('userConnected')).data.building;
			await addDoc(collection(firestore,'HOA_expense'),{date :  dateRef.current.value , building : building , reason : reasonRef.current.value , amount : amountRef.current.value});			
		}catch{
			alert("error");
		}
	}
	



	return (
		<>
			<div className='wrapper'>
				<div className='formContainer'>
					<span className='formHeading'> הוצאה חדשה</span>
					{/* <form action=''> */}
						{/* Input 1 */}
						<div className='input-group'>
							<i class='fa-regular fa-calendar-days'></i>
							<input ref={dateRef} type ="date" placeholder='תאריך' />
							<span className='bar'></span>
						</div>
						{/* Input 2 */}
						<div className='input-group'>
                            <i class="fa-regular fa-credit-card"></i>
                            <input ref={amountRef} type ='number' placeholder='סכום' min={1} required/>							<span className='bar'></span>
						</div>
						{/* Input 3 */}
						<div className='input-group'>
                            <i class="fa-regular fa-comment"></i>
							<input ref={reasonRef} type ='text'   placeholder='הערות'  required/>
							<span className='bar'></span>
						</div>
						{/* Input 1 */}
						<div className='input-group'>
						<button onClick={handleSubmit}>אישור</button>
						</div>
						<Link to='/HoaHomePage' className='link'>
							<BackButton />
						</Link>
						{/* </form> */}
				</div>
			</div>
		</>
	);
 }

export default UpdateExpenses;