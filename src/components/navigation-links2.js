import React from 'react'

import PropTypes from 'prop-types'

import './navigation-links2.css'

const NavigationLinks2 = (props) => {
  return (
    <nav className={`navigation-links2-nav ${props.rootClassName} `}>
      <span className="navigation-links2-text">{props.text}</span>
      <span className="navigation-links2-text1">{props.text1}</span>
      <span className="navigation-links2-text2">{props.text2}</span>
      <span className="navigation-links2-text3">{props.text3}</span>
      <span className="navigation-links2-text4">{props.text4}</span>
    </nav>
  )
}

NavigationLinks2.defaultProps = {
  text: 'About',
  text3: 'Team',
  text1: 'Features',
  text4: 'Blog',
  rootClassName: '',
  text2: 'Pricing',
}

NavigationLinks2.propTypes = {
  text: PropTypes.string,
  text3: PropTypes.string,
  text1: PropTypes.string,
  text4: PropTypes.string,
  rootClassName: PropTypes.string,
  text2: PropTypes.string,
}

export default NavigationLinks2
