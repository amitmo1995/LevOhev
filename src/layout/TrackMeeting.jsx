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
                    <th>דייר</th>
                    <th>תאריך</th>
                    <th>מספר בניין</th>
                    </tr>
                    <tr>
                        <td>עמית</td>
                        <td>09.11.22</td>
                        <td>1</td>
                        </tr>
                        <tr>
                            <td>אור</td>
                            <td>01.02.22</td>
                            <td>5</td>
                             </tr>
                             <tr>
                                 <td> דוד</td>
                                  <td>04.02.21</td>
                                  <td>3</td>
                                  </tr>
                                  <tr>
                                      <td>בגין </td>
                                      <td>20.08.22</td>
                                      <td>8</td>
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