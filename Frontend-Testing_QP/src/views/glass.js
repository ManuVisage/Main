import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./glass.css";

const Glass = (props) => {
  const [examCode, setExamCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory(); // ✅ FIXED

  const handleSubmit = (e) => {
    e.preventDefault();
    if (examCode === "411614" && password === "Student1234") {
      history.push("/capture-image"); // ✅ FIXED
    } else {
      setError("Incorrect exam code or password.");
    }
  };

  return (
    <div className="glass-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="glass-glass">
        <div className="glass-background"></div>
        <div className="glass-codepage">
          <img
            alt="pexelslizasummer"
            src="/external/pexelslizasummer634791211161-9tfh-400h.png"
            className="glass-pexelslizasummer63479121"
          />

          <form onSubmit={handleSubmit}>
            <div className="glass-start-exam-nowbutton">
              <div className="glass-startexam">
                <button type="submit" className="gradient-button">
                  <span className="button-text">Start Exam Now</span>
                  <span className="button-icon">➜</span>
                </button>
              </div>
            </div>

            <div className="glass-examcodebutton1">
              <input
                className="input-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="glass-text2">Enter Password:</span>
            </div>

            <div className="glass-examcodebutton2">
              <input
                className="input-exam-code"
                type="text"
                placeholder="Exam Code"
                value={examCode}
                onChange={(e) => setExamCode(e.target.value)}
              />
              <span className="glass-text3">Enter Exam code:</span>
            </div>

            {error && (
              <p style={{ color: "red", position: "absolute", top: "370px", left: "680px" }}>
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Glass;
