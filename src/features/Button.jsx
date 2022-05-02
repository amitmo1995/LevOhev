import React from 'react';

function Button(props) {
	return (
		<div className='Button'>
			<button >{props.text} </button>
		</div>
	);
}

export default Button;
