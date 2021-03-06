import React , {useState , useEffect } from 'react';
import Option from '../features/Option';
import { Link , useParams} from 'react-router-dom';
import UpdateExpenses from '../images/UpdateExpenses.jpg';
import addPayment from '../images/addPayment.jpeg';
import TrackExpensesAndIncome from '../images/TrackExpensesAndIncome.jpg';
import PaymentTracking from '../images/PaymentTracking.jpg'
import { LogoutButton } from '../features/LogoutButton';
import {firestore} from '../firebase/firebase';
import {where, collection, query, getDocs} from 'firebase/firestore';
import { async } from '@firebase/util';

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
   //sort the result by date
	//keys.sort((key1,key2)=>{return sortByDate(buildingExpens[key1]["date"],buildingExpens[key2]["date"]);});

}catch{
	console.log("error on apartment id Query");
}

}



function HoaHomePage(props) {
	const params= useParams();
	//get the building balance
	const [balance,setBalance]=useState("");
	const [message,setMessage]=useState("");



let getMessage=async function(){
	try{
		const messageRef= collection(firestore,'message');
		const q= query(messageRef);
		const qurySnapshot= await getDocs(q);
		qurySnapshot.forEach(doc=>{
			setMessage(doc.data()["message"]);
			console.log(doc.data()["message"]);
		});
	}catch{
		console.log("error");
	}
	
}

	useEffect(()=>{getMessage()},[]);
	useEffect(()=>{getBuildingBalance(setBalance,params.building_id);},[]);


	//page routing
	let routToAddNewPayment="/AddNewPayment/"+params.building_id;
	let routToUpdateExpenses="/UpdateExpenses/"+params.building_id;
	let routToTrackIncomeExpenses="/TrackIncomeExpenses/"+params.building_id;
	let routToHoaTenantsPaymentTracking="/HoaTenantsPaymentTracking/"+params.building_id;

	


	const options = [
		<Link to={routToAddNewPayment} className='link'> <Option optionName='?????????? ?????????? ??????????' imgAdd={addPayment} /> </Link>,
		<Link to={routToUpdateExpenses} className='link'> <Option optionName='?????????? ?????????? ???????? ????????????' imgAdd={UpdateExpenses} /> </Link>,
		<Link to={routToTrackIncomeExpenses} className='link'> <Option optionName='???????? ????????????/????????????' imgAdd={TrackExpensesAndIncome}  /> </Link>,
		<Link to={routToHoaTenantsPaymentTracking} className='link'> <Option optionName='???????? ?????????? ???????? ??????' imgAdd={PaymentTracking}  /> </Link>
	];

	return (
		<div className='hoaHome'>
		<div className='pageTemplate'>
			<h1> {JSON.parse(localStorage.getItem("userConnected")).data.name} ????????</h1>



			<h1> ?????????? ???????? : {message}</h1>


            <h1>???????? : {balance} ??"??</h1>
			<div className='optionsContainer'>{options}</div>
			<Link to='/' className='link'>
				<LogoutButton />
			</Link>
		</div>
		</div>
	);
}

export default HoaHomePage;