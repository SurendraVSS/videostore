// App.js
import React, { useState } from 'react';
import VideoRecorder from './VideoRecorder';
import { saveVideoToDB, getAllVideosFromDB } from './indexedDB';

const App = () => {
  const [videos, setVideos] = useState([]);

  const handleSaveVideo = async (videoBlob) => {
    try {
      await saveVideoToDB(videoBlob);
      alert('Video saved to IndexedDB');
    } catch (error) {
      console.error('Error saving video to IndexedDB:', error);
    }
  };

  const handleRetrieveVideos = async () => {
    try {
      const videoData = await getAllVideosFromDB();
      setVideos(videoData);
    } catch (error) {
      console.error('Error retrieving videos from IndexedDB:', error);
    }
  };

  return (
    <div>
      <h1>Video Recorder</h1>
      <VideoRecorder onSave={handleSaveVideo} />
      <div>
        <button onClick={handleRetrieveVideos}>Retrieve Videos</button>
      </div>
      <div>
        <h2>Stored Videos:</h2>
        <ul>
          {videos.map((video, index) => (
            <li key={index}>
              <video controls src={URL.createObjectURL(video)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

