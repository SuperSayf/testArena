import React from 'react'

import './table.css'

const Table = (props) => {
  return (
    <div className="table-container">
      <ul className="list">
        <li className="list-item">
          <span>This</span>
        </li>
        <li className="list-item">
          <span>Should</span>
        </li>
        <li className="list-item">
          <span>Update</span>
        </li>
      </ul>
    </div>
  )
}

export default Table
