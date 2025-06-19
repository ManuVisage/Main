import React from 'react'

import { Helmet } from 'react-helmet'

import './background.css'

const Background = (props) => {
  return (
    <div className="background-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="background-background1">
        <img
          alt="Rectangle771501"
          src="/external/rectangle771501-i6gd-1500w.png"
          className="background-rectangle77"
        />
        <div className="background-background2">
          <img
            alt="blob11401"
            src="/external/blob11401-86e.svg"
            className="background-blob1"
          />
          <img
            alt="blob31401"
            src="/external/blob31401-fuy.svg"
            className="background-blob3"
          />
        </div>
        <img
          alt="Cameraoutput1481"
          src="/external/cameraoutput1481-raee-700w.png"
          className="background-cameraoutput"
        />
        <button className="background-captureimagebutton">
          <img
            alt="Rectangle76I148"
            src="/external/rectangle76i148-ymqzg-200h.png"
            className="background-rectangle76"
          />
          <span className="background-text">Capture Image</span>
        </button>
      </div>
    </div>
  )
}

export default Background
