import React from 'react'

function SelectTag(props) {
  return (
    <div className='SelectTag'>
			<select name="cars" id="cars">
            {props.nameArr.map(item=><option value={item}>{item}</option>)}
        </select>
	</div>
  )
}

export default SelectTag