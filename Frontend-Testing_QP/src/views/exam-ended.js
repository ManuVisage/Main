import React from "react";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./exam-ended.css";

const ExamEnded = (props) => {
  return (
    <div className="exam-ended-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="exam-ended-exam-ended">
        <div className="exam-ended-background">
          {/* <img
            alt="blob11509"
            src="/external/blob11509-kioa.svg"
            className="exam-ended-blob1"
          />
          <img
            alt="blob31509"
            src="/external/blob31509-28si.svg"
            className="exam-ended-blob3"
          /> */}
        </div>
        <span className="exam-ended-text1">Exam Has Ended</span>
        <div className="exam-ended-returntohomepage">
          <img
            alt="Rectangle76I150"
            src="/external/rectangle76i150-riuo-200h.png"
            className="exam-ended-rectangle76"
          />
          <Link to="/">
            <button className="exam-ended-text2">Return To Home Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamEnded;
