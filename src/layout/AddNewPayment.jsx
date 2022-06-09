import React, { useRef, useState } from 'react';
//import BackButton from '../features/BackButton';
import { Link , useParams , useNavigate } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import HomePageButton from '../features/HomePageButton'
import {where, addDoc, collection, query, getDocs} from 'firebase/firestore';

function AddNewPayment() {
	const navigate = useNavigate();
	const params= useParams();
	let routToHomeGage="/HoaHomePage/"+params.building_id;
	const dateRef=useRef();
	const apartmentRef=useRef();
	const amountRef=useRef();

	async function handleSubmit(){

		let tanentExistId=false;
		let tenantEnterDate="";
		if(dateRef.current.value==""||apartmentRef.current.value==""||amountRef.current.value==""){
			alert("אנא מלא/י את כל השדות");
		}else{
			//check if the tenant exist
			try{
				console.log(params.building_id);
				const tenantsRef= collection(firestore,'tenants');
				const q= query(tenantsRef,where("building","==",params.building_id),where("apartment","==",apartmentRef.current.value));
				const qurySnapshot= await getDocs(q);
				qurySnapshot.forEach(doc=>{
					tanentExistId=doc.id;
					tenantEnterDate=doc.data()["StartOfDebt"];
				});
			}catch(e){
				console.log("error on neighborExistId- ",e);
				alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
			    navigate(-1);
			}
			//if the tenant exist- add the payment to the DB
			if(tanentExistId){
				try{
			        await addDoc(collection(firestore,'monthly_payment'),{date :  dateRef.current.value , building : params.building_id 
						, StartOfDebt : tenantEnterDate ,apartment_num : apartmentRef.current.value, amount : amountRef.current.value});	
					alert("תשלום בוצע בהצלחה");		
		        }catch{
			        alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
			        navigate(-1);
		        }
			}else{
				alert("לא קיים דייר בדירה שהזנת, אנא פנה/י לאחראי/ת להוספת הדייר או שנה/י את מספר הדירה");
			}


		}
		apartmentRef.current.value="";
		amountRef.current.value="";
		dateRef.current.value="";
		
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