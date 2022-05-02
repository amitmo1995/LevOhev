import React from 'react';
import Heading from '../features/Heading';
import Input from '../features/Input';
import Button from '../features/Button';
import Building from '../features/Building';
import LeftSlide from '../features/LeftSlide';
import RightSlide from '../features/RightSlide';
import LogInButton from '../features/LogInButton';
import SelectTag from '../features/SelectTag';
import AccountBalance from '../features/AccountBalance';

function ChoseBuilding() {
	return (
		<div className='ChoseBuilding'>
             <Heading title="בחירת בניין" />
            <div className="container1">
            <RightSlide />
            <div className="table">
				<table>
                    <tr>
                        <td>
                            <Building BuildingNumber='1' numOfAdults='2' numOfDisables='20' numOfKids='1' />
                        </td>
                        <td>
                        <Building BuildingNumber='1' numOfAdults='2' numOfDisables='20' numOfKids='1' />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <Building BuildingNumber='1' numOfAdults='2' numOfDisables='20' numOfKids='1' />
                        </td>
                        <td>
                        <Building BuildingNumber='1' numOfAdults='2' numOfDisables='20' numOfKids='1' />
                        </td>
                    </tr>
                </table>
                </div>
               
                <LeftSlide/>
                </div>
                <Button text="חזור" />
               
		</div>
	);
}

export default ChoseBuilding;
