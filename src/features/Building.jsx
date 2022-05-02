import React from 'react'

function Building(props) {
  return (
    <div className='Building'>
        <button>
            <table>
                <tr>
                  <th>בניין : {props.BuildingNumber}</th>
                </tr>
                <tr>
                    <td>מבוגרים : {props.numOfAdults}</td>
                </tr>
                <tr>
                    <td>נכים : {props.numOfDisables}</td>
                </tr>
                <tr>
                    <td>ילדים : {props.numOfKids}</td>
                </tr>
            </table>
        </button>
        </div>
  )
}

export default Building