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
                    <th>סכום</th>
                    <th>תאריך</th>
                    <th>וועד</th>
                    </tr>
                    <tr>
                        <td>100</td>
                        <td>09.11.22</td>
                        <td>איציק</td>
                        </tr>
                        <tr>
                            <td>150</td>
                            <td>01.02.22</td>
                            <td>דוד</td>
                             </tr>
                             <tr>
                                 <td>300</td>
                                  <td>04.02.21</td>
                                  <td>אברהם</td>
                                  </tr>
                                  <tr>
                                      <td>250</td>
                                      <td>20.08.22</td>
                                      <td>חנה</td>
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