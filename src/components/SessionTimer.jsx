import React, { useState, useEffect } from 'react';

const SessionTimer = (props) => {
const [milliseconds, setMilliseconds] = useState(0);
const [showTimer, setShowTimer] = useState(true);
  useEffect(() => {
    // Start the timer, increasing time every 100 milliseconds (0.1 second)
    const interval = setInterval(() => {
      setMilliseconds(prevMilliseconds => prevMilliseconds + 100);
    }, 100); // Update every 100 milliseconds (0.1 seconds)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Format time into HH:MM:SS:DS (where DS represents 1/10th of a second)
  const formatTime = (totalMilliseconds) => {
    const totalSeconds = Math.floor(totalMilliseconds / 1000); // Total seconds
    const hours = Math.floor(totalSeconds / 3600); // Get hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Get remaining minutes
    const seconds = totalSeconds % 60; // Get remaining seconds
    const deciseconds = Math.floor((totalMilliseconds % 1000) / 10); // Get deciseconds (1/10th of a second)

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(deciseconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h3 className={`timer ${showTimer ? '' : 'fade-out'}`}>Session Timer: {formatTime(milliseconds)}</h3>
      <button className='btn-timer' onClick={function(){
        setShowTimer(!showTimer);
      }}>{`${showTimer ? 'Hide' : 'Show'} Timer`}</button>
    </div>
  );
};

export default SessionTimer;
