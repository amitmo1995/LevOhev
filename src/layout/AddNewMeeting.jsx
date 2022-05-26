import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import HomePageButton from '../features/HomePageButton'
import {where,doc,setDoc,getDoc, addDoc,add, collection,onSnapshot, query, getDocs} from 'firebase/firestore';



function AddNewMeeting() {
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
		<div className='addNewMeeting'>
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
						<div className='input-building'>
							<h4>סימון נוכחות </h4> 
						<table>
							<tr>
							<th><h5> בניין 3א</h5></th>
							<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 3ב</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 4א</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 4ב</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 5</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 6</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
							<th><h5> בניין 7</h5></th>
							<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 8א</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 8ב</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 9א</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 9ב</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 10א</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
							<th><h5> בניין 10ב</h5></th>
							<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 11א</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 11ב</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 13א</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 13ב</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 15א</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
							<th><h5> בניין 15ב</h5></th>
							<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 17</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 18א</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 18ב</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 22א</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 22ב</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
							<th><h5> בניין 24א</h5></th>
							<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								<th><h5>בניין 24ב</h5></th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
								</tr>
						</table>
						</div>
						<div className='summary'>
						<h4>סיכום</h4> 
						<textarea   rows="7" cols="60"></textarea>
						</div>
						
						<div className='input-group'>
						<button onClick={handleSubmit}>אישור</button>
						</div>
						<Link to='/MeetingManagement' className='link'>
							<BackButton />
						</Link>
						{/* </form> */}
				</div>
			</div>
			</div>
		</>
	)
 }
export default AddNewMeeting;