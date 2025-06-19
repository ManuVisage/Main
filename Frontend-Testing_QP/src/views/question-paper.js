import React, { useState, useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import * as faceapi from "face-api.js";
import "./question-paper.css";

const questions = [
  { question: "How many Keywords are there in C Programming language ?", options: ["23", "32", "33", "43"], correctAnswerIndex: 1 },
  { question: "Which of the following functions takes A console Input in Python ?", options: ["get()", "input()", "gets()", "scan()"], correctAnswerIndex: 1 },
  { question: "Which of the following is the capital of India ?", options: ["Mumbai", "Delhi", "Chennai", "Lucknow"], correctAnswerIndex: 1 },
  { question: "Which of The Following is must to Execute a Python Code ?", options: ["TURBO C", "Py Interpreter", "Notepad", "IDE"], correctAnswerIndex: 1 },
  { question: "The Taj Mahal is located in  ?", options: ["Patna", "Delhi", "Benaras", "Agra"], correctAnswerIndex: 3 },
  { question: "The append Method adds value to the list at the ?", options: ["custom location", "end", "center", "beginning"], correctAnswerIndex: 1 },
  { question: "In which year '@' sign was first chosen for its use in e-mail address", options: ["1976", "1980", "1977", "1972"], correctAnswerIndex: 3 },
  { question: "Which of the following is not a costal city of india ?", options: ["Bengluru", "Kochin", "Mumbai", "vishakhapatnam"], correctAnswerIndex: 0 },
  { question: "Which of The following is executed in browser(client side) ?", options: ["perl", "css", "python", "java"], correctAnswerIndex: 1 },
  { question: "Which of the following keyword is used to create a function in Python ?", options: ["function", "void", "fun", "def"], correctAnswerIndex: 3 },
  { question: "To Declare a Global variable in python we use the keyword ?", options: ["all", "var", "let", "global"], correctAnswerIndex: 3 },
  { question: "Who was the 1st President of India", options: ["Jawaharlal Nehru", "Rajendra Prasad", "Indira Gandhi", "Sarvepalli Radhakrishnan"], correctAnswerIndex: 1 },
  { question: "Which one of the followings is a programming language", options: ["HTTP", "HTML", "HPML", "FTP"], correctAnswerIndex: 1 },
];

const OptionButton = React.memo(({ option, index, isSelected, onClick }) => (
  <button
    className="option-button"
    onClick={() => onClick(index)}
    style={{ backgroundColor: isSelected ? "#899089" : "white" }}
    aria-pressed={isSelected}
  >
    {option}
  </button>
));

const QuestionPaper = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [noFaceDuration, setNoFaceDuration] = useState(0);
  const [hasFace, setHasFace] = useState(true);
  const [firstWarningIssued, setFirstWarningIssued] = useState(false);
  const [secondWarningIssued, setSecondWarningIssued] = useState(false);
  const [webcamError, setWebcamError] = useState(false);

  const hasFaceRef = useRef(true);
  const detectionInterval = useRef(null);
  const noFaceInterval = useRef(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const beep = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(440, ctx.currentTime);
    oscillator.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.2);
  };

  const handleOptionClick = useCallback((optionIndex) => {
    const newSelections = [...selectedOptions];
    newSelections[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelections);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 500);
    }
  }, [currentQuestionIndex, selectedOptions]);

  const startVideoStream = useCallback(() => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setWebcamError(false);
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
        setWebcamError(true);
      });
  }, []);

  const stopVideoStream = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const processFaceDetection = useCallback(async () => {
    const videoEl = videoRef.current;
    const canvasEl = canvasRef.current;
    if (!videoEl || !canvasEl || videoEl.readyState < 2) return;

    try {
      const detections = await faceapi.detectAllFaces(
        videoEl,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.25 })
      ).withFaceLandmarks().withFaceExpressions();

      const displaySize = {
        width: videoEl.videoWidth,
        height: videoEl.videoHeight,
      };
      faceapi.matchDimensions(canvasEl, displaySize);
      const resized = faceapi.resizeResults(detections, displaySize);

      const ctx = canvasEl.getContext("2d");
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      faceapi.draw.drawDetections(canvasEl, resized);
      faceapi.draw.drawFaceLandmarks(canvasEl, resized);
      faceapi.draw.drawFaceExpressions(canvasEl, resized);

      if (resized.length > 0) {
        if (!hasFaceRef.current) {
          hasFaceRef.current = true;
          setHasFace(true);
        }
      } else {
        if (hasFaceRef.current) {
          hasFaceRef.current = false;
          setHasFace(false);
        }
      }
    } catch (error) {
      console.error("Detection failed:", error);
    }
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = process.env.PUBLIC_URL + "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setIsModelsLoaded(true);
        startVideoStream();
      } catch (error) {
        console.error("Failed to load models:", error);
      }
    };
    loadModels();
    return () => {
      cancelAnimationFrame(detectionInterval.current);
      clearInterval(noFaceInterval.current);
      stopVideoStream();
    };
  }, [startVideoStream]);

  useEffect(() => {
    const handlePlay = () => {
      const detectLoop = async () => {
        if (isModelsLoaded) await processFaceDetection();
        detectionInterval.current = requestAnimationFrame(detectLoop);
      };
      detectLoop();
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("play", handlePlay);
      if (!video.paused && !video.ended) handlePlay();
    }

    return () => {
      if (video) video.removeEventListener("play", handlePlay);
      cancelAnimationFrame(detectionInterval.current);
    };
  }, [isModelsLoaded, processFaceDetection]);

  useEffect(() => {
    if (!hasFaceRef.current) {
      noFaceInterval.current = setInterval(() => {
        setNoFaceDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(noFaceInterval.current);
      setHasFace(true);
      setNoFaceDuration(0); // Don't reset warnings
    }

    return () => clearInterval(noFaceInterval.current);
  }, [hasFace]);

  useEffect(() => {
    if (!hasFaceRef.current) {
      if (noFaceDuration === 10 && !firstWarningIssued) {
        beep();
        alert("⚠️ Your face is not visible. Please return within 12 seconds.");
        setFirstWarningIssued(true);
      }

      if (noFaceDuration === 17 && !secondWarningIssued) {
        beep();
        alert("⚠️ Still no face detected. You have 5 seconds left before the exam ends.");
        setSecondWarningIssued(true);

        setTimeout(() => {
          if (!hasFaceRef.current) {
            beep();
            alert("❌ Face not detected. Exam ended.");
            stopVideoStream();
            window.location.href = "/exam-ended";
          }
        }, 5000);
      }
    }
  }, [noFaceDuration, firstWarningIssued, secondWarningIssued]);

  useEffect(() => {
    if (timeLeft <= 0) {
      stopVideoStream();
      window.location.href = "/exam-ended";
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        beep();
        alert("⚠️ Tab switching is not allowed!");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const currentQuestion = questions[currentQuestionIndex] || { question: "", options: [] };
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="question-paper-container">
      <Helmet><title>Online Exam</title></Helmet>

      <div className="question-box">
        <div className="question-text">{currentQuestion.question}</div>
        {currentQuestion.options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            index={index}
            isSelected={selectedOptions[currentQuestionIndex] === index}
            onClick={handleOptionClick}
          />
        ))}
      </div>

      <div className="video-section">
        <div className="webcam-wrapper">
          <video ref={videoRef} autoPlay muted playsInline width="300" height="225" />
          <canvas ref={canvasRef} width="300" height="225" />
        </div>

        <div className="face-status" style={{ color: hasFace ? "green" : "red", marginTop: "8px", fontWeight: "bold" }}>
          {hasFace ? "✅ Face Detected" : "❌ No Face Detected"}
        </div>

        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
        {webcamError && (
          <div className="error-message">
            Camera access denied. Please enable camera permissions.
          </div>
        )}
      </div>

      <div className="question-nav">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQuestionIndex(i)}
            className="question-nav-btn"
            style={{ backgroundColor: currentQuestionIndex === i ? "#818080" : "#84aadf" }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="submit-btn">
        <Link to="/exam-ended" onClick={stopVideoStream}>
          <button>Submit</button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionPaper;
