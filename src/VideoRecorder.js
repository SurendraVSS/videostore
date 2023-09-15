// VideoRecorder.js
import React, { useRef, useState } from 'react';
import videojs from 'video.js';

const VideoRecorder = ({ onSave }) => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          mediaRecorder.current = new MediaRecorder(stream);

          mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.current.push(event.data);
            }
          };

          mediaRecorder.current.onstop = () => {
            const blob = new Blob(chunks.current, { type: 'video/webm' });
            onSave(blob);
          };

          mediaRecorder.current.start();
          setRecording(true);
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
      <div>
        {recording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
