import React, { useState, useEffect, useRef } from 'react';
import './SaveModal.css';
import '@fortawesome/fontawesome-free/css/all.css';

const SaveModal = ({ onClose, image, imagee }) => {
    const canvasRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isPencilSelected, setIsPencilSelected] = useState(false);
    const [isEraserSelected, setIsEraserSelected] = useState(false);
    const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
    const [issueType, setIssueType] = useState('Bug');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const impactRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const sectionRef = useRef(null);
    const subsectionRef = useRef(null);
    const snackbarTimer = useRef(null);

    useEffect(() => {
        if (snackbarMessage) {
            setShowSnackbar(true);
            snackbarTimer.current = setTimeout(() => {
                setShowSnackbar(false);
                setSnackbarMessage('');
            }, 2000);
        }
        return () => clearTimeout(snackbarTimer.current);
    }, [snackbarMessage]);

    const handleZoomIn = () => {
        const newZoomLevel = zoomLevel + 0.1;
        if (calculateCanvasWidth(newZoomLevel) <= 550) {
            setZoomLevel(newZoomLevel);
        }
    };

    const handleZoomOut = () => {
        if (zoomLevel > 0.1) {
            setZoomLevel(zoomLevel - 0.1);
        }
    };

    const calculateCanvasWidth = (zoomLevel) => {
        return 600 * zoomLevel;
    };

    const handlePencilClick = () => {
        setIsPencilSelected(!isPencilSelected);
        setIsEraserSelected(false);
    };

    const handleEraserClick = () => {
        setIsEraserSelected(!isEraserSelected);
        setIsPencilSelected(false);
    };

    const handleCanvasMouseDown = (e) => {
        if (!isDrawing && !isEraserSelected && !isPencilSelected) return;
        setIsDrawing(true);
        setPrevPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    };

    const handleCanvasMouseUp = () => {
        setIsDrawing(false);
    };

    const handleCanvasMouseMove = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const { offsetX, offsetY } = e.nativeEvent;
        context.beginPath();
        context.moveTo(prevPosition.x, prevPosition.y);
        context.lineTo(offsetX, offsetY);
        if (isEraserSelected) {
            context.strokeStyle = 'white';
            context.lineWidth = 10;
        } else {
            context.strokeStyle = 'black';
            context.lineWidth = 2;
        }
        context.stroke();
        setPrevPosition({ x: offsetX, y: offsetY });
    };

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleRaiseTicket = () => {
        if (!impactRef.current.value || !titleRef.current.value || !descriptionRef.current.value || !sectionRef.current.value || !subsectionRef.current.value) {
            setSnackbarMessage('Please fill all the required fields.');
            return;
        }
        const ticketData = {
            issueType: issueType,
            impact: impactRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            section: sectionRef.current.value,
            subsection: subsectionRef.current.value
        };
        console.log("ticketdata",ticketData);
    
        setSnackbarMessage('Ticket Raised Successfully');
    };
    
    useEffect(() => {
        if (snackbarMessage === 'Ticket Raised Successfully') {
            const downloadLink = document.createElement('a');
            downloadLink.href = imagee ? imagee : URL.createObjectURL(image);
            downloadLink.download = 'screenshot.png'; 
            downloadLink.click();
        }
    }, [snackbarMessage]);

    if (!(image instanceof Blob) && !imagee) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                </div>
                <div className="modal-left" style={{ position: 'relative' }}>
                    <div style={{ transform: `scale(${zoomLevel})` }}>
                        {imagee ? (
                            <img src={imagee} alt="Captured Screenshot" style={{height: "400px",width: "330px"}} />
                        ) : (
                            <img src={URL.createObjectURL(image)} alt="Captured Screenshot" style={{height: "400px",width: "330px"}}  />
                        )}
                    </div>
                    <div className="modal-buttons">
                        <button className={`modal-button ${isPencilSelected ? 'selected' : ''}`} onClick={handlePencilClick}><i className="fas fa-pencil-alt"></i></button>
                        <button className={`modal-button ${isEraserSelected ? 'selected' : ''}`} onClick={handleEraserClick}><i className="fas fa-eraser" ></i></button>
                        <button className="modal-buttonn" onClick={handleClearCanvas}>Clear</button>
                        <button className="modal-button" onClick={handleZoomIn}><i className="fas fa-search-plus"></i></button>
                        <button className="modal-button" onClick={handleZoomOut}><i className="fas fa-search-minus"></i></button>
                    </div>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        height={400}
                        width={330}
                        style={{ position: 'absolute', top: 0, left: 0, border: '1px',boxShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}
                    />
                </div>
               
                <div className="modal-right">
                    <div>
                        <h5>Issue Type</h5>
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                            <label style={{ marginRight: '10px' }}>
                                <input type="radio" value="Bug" checked={issueType === 'Bug'} onChange={() => setIssueType('Bug')} />
                                Bug
                            </label>
                            <label>
                                <input type="radio" value="Enhancement" checked={issueType === 'Enhancement'} onChange={() => setIssueType('Enhancement')} />
                                Enhancement
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Impact</h5>
                        <select ref={impactRef}>
                            <option value="">Select Impact</option>
                            <option value="low">Stops me from doing my work</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div>
                        <h5>Title</h5>
                        <input type="text" ref={titleRef} style={{maxWidth: "93%"}} />
                    </div>
                    <div>
                        <h5>Description</h5>
                        <textarea ref={descriptionRef}></textarea>
                    </div>
                    <div>
                        <h5>Section</h5>
                        <select ref={sectionRef}>
                            <option value="section1">Loan</option>
                            <option value="section2">Section 2</option>
                            <option value="section3">Section 3</option>
                        </select>
                    </div>
                    <div>
                        <h5>Subsection</h5>
                        <select ref={subsectionRef}>
                            <option value="subsection1">Home Page</option>
                            <option value="subsection2">Plp Page</option>
                            <option value="subsection3">Pdp Page</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <button onClick={onClose} style={{ marginRight: '10px',height:"35px" }}>Cancel</button>
                        <button onClick={handleRaiseTicket} style={{ marginRight: '100px',height: "35px" }}>RaiseTicket</button>
                    </div>
                </div>
                <span className="close-icon" onClick={onClose}>×</span>
            </div>
            {snackbarMessage && (
             <div className="snackbar">
             <span>{snackbarMessage}</span>
             </div>
            )}
        </div>
    );
};

export default SaveModal;