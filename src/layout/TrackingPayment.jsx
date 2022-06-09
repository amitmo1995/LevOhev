import React, { useEffect, useRef , useState } from 'react';
import BackButton from '../features/BackButton';
import { Link , useParams , useNavigate } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where , collection , query, getDocs , doc , getDoc } from 'firebase/firestore';
//import {sortByDate} from '../features/sortByDate';
import HomePageButton from '../features/HomePageButton'

//get two date elment in format "yyyy-mm-dd"
//#return if date_1 erlier return 1 if they equal return 0 else -1
let sortByDate=function(date_1,date_2){

    date_1=date_1.split('-');
    date_2=date_2.split('-');

    //compare year
    date_1[0]=parseInt(date_1[0]);
    date_2[0]=parseInt(date_2[0]);
    if( date_1[0]>date_2[0]){
        return 1;
    }else if(date_2[0]> date_1[0]){
        return -1;
    }

    //compare mounth
    date_1[1]=parseInt(date_1[1]);
    date_2[1]=parseInt(date_2[1]);
    if( date_1[1]>date_2[1]){
        return 1;
    }else if(date_2[1]> date_1[1]){
        return -1;
    }

    //compare day
    date_1[2]=parseInt(date_1[2]);
    date_2[2]=parseInt(date_2[2]);
    if( date_1[2]>date_2[2]){
        return 1;
    }else if(date_2[2]> date_1[2]){
        return -1;
    }
    return 0;
}
//parse the building name to hebrew
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

