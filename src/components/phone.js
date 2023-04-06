import React from 'react'

import PropTypes from 'prop-types'

import './phone.css'

const Phone = (props) => {
  return (
    <div className={`phone-container ${props.rootClassName} `}>
      <div className="phone-container1" data-testid="phone-container1">
        <svg viewBox="0 0 1024 1024" className="phone-icon">
          <path
            d="M282 460q96 186 282 282l94-94q20-20 44-10 72 24 152 24 18 0 30 12t12 30v150q0 18-12 30t-30 12q-300 0-513-213t-213-513q0-18 12-30t30-12h150q18 0 30 12t12 30q0 80 24 152 8 26-10 44z"
            className=""
          ></path>
        </svg>
      </div>
      <div className="phone-container2">
        <span className="phone-text">{props.text}</span>
      </div>
    </div>
  )
}

Phone.defaultProps = {
  text: 'Text',
  rootClassName: '',
}

Phone.propTypes = {
  text: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Phone
