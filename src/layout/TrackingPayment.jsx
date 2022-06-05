import React, { useEffect, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link , useParams } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where , collection , query, getDocs} from 'firebase/firestore';
//import {sortByDate} from '../features/sortByDate';
import HomePageButton from '../features/HomePageButton'

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
    let routBack="/FinancialManagement/"+params.building_id+"/"+params.building_name;

    const [loding,setLoding]=useState(true);
    const [children,setChildren]=useState(<div></div>);


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
        buildingExpens[doc.id]["reason"]="תשלום וועד דירה "+ buildingExpens[doc.id]["apartment"];
    });
    keys=Object.keys(buildingExpens);
    //sort the result by date
    keys.sort((key1,key2)=>{return sortByDate(buildingExpens[key1]["date"],buildingExpens[key2]["date"]);});
    //set the result in descending order
    keys.reverse();

    let temp=keys.map(key=>{
        return (
            <tr>
                 <td>{buildingExpens[key]["amount"]}</td>
                 <td>{buildingExpens[key]["date"].split("-").reverse().join("-")}</td>
                 <td>{buildingExpens[key]["reason"]}</td>
            </tr>
        );
      });
      setChildren(temp);
      setLoding(false);
}catch{
    console.log("error on apartment Query");
}
}

useEffect(()=>{getData();},[]);
//useEffect(()=>{},[children])

if(loding){
    return <h1>loding ... </h1>;
}



	return (
		<>
			<div className='tableData'>
            <Link to='/ManagerHomePage' className='link'><HomePageButton /></Link>
                <h1>מעקב תשלומי וועד בניין - ({GetBuilding()})</h1>
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