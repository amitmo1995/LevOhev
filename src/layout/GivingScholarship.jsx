import React, { useRef, useState } from 'react';
import buildingImg from '../images/buildingImg.jpg';
import Option from '../features/Option';
import { Link , useParams } from 'react-router-dom';
import BackButton from '../features/BackButton';
import { addDoc, collection} from 'firebase/firestore';
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


function GivingScholarship() {

	const params= useParams();
	let routBack="/FinancialManagement/"+params.building_id+"/"+params.building_name;

	const amountRef=useRef();
	const navigate=useNavigate();
	let bool=false;
	function handleSubmit(){
		try{
			let today=new Date();
			let date=today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
			const building=JSON.parse(localStorage.getItem('userConnected')).data.building;
			addDoc(collection(firestore,'grant_payment'),{amount : amountRef.current.value , building : params.building_id , date : date});	
			bool=true;	
		}catch{
			alert("error");
		}finally{
			if(bool){
				navigate(-1);
			}
		}
	}



	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
			<h1>מתן מלגה לבניין - ({GetBuilding()})</h1>
			<h1>הזן את סכום המלגה</h1>
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

export default GivingScholarship;