function TrackingPayment() {
    const params= useParams();
    const navigate = useNavigate();
    let routBack="/FinancialManagement/"+params.building_id+"/"+params.building_name;
    const apartmentRef=useRef("all");
    const [loding,setLoding]=useState(true);
    const [lodingDisplayAll,setLodingDisplayAll]=useState(true);
    const [children,setChildren]=useState(<div></div>);
    const [balance,setBalance]=useState("");
    const [data,setData]=useState();
    const [tenantData,setTenantData]=useState();
    const [hoaMonthlyPayment,setHoaMonthlyPayment]=useState();




    const getApartmentBalance= (apartmentNum)=>{
        //get the tenant enterance date
        let startOfDebt="";
        let currTenant=tenantData.filter(tenant=>tenant["apartment"]==apartmentNum); 
        if(currTenant)
            startOfDebt=currTenant[0]["StartOfDebt"];     
        keys=Object.keys(data);
        //get array of the current apartment 
        keys=keys.filter(key=>data[key]["apartment_num"]==apartmentNum&&data[key]["StartOfDebt"]==startOfDebt);
        if(!tenantData.some(tenant=>tenant["apartment"]==apartmentNum))            
            return "-";
            
        //get the total debt from the start date
        //get the current date
        let currentDate = new Date();
        let currMonth = currentDate.getMonth() + 1;
        let currYear = currentDate.getFullYear();
        let tempStarrtDebt=tenantData.filter(tenant=>tenant["apartment"]==apartmentNum);
        tempStarrtDebt=tempStarrtDebt[0]["StartOfDebt"].split("-");
        let mounthDebt=currYear-parseInt(tempStarrtDebt[0]);
        mounthDebt*=12;
        mounthDebt=mounthDebt+currMonth+1-parseInt(tempStarrtDebt[1])
        //set the DOM objebt to dislay sum of the payment
        return (keys.reduce((sum,currentKey)=>sum+parseFloat(data[currentKey]["amount"]),0)-mounthDebt*hoaMonthlyPayment).toFixed(2);

    }

    const displayAll = () => {
        keys=Object.keys(data);
                //sort the result by date
                keys.sort((key1,key2)=>{return sortByDate(data[key1]["date"],data[key2]["date"]);});
                //set the result in descending order
                keys.reverse();
    
                //set the DOM objebt to dislay all the payment
                let temp=keys.map(key=>{
                    return (
                        <tr>
                            <td>{data[key]["amount"]}</td>
                            <td>{data[key]["date"].split("-").reverse().join("-")}</td>
                            <td>{data[key]["reason"]}</td>
                      </tr>
                );
            });
            setChildren(temp);
            
            //set the DOM objebt to dislay sum of the payment
            let reduce=keys.reduce((sum,currentKey)=>sum+parseFloat(data[currentKey]["amount"]),0).toFixed(2);
            setBalance(reduce);
    
    }
    const displayApartment = (apartmentNum) => {
                //get the tenant enterance date
                let startOfDebt="";
                let currTenant=tenantData.filter(tenant=>tenant["apartment"]==apartmentNum); 
                if(currTenant)
                    startOfDebt=currTenant[0]["StartOfDebt"];
                let keys=Object.keys(data);
                //get array of the current apartment 
                keys=keys.filter(key=>data[key]["apartment_num"]==apartmentNum&&data[key]["StartOfDebt"]==startOfDebt);
                //sort the result by date
                keys.sort((key1,key2)=>{return sortByDate(data[key1]["date"],data[key2]["date"]);});
                //set the result in descending order
                keys.reverse();
    
                //set the DOM objebt to dislay all the payment
                let temp=keys.map(key=>{
                    return (
                        <tr>
                            <td>{data[key]["amount"]}</td>
                            <td>{data[key]["date"].split("-").reverse().join("-")}</td>
                            <td>{data[key]["reason"]}</td>
                      </tr>
                );
            });
            setChildren(temp);
            setBalance(getApartmentBalance(apartmentNum));
    
    }

    const displayData=() => {
        if(!lodingDisplayAll&&apartmentRef.current.value=="all")
               displayAll();
        else if (!loding&&apartmentRef.current.value!="all") 
            displayApartment(apartmentRef.current.value);        
    }







let buildingExpens={};
let keys="";

///let children=<div>ijdfoijoirfjo</div>;
async function getData(){   
///get buildingId from the url param 
let buildingId=params.building_id;
if(buildingId==undefined){
    buildingId=localStorage.getItem('userConnected').data.building;
}
//get the building expense
try{
    //get the apartment monthly payment
    let collectionRef=collection(firestore,'monthly_payment');
    let apartQuery= query(collectionRef,where("building","==",buildingId));
    let apartQurySnapshot= await getDocs(apartQuery);
    apartQurySnapshot.forEach(doc=>{
        buildingExpens[doc.id]=doc.data();
        buildingExpens[doc.id]["reason"]="תשלום וועד דירה "+ buildingExpens[doc.id]["apartment_num"];
    });
    setData(buildingExpens);
    setLodingDisplayAll(false);
    //get the tenant data
    collectionRef=collection(firestore,'tenants');
    apartQuery= query(collectionRef,where("building","==",buildingId));
    apartQurySnapshot= await getDocs(apartQuery);
    let tempTenant=[];
    apartQurySnapshot.forEach(doc=>{
        tempTenant.push(doc.data());             
    });
    setTenantData(tempTenant);


    //get the hoaMonthlyPayment
    const docRef = doc(firestore,'building',buildingId);
	apartQurySnapshot =await getDoc(docRef);
    let tempMounthlyPayment=0;
	if(apartQurySnapshot.exists()){
		tempMounthlyPayment=apartQurySnapshot.data()["HOA_monthly_payment"]?apartQurySnapshot.data()["HOA_monthly_payment"]:0;

        console.log(tempMounthlyPayment);
	}else{
		console.log("no such document!");
	}
    setHoaMonthlyPayment(tempMounthlyPayment);

    //get data comlete- display the data
    setLoding(false);
    
}catch(e){
    console.log("error on apartment Query");
    console.log(e);
    alert("משהו השתבש, אנא נסה/י שנית מאוחר יותר");
    navigate(-1);
  }
}

useEffect(()=>{getData();},[]);
useEffect(()=>{displayData();},[loding]);


if(loding){
    return <h1>loding ... </h1>;
}



	return (
		<>
			<div className='tableData'>
            <Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
            <select ref={apartmentRef} className='building' onChange={displayData}>
                            <option value='all'>כל הדירות</option>
                            <option value='1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
							<option value='4'>4</option>
							<option value='5'>5</option>
							<option value='6'>6</option>
							<option value='7'>7</option>
							<option value='8'>8</option>
							<option value='9' hidden>9</option>
							<option value='10'>10</option>
							<option value='11'>11</option>
							<option value='12'>12</option>
							<option value='13'>13</option>
							<option value='14'>14</option>
							<option value='15'>15</option>
							<option value='16'>16</option>
						</select>
                <h1>מעקב תשלומי וועד בניין - ({GetBuilding()})</h1>
                <table>
                    <thead>
                        <tr>
                            <th>סך הכל</th>
                        </tr>
                        <tr>
                        <th>{balance}</th>
                        </tr>
                </thead>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>סכום</th>
                            <th>תאריך</th>
                            <th>תיאור</th>
                        </tr>
                    </thead>
                    <tbody>
                    {children}
                    </tbody>
                </table>
                <Link to={routBack} className='link'>
                    <BackButton />
                </Link>
             </div>
		</>
	);
 }

export default TrackingPayment;