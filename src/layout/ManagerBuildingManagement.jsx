import React from 'react';
import Heading from '../features/Heading';
import Button from '../features/Button';

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
