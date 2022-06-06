import React , {Children, useEffect, useRef, useState} from 'react';
import BackButton from '../features/BackButton';
import Option from '../features/Option';
import { Link, useParams , useNavigate } from 'react-router-dom';
import AdultsImg from '../images/AdultsImg.jpg';
import DisabledImg from '../images/Disabled.jpg';
import ChildrenImg from '../images/Children.jpg';
import HomePageButton from '../features/HomePageButton';
import { LogoutButton } from '../features/LogoutButton';
import { firestore } from '../firebase/firebase';
import { collection, query, where , getDocs } from 'firebase/firestore';

function GetBuilding(){
	const param=useParams();
	let temp=param.building_name.split("");
	if(temp[1]=="A")
		temp[1]="א";
	else if(temp[1]=="B")
		temp[1]="ב";
	temp=temp.join(" ");
	return temp;
} 


function Mapping() {
	const navigate = useNavigate();
	const params = useParams();
	const [adults,setAdults]=useState("loding...");
	const [disabled,setDisabled]=useState("loding...");
	const [children,setChildren]=useState("loding...");

	let tenantsArr={};




	async function getData() {
		try {
			let collectionRef = collection(firestore, 'tenants');
			let Query = query(collectionRef,where("building","==",params.building_id));
			let snapshot = await getDocs(Query);
			snapshot.forEach(doc => {
				tenantsArr[doc.id] = doc.data();
			});
			let keys = Object.keys(tenantsArr);
			//accumulate the adult number
			setAdults('מבוגרים - '+keys.reduce((sum,currentKey)=>{
				let currNum;
				if(typeof(parseFloat(tenantsArr[currentKey]["old"]))!=typeof(parseFloat("1"))||tenantsArr[currentKey]["old"]=="")
				    currNum=0;
			    else{
					currNum=parseFloat(tenantsArr[currentKey]["old"]);
				}				    
				return sum+currNum;
			},0));
			//accumulate the disabled number
			setDisabled('נכים - '+keys.reduce((sum,currentKey)=>{
				let currNum;
				if(typeof(parseFloat(tenantsArr[currentKey]["disabled"]))!=typeof(parseFloat("1"))||tenantsArr[currentKey]["disabled"]=="")
				    currNum=0;
			    else{
					currNum=parseFloat(tenantsArr[currentKey]["disabled"]);
				}				    
				return sum+currNum;
			},0));
			//accumulate the young number
			setChildren('ילדים - '+keys.reduce((sum,currentKey)=>{
				let currNum;
				if(typeof(parseFloat(tenantsArr[currentKey]["young"]))!=typeof(parseFloat("1"))||tenantsArr[currentKey]["young"]=="")
				    currNum=0;
			    else{
					currNum=parseFloat(tenantsArr[currentKey]["young"]);
				}				    
				return sum+currNum;
			},0));
		} catch {
			console.log('queryError');
			alert("הפעולה נכשלה, אנא נסה/י שנית מאוחר יותר");
		    navigate(-1);
		}
	}
	useEffect(() => {
		getData();
	}, []);















	let routBack = '/BuildingOperation/' + params.building_id+"/"+params.building_name;
	const options = [
		<Option optionName={adults} imgAdd={AdultsImg} />,
		<Option optionName={disabled} imgAdd={DisabledImg} />,
		<Option optionName={children} imgAdd={ChildrenImg} />,
	];

	return (
		<div className='pageTemplate'>
			<Link to='/ManagerHomePage' className='link'>
				<HomePageButton />
			</Link>
			<Link to='/' className='link'>
				<LogoutButton />
			</Link>
			<h1> מיפוי בניין - ({GetBuilding()}) </h1>
			<div className='optionsContainer'>{options}</div>
			<Link to={routBack} className='link'>
				<BackButton />
			</Link>
		</div>
	);
}

export default Mapping;
