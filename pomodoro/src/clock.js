import React, { useState, useEffect, useRef } from 'react';
import './clock_style.css';

function Clock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isSession, setIsSession] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const beepSoundRef = useRef(null);

  useEffect(() => {
    updateDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakLength, sessionLength, timeLeft, isSession]);

  const updateDisplay = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.title = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  const startStopTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          const newTimeLeft = prevTimeLeft - 1;

          if (newTimeLeft < 0) {
            beepSoundRef.current.play();
            setIsSession(!isSession);
            return isSession ? sessionLength * 60 : breakLength * 60;
          }

          return newTimeLeft;
        });
      }, 1000);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsSession(true);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    beepSoundRef.current.pause();
    beepSoundRef.current.currentTime = 0;
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(prevBreakLength => prevBreakLength + 1);
       if (!isSession) {
        setTimeLeft((breakLength + 1) * 60);
      }
    }
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(prevBreakLength => prevBreakLength - 1);
       if (!isSession) {
        setTimeLeft((breakLength - 1) * 60);
      }
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(prevSessionLength => prevSessionLength + 1);
      if (isSession) {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(prevSessionLength => prevSessionLength - 1);
      if (isSession) {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };


  const timeLeftFormatted = updateDisplay();

  return (
   
      
    <div id="container">
      <h1>Pomodoro Clock</h1>
      <div id="app">
        <div>
          <div className="length-control">
            <div id="break-label">Break Length</div>
            <button className="btn-level change" id="break-increment" value="+" onClick={handleBreakIncrement}>+</button>
            <div className="btn-level time" id="break-length">{breakLength}</div>
            <button className="btn-level change" id="break-decrement" value="-" onClick={handleBreakDecrement}>-</button>
          </div>

          <div className="length-control">
            <div id="session-label">Session Length</div>
            <button className="btn-level change" id="session-increment" value="+" onClick={handleSessionIncrement}>+</button>
            <div className="btn-level time" id="session-length">{sessionLength}</div>
            <button className="btn-level change" id="session-decrement" value="-" onClick={handleSessionDecrement}>-</button>
          </div>

          <div className="timer">
            <div className="timer-wrapper">
              <div id="timer-label">{isSession ? "Session" : "Break"}</div>
              <div id="time-left">{timeLeftFormatted}</div>
            </div>
          </div>

          <div className="timer-control">
            <button id="start_stop" onClick={startStopTimer}>{isRunning ? "Pause" : "Start"}</button>
            <button id="reset" onClick={resetTimer}>Reset</button>
          </div><br />
        </div>
        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" ref={beepSoundRef} />
      </div>
    </div>

  );
}

export default Clock;