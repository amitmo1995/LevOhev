import React, { useRef, useState } from 'react';
//import BackButton from '../features/BackButton';
import { Link , useParams} from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import HomePageButton from '../features/HomePageButton'
import {where, addDoc, collection, query, getDocs} from 'firebase/firestore';

function AddNewPayment() {
	const params= useParams();
	let routToHomeGage="/HoaHomePage/"+params.building_id;
	const dateRef=useRef();
	const apartmentRef=useRef();
	const amountRef=useRef();

	async function handleSubmit(){

		let tanentExistId=false;
		if(dateRef.current.value==""||apartmentRef.current.value==""||amountRef.current.value==""){
			alert("אנא מלא/י את כל השדות");
		}else{
			//check if the tenant exist
			try{
				const tenantsRef= collection(firestore,'tenants');
				const q= query(tenantsRef,where("building","==",params.buildingId),where("apartment","==",apartmentRef.current.value));
				const qurySnapshot= await getDocs(q);
				qurySnapshot.forEach(doc=>{
					tanentExistId=doc.id;
				});
			}catch(e){
				console.log("error on neighborExistId- ",e);
			}
			//if the tenant exist- add the payment to the DB
			if(tanentExistId){
				//query to get the apartment id
		        let apartmentId="";
		        const buildingId=params.building_id;
		        try{
			        const collectionRef=collection(firestore,'apartment');
			        const apartQuery= query(collectionRef,where("building","==",buildingId),where("aprt_num","==",apartmentRef.current.value));
			        const apartQurySnapshot= await getDocs(apartQuery);
			        apartQurySnapshot.forEach(doc=>{
				        apartmentId=doc.id;
			        });
		        }catch{
			        console.log("error on apartment id Query");
		        }

		        try{
			        await addDoc(collection(firestore,'monthly_payment'),{date :  dateRef.current.value , building : buildingId , apartment : apartmentId ,apartment_num : apartmentRef.current.value, amount : amountRef.current.value});			
		        }catch{
			        alert("error");
		        }
			}else{
				alert("לא קיים דייר בדירה שהזנת, אנא פנה/י לאחראי/ת להוספת הדייר או שנה/י את מספר הדירה");
			}

		}

		
	}

	return (
		<>
			<div className='wrapper'>
			<Link to={routToHomeGage} className='link'><HomePageButton /></Link>
				<div className='formContainer'>
					<span className='formHeading'>הוספת תשלום </span>
					{/* <form action=''> */}
						{/* Input 1 */}
						<div className='input-group'>
							<i class='fa-solid fa-building'></i>
							<input ref={apartmentRef} type ="number"   placeholder='מספר דירה ' max="18" min="1" />
							<span className='bar'></span>
						</div>
						{/* Input 2 */}
						<div className='input-group'>
                            <i class="fa-regular fa-calendar-days"></i>
                            <input ref={dateRef} type ='date'   placeholder='תאריך' required/>							<span className='bar'></span>
						</div>
						{/* Input 3 */}
						<div className='input-group'>
                            <i class="fa-regular fa-credit-card"></i>
							<input ref={amountRef} type ='number'   placeholder='סכום' min='1' required/>
							<span className='bar'></span>
						</div>
						{/* Input 1 */}
						<div className='input-group'>
						<button onClick={handleSubmit}>אישור</button>
						</div>
					
						{/* </form> */}
				</div>
			</div>
		</>
	);
 }

export default AddNewPayment;