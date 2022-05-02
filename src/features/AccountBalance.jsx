import React from 'react'

function AccountBalance(props) {
  return (
    <div className='AccountBalance'>
        <h1>יתרה בחשבון : {props.balance} ש"ח</h1>
	</div>
  )
}

export default AccountBalance