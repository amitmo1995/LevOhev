import React, { useRef } from 'react';
import BackButton from '../features/BackButton';
import { Link , useParams , useNavigate } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {doc,getDoc, addDoc,updateDoc,query,where,getDocs, collection} from 'firebase/firestore';
import HomePageButton from '../features/HomePageButton'

//return the buildind mane and parse the building enterace if exist
function GetBuilding(){
	const param=useParams();
	let temp=param.building_name.split(" ");
	if(temp[1]=="A")
		temp[1]="א";
	else if(temp[1]=="B")
		temp[1]="ב";
	temp=temp.join(" ");
	return temp;
} 

function AddNeighbors() {

	const params= useParams();
	let routBack="/BuildingOperation/"+params.building_id+"/"+params.building_name;
	const navigate = useNavigate();
	const apartmentRef=useRef();
	const StartDebtRef=useRef();
	const familyRef=useRef();
	const youngRef=useRef();
	const oldRef=useRef();
	const disabledRef=useRef();
	const hebrewSpeakerRef=useRef();
	const mainLanguage=useRef();



	async function handleSubmit(){
		if(apartmentRef.current.value==""||familyRef.current.value==""||StartDebtRef.current.value==""){
			alert("השדות שם משפחה, מספר דירה ותאריך לתחילת חיוב הם שדות חובה ")
		}else{
			try{
				let neighborExistId=false;
				const buildingId=params.building_id;
	
	
				let buildingNum="-";
				//get the building info from DB
				const docRef = doc(firestore,'building',buildingId);
				const docSnap =await getDoc(docRef);
				if(docSnap.exists()){
					let temp=docSnap.data();
					buildingNum=temp["building_num"];
					//parse the building enterace if exist
					if(temp["entrance"]!="")
						if(temp["entrance"]=="A")
							buildingNum+=" א";
						else
							buildingNum+=" ב";
				}else{
					console.log("no such document!");
					alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
					navigate(-1);
				}
	
				//check if the Neighbors already exist
				try{
					const tenantsRef= collection(firestore,'tenants');
					const q= query(tenantsRef,where("building","==",buildingId),where("apartment","==",apartmentRef.current.value));
					const qurySnapshot= await getDocs(q);
					qurySnapshot.forEach(doc=>{
						neighborExistId=doc.id;
					});
				}catch{
					console.log("error on neighborExistId");
					alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
					navigate(-1);
				}
	
				//if there is exist neighbor update field
				if(neighborExistId){
					const tenantsRef = doc(firestore,'tenants', neighborExistId);
	
					// update field
					await updateDoc(tenantsRef, {
						family_name : familyRef.current.value , young : youngRef.current.value 
						, StartOfDebt:StartDebtRef.current.value , old : oldRef.current.value , disabled : disabledRef.current.value
					});
	
	
				}
				else {
					//add the neighbors to the DB
					await addDoc(collection(firestore,'tenants'),{building : buildingId, building_num : buildingNum , apartment : apartmentRef.current.value , family_name : familyRef.current.value
						, StartOfDebt:StartDebtRef.current.value, young : youngRef.current.value , old : oldRef.current.value , disabled : disabledRef.current.value , hebrewSpeaker : hebrewSpeakerRef.current.value ,
						mainLanguage : mainLanguage.current.value});
				}
	
	
				//send massege to the user and clear the field
				alert("הדייר נוסף בהצלחה!!");
				familyRef.current.value="";
				apartmentRef.current.value="";
				youngRef.current.value="";
				oldRef.current.value="";
				disabledRef.current.value="";
				StartDebtRef.current.value="";
				hebrewSpeakerRef.current.value="";
				mainLanguage.current.value="";
	
	
	
						}catch(e){
							alert(e);
				alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
					navigate(-1);
			}
		}
		
	}


	return (
		<>
		<div className='addNeighbors'>
			<div className='wrapper'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
				<div className='formContainer'>
					<span className='formHeading'>הוספת דייר לבניין - ({GetBuilding()})</span>
						<div className='input-group'>
                        <i class="fa-solid fa-people-roof"></i>
							<input  placeholder='שם משפחה' type='text' ref={familyRef} required/>
							<span className='bar'></span>
						</div>
						<div className='input-group'>
                        <i class="fa-solid fa-house"></i>							<input
								type='number'
								placeholder=' מספר דירה'
								required
								min={1}
								ref={apartmentRef}
							/>
							<span className='bar'></span>
						</div>
						<div className='input-group'>
                            <i class="fa-regular fa-calendar-days"></i>
                            <input ref={StartDebtRef} type ='date'  title='תאריך לחיוב ראשון לוועד בית' placeholder='תאריך לחיוב ראשון לוועד בית' required/>
							<span className='bar'></span>
						</div>
                        <div className='input-group'>
                            <i class="fa-solid fa-children"></i>
							<input
								type='number'
								placeholder='מספר נפשות מתחת לגיל 18'
								required
								min={1}
								ref={youngRef}
							/>
							<span className='bar'></span>
						</div>
                        <div className='input-group'>
                            <i class="fa-solid fa-users"></i>
							<input
								type='number'
								placeholder='מספר נפשות מעל גיל 18'
								required
								min={1}
								ref={oldRef}
							/>
							<span className='bar'></span>
						</div>
                        <div className='input-group'>
                            <i class="fa-solid fa-file-medical"></i>
							<input
								type='number'
								placeholder='מספר נפשות עם בעיות רפואיות (אם קיים..)'
								required
								min={1}
								ref={disabledRef}
							/>
							<span className='bar'></span>
						</div>
						<div className='input-group'>
                            <i class="fa-solid fa-file-medical"></i>
							<input
								type='number'
								placeholder='מספר נפשות דוברי עברית'
								required
								min={1}
								ref={hebrewSpeakerRef}
							/>
							<span className='bar'></span>
						</div>
						<div className='input-group'>
                        <i class="fa-solid fa-people-roof"></i>
							<input  placeholder='שפת אם' type='text' ref={mainLanguage} required/>
							<span className='bar'></span>
						</div>
                        
						<div className='input-group'>
						<button onClick={handleSubmit}>אישור</button>
						</div>
                        <Link to={routBack} className='link'>
							<BackButton />
						</Link>
				</div>
			</div>
			</div>
		</>
	);
}
export default AddNeighbors;
