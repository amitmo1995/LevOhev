import React from 'react';

function Input(props) {
	return (
		<button className='option'>
			<img src={props.imgAdd} alt='option-img' />
			<div className='option-name'>
				<h2>{props.optionName}</h2>
			</div>
		</button>
	);
}

export default Input;