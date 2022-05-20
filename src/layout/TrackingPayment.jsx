import React from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';

function TrackingPayment() {

	return (
		<>
			<div className='tableData'>
                <h1>מעקב תשלומי וועד</h1>
            <table>
                <tr>
                    <th>וועד</th>
                    <th>תאריך</th>
                    <th>סכום</th>
                    </tr>
                    <tr>
                        <td>איציק</td>
                        <td>09.11.22</td>
                        <td>100</td>
                        </tr>
                        <tr>
                            <td>דוד</td>
                            <td>01.02.22</td>
                            <td>150</td>
                             </tr>
                             <tr>
                                 <td>אברהם</td>
                                  <td>04.02.21</td>
                                  <td>300</td>
                                  </tr>
                                  <tr>
                                      <td>חנה</td>
                                      <td>20.08.22</td>
                                      <td>250</td>
                                      </tr>
                                      </table>
                                      <Link to='/FinancialManagement' className='link'>
                                          <BackButton />
                                          </Link>
                                      </div>
		</>
	);
 }

export default TrackingPayment;