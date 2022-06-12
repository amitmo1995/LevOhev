import React, { useEffect, useState } from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link , useNavigate, useParams } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where, collection, query, getDocs} from 'firebase/firestore';
import DepositTrackGraphImg from '../images/DepositTrackGraphImg.jpg'
import ScholarshipPayment from '../images/ScholarshipPayment.jpg'
import UpdateBuildingTenantsPayment from '../images/UpdateBuildingTenantsPayment.jpg'
import financeImg from '../images/financeImg.jpg'
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


	//the function return get the buildung balance
	//param:
	//setBalance-function to set the balance
	//buildingId-id of the building
	
	let getBuildingBalance=async function(setBalance,buildingId){
		


		let buildingExpens={};
    let keys="";

    //get the building expense
    try{
        //get the apartment monthly payment
        let collectionRef=collection(firestore,'monthly_payment');
        let apartQuery= query(collectionRef,where("building","==",buildingId));
        let apartQurySnapshot= await getDocs(apartQuery);
        apartQurySnapshot.forEach(doc=>{
            buildingExpens[doc.id]=parseFloat(doc.data().amount);
        });

        //get the apartment HOA expanse
        collectionRef=collection(firestore,'HOA_expense');
        apartQuery= query(collectionRef,where("building","==",buildingId));
        apartQurySnapshot= await getDocs(apartQuery);
        apartQurySnapshot.forEach(doc=>{
            //add negative sign to the expense
            buildingExpens[doc.id]=(-parseFloat(doc.data().amount));
        });
        //get the grant payment
        collectionRef=collection(firestore,'grant_payment');
        apartQuery= query(collectionRef,where("building","==",buildingId));
        apartQurySnapshot= await getDocs(apartQuery);
        apartQurySnapshot.forEach(doc=>{
            buildingExpens[doc.id]=parseFloat(doc.data().amount);
        });


       keys=Object.keys(buildingExpens);
	   let temp=keys.reduce((sum,currentKey)=>sum+buildingExpens[currentKey],0).toFixed(2);
	   setBalance(temp); 

	}catch{
        console.log("error on apartment id Query");
		alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
    }

	}
	


function FinancialManagement
() {

	const params= useParams();
	const [balance,setBalance]=useState("");
	useEffect(()=>{getBuildingBalance(setBalance,params.building_id);},[]);
    //the page routing
	let routToTrackingPayment="/TrackingPayment/"+params.building_id+"/"+params.building_name;
	let routToBuildingExpenses="/BuildingExpenses/"+params.building_id+"/"+params.building_name;
	let routToGivingScholarship="/GivingScholarship/"+params.building_id+"/"+params.building_name;
	let routToUpdateBuildingTenantsPayment="/UpdateBuildingTenantsPayment/"+params.building_id+"/"+params.building_name;
	let routBack="/BuildingOperation/"+params.building_id+"/"+params.building_name;



	const options = [
		<Link to={routToTrackingPayment} className='link'> <Option optionName='מעקב תשלומי וועד' imgAdd={financeImg} /></Link>,
		<Link to={routToBuildingExpenses} className='link'>	<Option optionName='מעקב הוצאות/הכנסות' imgAdd={DepositTrackGraphImg} /></Link>,
		<Link to={routToGivingScholarship} className='link'>	<Option optionName='מתן מלגה' imgAdd={ScholarshipPayment} /></Link>,
		<Link to={routToUpdateBuildingTenantsPayment} className='link'>	<Option optionName='עדכון סכום וועד בית חודשי' imgAdd={UpdateBuildingTenantsPayment} /></Link>
	];

	return (
		<div className='financialManagement'>
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
            <h1>ניהול כלכלי של ועד הבית בניין - ({GetBuilding()})</h1>
			<h1>יתרה : {balance} שח</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to={routBack} className='link'>
				<BackButton />
			</Link>
			</div>
		</div>
	);
}

export default FinancialManagement;