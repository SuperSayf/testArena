import React from 'react'

import PropTypes from 'prop-types'

import './email1.css'

const Email1 = (props) => {
  return (
    <div className={`email1-container ${props.rootClassName} `} data-testid="email1-container">
      <div className="email1-container1">
        <svg viewBox="0 0 1024 1024" className="email1-icon">
          <path
            d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z"
            className=""
          ></path>
        </svg>
      </div>
      <div className="email1-container2">
        <span className="email1-text">{props.text}</span>
      </div>
    </div>
  )
}

Email1.defaultProps = {
  rootClassName: '',
  text: 'Text',
}

Email1.propTypes = {
  rootClassName: PropTypes.string,
  text: PropTypes.string,
}

export default Email1
