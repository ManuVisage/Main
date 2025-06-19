import React from 'react'

import { Helmet } from 'react-helmet'

import './blank.css'

const Blank = (props) => {
  return (
    <div className="blank-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="blank-blank">
        <div className="blank-background">
          <img
            alt="blob11487"
            src="/external/blob11487-zw8.svg"
            className="blank-blob1"
          />
          <img
            alt="blob31488"
            src="/external/blob31488-5uyb.svg"
            className="blank-blob3"
          />
        </div>
      </div>
    </div>
  )
}

export default Blank
