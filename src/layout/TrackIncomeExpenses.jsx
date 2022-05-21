import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';

function TrackIncomeExpenses() {

	return (
		<>
			<div className='tableData'>
                <h1>מעקב הוצאות/הכנסות</h1>
            <table>
                <tr>
                    <th>תיאור</th>
                    <th>תאריך</th>
                    <th>סכום</th>
                    </tr>
                    <tr>
                        <td>גנן</td>
                        <td>09.11.22</td>
                        <td>100</td>
                        </tr>
                        <tr>
                            <td>ניקיון</td>
                            <td>01.02.22</td>
                            <td>150</td>
                             </tr>
                             <tr>
                                 <td>צבע בניין</td>
                                  <td>04.02.21</td>
                                  <td>300</td>
                                  </tr>
                                  <tr>
                                      <td>פעילות לילדים</td>
                                      <td>20.08.22</td>
                                      <td>250</td>
                                      </tr>
                                      </table>
                                      <Link to='/HoaHomePage' className='link'>
                                          <BackButton />
                                          </Link>
                                      </div>
		</>
	);
 }

export default TrackIncomeExpenses;