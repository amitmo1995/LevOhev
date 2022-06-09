import React, { useRef, useState } from 'react';
import buildingImg from '../images/buildingImg.jpg';
import Option from '../features/Option';
import { Link , useParams } from 'react-router-dom';
import BackButton from '../features/BackButton';
import { addDoc, collection,updateDoc,doc} from 'firebase/firestore';
import {firestore} from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import HomePageButton from '../features/HomePageButton'

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


function UpdateBuildingTenantsPayment() {

	const params= useParams();
	let routBack="/FinancialManagement/"+params.building_id+"/"+params.building_name;

	const amountRef=useRef();
	const navigate=useNavigate();
	let bool=false;
	async function handleSubmit(){
        const buildingRef = doc(firestore,'building',params.building_id);
	
        try{
					// update field
					await updateDoc(buildingRef, {
						HOA_monthly_payment : amountRef.current.value
					});
                    alert("הסכום עודכן בהצלחה");
                }catch{
                    alert("הפעולה נכשלה");
                }
        navigate(-1);
	}



	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
			<h1>שינוי סכום תשלום וועד בית חודשי - ({GetBuilding()})</h1>
			<h1>הזן את סכום החדש</h1>
            <div className='Scholarship'>
                        <div className='input-group'>
							<input ref={amountRef} type ='text' placeholder='סכום'/>
							<span className='bar'></span>
						</div>
                <button className='ok' onClick={handleSubmit}><h2>אישור</h2></button>
            </div>
			<Link to={routBack} className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default UpdateBuildingTenantsPayment;
