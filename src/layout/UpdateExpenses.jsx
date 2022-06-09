import React, { useRef, useState } from 'react';
import { Link , useParams , useNavigate } from 'react-router-dom';
import { addDoc , collection } from 'firebase/firestore';
import {firestore} from '../firebase/firebase'
import HomePageButton from '../features/HomePageButton'


function UpdateExpenses() {
	const navigate = useNavigate();
	const params= useParams();
	let routToHomeGage="/HoaHomePage/"+params.building_id;
	const dateRef=useRef();
	const reasonRef=useRef();
	const amountRef=useRef();

	async function handleSubmit(){
		try{
			await addDoc(collection(firestore,'HOA_expense'),{date :  dateRef.current.value , building : params.building_id , reason : reasonRef.current.value , amount : amountRef.current.value});
			alert("התשלום נוסף בהצלחה");
			//navigate(-1);
		}catch{
			alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
			navigate(-1);
		}
		dateRef.current.value="";
	    reasonRef.current.value="";
	    amountRef.current.value="";
	}

	return (
		<>
			<div className='wrapper'>
			<Link to='/HoaHomePage' className='link'>
					<HomePageButton />
				</Link>
			<Link to={routToHomeGage} className='link'><HomePageButton /></Link>
				<div className='formContainer'>
					<span className='formHeading'> הוצאה חדשה</span>
					{/* <form action=''> */}
					<div className='form'>
						{/* Input 1 */}
						<div className='input-group'>
							<i class='fa-regular fa-calendar-days'></i>
							<input ref={dateRef} type='date' placeholder='תאריך' />
							<span className='bar'></span>
						</div>
						{/* Input 2 */}
						<div className='input-group'>
							<i class='fa-regular fa-credit-card'></i>
							<input
								ref={amountRef}
								type='number'
								placeholder='סכום'
								min={1}
								required
							/>{' '}
							<span className='bar'></span>
						</div>
						{/* Input 3 */}
						<div className='input-group'>
							<i class='fa-regular fa-comment'></i>
							<input ref={reasonRef} type='text' placeholder='הערות' required />
							<span className='bar'></span>
						</div>
						{/* Input 1 */}
						<div className='input-group'>
							<button onClick={handleSubmit}>אישור</button>
						</div>
					</div>
					{/* </form> */}
				</div>
			</div>
		</>
	);
}

export default UpdateExpenses;
