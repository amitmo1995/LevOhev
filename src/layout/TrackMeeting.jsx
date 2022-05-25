import React, { useEffect, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import {firestore} from '../firebase/firebase';
import {where,doc,setDoc,getDoc, addDoc,add, collection,onSnapshot, query, getDocs} from 'firebase/firestore';
import { async } from '@firebase/util';
import HomePageButton from '../features/HomePageButton';



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



function TrackMeeting() {
    const [loding,setLoding]=useState(true);
    const [children,setChildren]=useState(<div></div>);


let meeting={};
let tenants={};
let keys="";

///let children=<div>ijdfoijoirfjo</div>;
async function getData(){   
///get buildingId from the url param 
const buildingId="1";
//get the building expense
try{
    //get the meeting
    let collectionRef=collection(firestore,'meeting');
    let apartQuery= query(collectionRef,where("date","!=","-1"));
    let apartQurySnapshot= await getDocs(apartQuery);
    let meetingArr=[];
    apartQurySnapshot.forEach(doc=>{
        //meeting[doc.id]=doc.data();
        //add all the participants of the meeting to the meeting array
        Object.keys(doc.data().participants).forEach(part=>{
            meetingArr=meetingArr.concat([{"date":doc.data().date,"tenant":doc.data().participants[part]}])
        })
    });
    //get the tenants
     collectionRef=collection(firestore,'tenants');
     apartQuery= query(collectionRef,where("building","!=","-1"));
     apartQurySnapshot= await getDocs(apartQuery);
    apartQurySnapshot.forEach(doc=>{
        tenants[doc.id]=doc.data();
    });
    //sort the result by date
    meetingArr.sort((key1,key2)=>{return sortByDate(key1["date"],key2["date"]);});
    //set the result in descending order
    meetingArr.reverse();

    let temp=meetingArr.map(tan=>{
        if(!tenants[tan["tenant"]])
            return (<></>);
        return (
            <tr>
                 <td>{tenants[tan["tenant"]]["building_num"]}</td>
                 <td>{tan["date"].split("-").reverse().join("-")}</td>
                 <td>{tenants[tan["tenant"]]["family_name"]}</td>
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

        <h1>מעקב נוכחים</h1>
            <table>
                <thead>
                   <tr>
                        <th>מספר בניין</th>
                        <th>תאריך פגישה</th>
                        <th>דייר</th>
                    </tr>
                </thead>
                <tbody>
                {children}
                </tbody>
            </table>
            <Link to='/MeetingManagement' className='link'>
                <BackButton />
            </Link>
         </div>
    </>
	);
 }

export default TrackMeeting;