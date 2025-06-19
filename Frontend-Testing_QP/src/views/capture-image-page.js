import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import "./capture-image-page.css";

// Modal component for confirmation
const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message || "Are you sure?"}</p>
        <div className="modal-actions">
          <button className="btn confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const CaptureImagePage = (props) => {
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const webcamRef = useRef(null); // Webcam reference

  // Open the modal when the button is clicked
  const handleDelete = () => {
    setModalOpen(true);
  };

  // Confirm the action and navigate
  const confirmDelete = () => {
    setModalOpen(false);
    history.push("/question-paper"); // Navigate to another page
  };

  // Close the modal without action
  const cancelDelete = () => {
    setModalOpen(false);
  };

  return (
    <div className="capture-image-page-container">
      <Helmet>
        <title>Capture Image Page</title>
      </Helmet>
      <div className="capture-image-page-background1">
        <div className="capture-image-page-background2">
          <img
            alt="blob41169"
            src="/external/blob41169-ijjg.svg"
            className="capture-image-page-blob4"
          />
          <img
            alt="blob11161"
            src="/external/blob11161-q2wd.svg"
            className="capture-image-page-blob1"
          />
          
          <img
            alt="blob61161"
            src="/external/blob61161-8e7p.svg"
            className="capture-image-page-blob6"
          />
        </div>
        <div className="capture-image-page-glass"></div>

        {/* Show live camera feed using Webcam */}
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          className="capture-image-page-cameraoutput"
          audio={false}
        />

        {/* Capture Image Button */}
        <button className="capture-image-page-captureimagebutton">
          <button className="capture-button" onClick={handleDelete}>
            Capture Image
          </button>
        </button>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message="Confirm this Image?"
        />
      </div>
    </div>
  );
};

export default CaptureImagePage;
