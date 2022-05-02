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

function ManagerBuildingManagement() {
	return (
		<div className='ManagerBuildingManagement'>
				<Heading title="ביצוע פעולות עבור בניין"/>
                <Button text='ניהול כלכלי' />
                <Button text='מיפוי בניין' />
                <Button text='שינוי יו"ר ועד בית' />
                <Button text='חזור' />
		</div>
	);
}

export default ManagerBuildingManagement;
