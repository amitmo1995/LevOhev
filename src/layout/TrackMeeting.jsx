import React, { useEffect, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import HomePageButton from '../features/HomePageButton';
import { LogoutButton } from '../features/LogoutButton';

let sortByDate = function (date_1, date_2) {
	date_1 = date_1.split('-');
	date_2 = date_2.split('-');
	//compare year
	date_1[0] = parseInt(date_1[0]);
	date_2[0] = parseInt(date_2[0]);
	if (date_1[0] > date_2[0]) {
		return 1;
	} else if (date_2[0] > date_1[0]) {
		return -1;
	}
	//compare mounth
	date_1[1] = parseInt(date_1[1]);
	date_2[1] = parseInt(date_2[1]);
	if (date_1[1] > date_2[1]) {
		return 1;
	} else if (date_2[1] > date_1[1]) {
		return -1;
	}
	//compare day
	date_1[2] = parseInt(date_1[2]);
	date_2[2] = parseInt(date_2[2]);
	if (date_1[2] > date_2[2]) {
		return 1;
	} else if (date_2[2] > date_1[2]) {
		return -1;
	}
	return 0;
};

function TrackMeeting() {
	const [loding, setLoding] = useState(true);
	const [children, setChildren] = useState(<div></div>);
	let meetingSummary = {};
	let keys = '';

	async function getData() {
		try {
			let collectionRef = collection(firestore, 'meeting_summary');
			let Query = query(collectionRef);
			let snapshot = await getDocs(Query);
			snapshot.forEach(doc => {
				meetingSummary[doc.id] = doc.data();
			});
			keys = Object.keys(meetingSummary);
			keys.sort((key1, key2) => {
				return sortByDate(
					meetingSummary[key1]['date'],
					meetingSummary[key2]['date']
				);
			});
			keys.reverse();
			let temp = keys.map(key => {
				return (
					<tr>
						<td>{meetingSummary[key]['attendance']}</td>
						<td>{meetingSummary[key]['summary']}</td>
						<td>{meetingSummary[key]['topic']}</td>
						<td>
							{meetingSummary[key]['date'].split('-').reverse().join('-')}
						</td>
					</tr>
				);
			});
			setChildren(temp);
			setLoding(false);
		} catch {
			console.log('queryError');
		}
	}
	useEffect(() => {
		getData();
	}, []);
	//useEffect(()=>{},[children])

	if (loding) {
		return <h1>loding ... </h1>;
	}

	return (
		<>
			<div className='tableData'>
				<Link to='/ManagerHomePage' className='link'>
					<HomePageButton />
				</Link>
				<Link to='/' className='link'>
					<LogoutButton />
				</Link>
				<h1>מעקב נוכחים</h1>
				<table>
					<thead>
						<tr>
							<th>נוכחים</th>
							<th>סיכום</th>
							<th>נושא</th>
							<th>תאריך</th>
						</tr>
					</thead>
					<tbody>{children}</tbody>
				</table>
				<Link to='/MeetingManagement' className='link'>
					<BackButton />
				</Link>
			</div>
		</>
	);
}

export default TrackMeeting;
