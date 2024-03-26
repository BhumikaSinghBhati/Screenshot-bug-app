import React, { useState } from 'react';
import './FloatingIcon.css'; 
import ScreenshotOptions from './ScreenshotOptions';

const FloatingIcon = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
    setShowOptions(false); 
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setShowPopover(false); 
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  return (
    <div className="floating-icon">
      {showOptions ? (
        <ScreenshotOptions onClose={toggleOptions} />
      ) : (
        <>
          {showPopover ? (
            <div className="close-icon" onClick={closePopover}>×</div>
          ) : (
            <div onClick={togglePopover}>
              <div className="blue-circle">
                <div className="white-circle"></div>
              </div>
            </div>
          )}
          {showPopover && (
            <div className="popover">
              <div className="popover-content">
                <h5>Facing Problem?</h5>
                <p>Our web support team is there to help! Feel free to reach out with any questions or issues you're facing while navigating our website.</p>
                <button className="screenshot-button" onClick={toggleOptions}>Take a Screenshot</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FloatingIcon;
