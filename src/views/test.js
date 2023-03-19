import React from 'react'

import { Helmet } from 'react-helmet'

import InputBoxForInfo from '../components/input-box-for-info'
import Button from '../components/button'
import './test.css'

const TEST = (props) => {
  return (
    <div className="test-container">
      <Helmet>
        <title>TEST - Project ARENA</title>
        <meta property="og:title" content="TEST - Project ARENA" />
      </Helmet>
      <div className="test-container1">
        <span className="test-text">LOGIN</span>
        <InputBoxForInfo></InputBoxForInfo>
        <InputBoxForInfo></InputBoxForInfo>
        <Button></Button>
      </div>
    </div>
  )
}

export default TEST
