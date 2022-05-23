import React from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';

function BuildingExpenses() {
	return (
		<>
			<div className='tableData'>
                <h1>מעקב הוצאות/הכנסות</h1>
            <table>
                <tr>
                    <th>סכום</th>
                    <th>תאריך</th>
                    <th>תיאור</th>
                    </tr>
                    <tr>
                        <td>100</td>
                        <td>09.11.22</td>
                        <td>גנן</td>
                        </tr>
                        <tr>
                            <td>150</td>
                            <td>01.02.22</td>
                            <td>ניקיון</td>
                             </tr>
                             <tr>
                                 <td>500</td>
                                  <td>04.02.21</td>
                                  <td>צבע בניין</td>
                                  </tr>
                                  <tr>
                                      <td>250</td>
                                      <td>20.08.22</td>
                                      <td>פעילות לילדים</td>
                                      </tr>
                                      </table>
                                      <Link to='/FinancialManagement' className='link'>
                                          <BackButton />
                                          </Link>
                                      </div>
		</>
	);
 }

export default BuildingExpenses;