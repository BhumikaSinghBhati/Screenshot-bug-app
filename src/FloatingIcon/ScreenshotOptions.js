import React, { useState } from 'react';
import { ScreenCapture } from 'react-screen-capture';
import './ScreenshotOptions.css';
import SaveModal from '../SaveModal';
import html2canvas from 'html2canvas';
import SaveModalo from '../SaveModalo';

const ScreenshotOptions = ({ onClose }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [captureFullss, setCaptureFull] = useState(null);

  const handleCapture = (dataURL) => {
    fetch(dataURL)
      .then(response => response.blob())
      .then(blob => {
        setCapturedImage(blob);
        setCaptureFull(null);
        setIsCapturing(true);
        setShowModal1(true);
      })
      .catch(error => {
        console.error('Error converting data URL to Blob:', error);
      });
  };

  const handleRetake = () => {
    setIsCapturing(false);
    setCapturedImage(null);
    setShowModal1(false);
  };

  const handleFullScreenCapture = () => {
    const targetElement = document.documentElement;

    html2canvas(targetElement).then(canvas => {
      const imageData = canvas.toDataURL();
      setCaptureFull(imageData);
      setCapturedImage(null);
      setIsCapturing(true);
      setShowModal1(true);
    });
  };

  const handleSave = () => {
    setShowModal(true);
    setShowModal1(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModal1 = () => {
    setShowModal1(false);
  };

  return (
    <>
      {!showModal && (
        <div className="screenshot-options-container">
          <ScreenCapture
            className="screenshot-options"
            onEndCapture={handleCapture}
            captureCursor
            videoConstraints={{ facingMode: "user" }}
          >
            {({ onStartCapture }) => (
              <div className='screenshot-options'>
                {isCapturing ? (
                  <>
                    <div className="option" onClick={handleSave}>
                      Save
                    </div>
                    <div className="option" onClick={handleRetake}>
                      Retake
                    </div>
                  </>
                ) : (
                  <>
                    <div className="option" onClick={() => { onStartCapture(); setIsCapturing(true); }}>
                      Custom Area
                    </div>
                    <div className="option" onClick={handleFullScreenCapture}>
                      Full Screen
                    </div>
                  </>
                )}
                <div className="optionclose" onClick={onClose}>
                  ×
                </div>
              </div>
            )}
          </ScreenCapture>
        </div>
      )}
      {showModal && (
        <SaveModal onClose={() => { onClose(); closeModal(); }} image={capturedImage} imagee={captureFullss} />
      )}
      {showModal1 && (
        <SaveModalo onClose={() => { onClose(); closeModal1(); }} image={capturedImage} imagee={captureFullss} handleSave={handleSave} handleRetake={handleRetake} />
      )}
    </>
  );
};

export default ScreenshotOptions;
