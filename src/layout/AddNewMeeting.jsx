import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where,doc,setDoc,getDoc, addDoc,add, collection,onSnapshot, query, getDocs} from 'firebase/firestore';

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
		<><div class = "AddNewMeeting">
			<div className='wrapper'>
				<div className='formContainer'>
					<span className='formHeading'>הוספת פגישה </span>
					{/* <form action=''> */}
						{/* Input 1 */}
						<div className='input-group'>
                            <i class="fa-regular fa-calendar-days"></i>
                            <input ref={dateRef} type ='date' placeholder='תאריך' required/><span className='bar'></span>
						</div>
						{/* Input 2 */}
							<div className='input-group'>
							{/* <i class='fa-solid fa-building'></i> */}
							{/* <i class="far fa-comment-dots"></i> */}
							<i class="fa-solid fa-square-plus"></i>
							<input ref={apartmentRef} type ="Topic" placeholder='נושא' />
							<span className='bar'></span>
						</div>
						<div className='input-group'>
                            {/* <i class="fa-regular fa-credit-card"></i> */}
							<i class="far fa-comment-dots"></i>
							<input ref={amountRef} type ='text'   placeholder='סיכום'/>
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

				<div className='formContainer'>
						{/* Input 1 */}
						<div className='input-building-group'>
							<table>
							<tr>
							<th><h3>מספר בניין</h3></th>
							<th><h3>סימון נוכחות</h3></th>
							</tr>
							<tr>
								<th>בניין 1</th>
								<th><input ref={amountRef} type="checkbox" id="building1" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 2</th>
								<th><input ref={amountRef} type="checkbox" id="building2" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 3</th>
								<th><input ref={amountRef} type="checkbox" id="building3" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 4</th>
								<th><input ref={amountRef} type="checkbox" id="building4" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 5</th>
								<th><input ref={amountRef} type="checkbox" id="building5" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 6</th>
								<th><input ref={amountRef} type="checkbox" id="building6" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 7</th>
								<th><input ref={amountRef} type="checkbox" id="building7" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 8</th>
								<th><input ref={amountRef} type="checkbox" id="building8" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 9</th>
								<th><input ref={amountRef} type="checkbox" id="building9" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 10</th>
								<th><input ref={amountRef} type="checkbox" id="building10" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 11</th>
								<th><input ref={amountRef} type="checkbox" id="building11" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 12</th>
								<th><input ref={amountRef} type="checkbox" id="building12" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 13</th>
								<th><input ref={amountRef} type="checkbox" id="building13" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 14</th>
								<th><input ref={amountRef} type="checkbox" id="building14" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 15</th>
								<th><input ref={amountRef} type="checkbox" id="building15" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 16</th>
								<th><input ref={amountRef} type="checkbox" id="building16" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 17</th>
								<th><input ref={amountRef} type="checkbox" id="building17" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							<tr>
								<th>בניין 18</th>
								<th><input ref={amountRef} type="checkbox" id="building18" name="building1" value="building1"></input> <label for="building1"></label></th>
							</tr>
							</table>
							<span className='bar'></span>
						</div>
				</div>
		</div>
		</>
	)
 }
export default AddNewPayment;