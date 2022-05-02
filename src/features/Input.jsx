import React from 'react';

function Input(props) {
	return (		
		<div className='Input'>
			<h3>{props.text}</h3>
			<input type={props.type} placeholder={props.placeHolder} />
		</div>
	);
}
export default Input;
