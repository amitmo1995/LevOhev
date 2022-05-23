import React, { useRef, useState } from 'react';
import BackButton from '../features/BackButton';
import { Link } from 'react-router-dom';

function TrackMeeting() {

	return (
		<>
			<div className='tableData'>
                <h1>מעקב נוכחים</h1>
            <table>
                <tr>
                    <th>מספר בניין</th>
                    <th>תאריך</th>
                    <th>דייר</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>09.11.22</td>
                        <td>עמית</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>01.02.22</td>
                            <td>אור</td>
                             </tr>
                             <tr>
                                 <td> 3</td>
                                  <td>04.02.21</td>
                                  <td>דוד</td>
                                  </tr>
                                  <tr>
                                      <td>8 </td>
                                      <td>20.08.22</td>
                                      <td>בגין</td>
                                      </tr>
                                      </table>
                                      <Link to='/MeetingManagement' className='link'>
                                          <BackButton />
                                          </Link>
                                      </div>
		</>
	);
 }

export default TrackMeeting;