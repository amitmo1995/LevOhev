import React from 'react';

function Button(props) {
	return (
		<div className='Button'>
			<button disabled={props.disabled} onClick={props.onClick}>{props.text} </button>
		</div>
	);
}

export default Button;
