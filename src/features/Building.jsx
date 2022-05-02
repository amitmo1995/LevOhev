import React from 'react'

function Building(props) {
  return (
    <div className='Building'>
        <button>
            <table>
                <tr>
                  <th>{props.BuildingNumber} בניין</th>
                </tr>
                <tr>
                    <td>{props.numOfAdults} :מבוגרים</td>
                </tr>
                <tr>
                    <td>{props.numOfDisables} :נכים</td>
                </tr>
                <tr>
                    <td>{props.numOfKids} :ילדים</td>
                </tr>
            </table>
        </button>
        </div>
  )
}

export default Building