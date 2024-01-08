// Import necessary dependencies
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Get the Vimeo iframe player
const iframe = document.getElementById('vimeo-player');

// Initialize the Vimeo player
const player = new Player(iframe);

// Function to save playback time to local storage
const savePlaybackTime = async () => {
  try {
    const currentTime = await player.getCurrentTime();
    localStorage.setItem('videoplayer-current-time', currentTime);
  } catch (error) {
    console.error('Error saving playback time:', error);
  }
};

// Event listener for timeupdate - track playback time
player.on('timeupdate', throttle(savePlaybackTime, 1000)); // Throttled to update storage once a second

// Function to resume playback from saved position
const resumePlayback = async () => {
  try {
    const savedTime = localStorage.getItem('videoplayer-current-time');
    if (savedTime !== null) {
      await player.setCurrentTime(savedTime);
    }
  } catch (error) {
    console.error('Error resuming playback:', error);
  }
};

// Call the function to resume playback when the page is loaded
window.addEventListener('DOMContentLoaded', resumePlayback);
