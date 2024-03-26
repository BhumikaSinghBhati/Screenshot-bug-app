import React from 'react';
import './SaveModalo.css';

const SaveModalo = ({ onClose, image, imagee, handleSave, handleRetake }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        
        <div className="modal-body">
          <div className="image-container">
            {image && <img src={URL.createObjectURL(image)} style={{height: "500px",width: "700px"}} alt="Captured Screenshot" />}
            {imagee && <img src={imagee} style={{height: "500px",width: "700px"}}  alt="Full Screen Screenshot" />}
          </div>
        </div>
        <div className="modal-footer">
          <button className='op' onClick={handleSave}>Save</button>
          <button  className='opp' onClick={handleRetake}>Retake</button>
          <button className="close-cross" onClick={onClose}>×</button>
        </div>
      </div>
    </div>
  );
};

export default SaveModalo;
