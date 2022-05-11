import React from 'react';


function Option(props) {
	return (
		<div className='option'>
			<img src={props.imgAdd} alt='option-img' />
			<div className='option-name'>
				<h3>{props.optionName}</h3>
			</div>
		</div>
	);
}

export default Option;
