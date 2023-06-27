let audio1 = new Audio('songs/1.mp3');
let audio2 = new Audio('songs/2.mp3');
let audio3 = new Audio('songs/3.mp3');
let audio4 = new Audio('songs/4.mp3');
let audio5 = new Audio('songs/5.mp3');
let audio6 = new Audio('songs/6.mp3');
let audio7 = new Audio('songs/7.mp3');
let audio8 = new Audio('songs/8.mp3');
let audio9 = new Audio('songs/9.mp3');
let audio10 = new Audio('songs/10.mp3');
audio1.addEventListener('error', function() {
  console.error('Error occurred while playing audio.');
});
let audioFiles = [
    new Audio('songs/1.mp3'),
    new Audio('songs/2.mp3'),
    new Audio('songs/3.mp3'),
    new Audio('songs/4.mp3'),
    new Audio('songs/5.mp3'),
    new Audio('songs/6.mp3'),
    new Audio('songs/7.mp3'),
    new Audio('songs/8.mp3'),
    new Audio('songs/9.mp3'),
    new Audio('songs/10.mp3')
  ];
let forward = document.querySelector('.forward');
let backward = document.querySelector('.backward');
let playbtn = document.querySelector('.playbtn');
let progressBar = document.querySelector('#myProgressBar');
// By default audio1.play()  will run ///////////////////////////////////////////////////////////////////////////

let currentAudioIndex = 0;
let currentAudio = audioFiles[currentAudioIndex];
// currentAudio.play();
// Set initial position to 20 seconds for all audio files
audioFiles.forEach(audio => {
    audio.currentTime = 20;
  });
  
// Forward and backward Listeners  ///////////////////////////////////////////////////////////////////////////////


forward.addEventListener('click', playNext);
backward.addEventListener('click', playPrevious);


function playNext() {
    currentAudio.pause();
    currentAudioIndex++;
    
    if (currentAudioIndex >= audioFiles.length) {
      currentAudioIndex = 0;
    }
    
    currentAudio = audioFiles[currentAudioIndex];
    currentAudio.play();
  }
  
  function playPrevious() {
    currentAudio.pause();
    currentAudioIndex--;
    
    if (currentAudioIndex < 0) {
      currentAudioIndex = audioFiles.length - 1;
    }
    
    currentAudio = audioFiles[currentAudioIndex];
    currentAudio.play();
  }

// Play btn logic here ////////////////////////////////////////////////////////////////////////////////////////


let isPlaying = false;
playbtn.addEventListener('click', function() {
    opacity = document.querySelector('.transition-opacity')
    // console.log(opacity)
  playbtn.classList.toggle('fa-regular');
  playbtn.classList.toggle('fa-circle-play');
  playbtn.classList.toggle('fa-solid');
  playbtn.classList.toggle('fa-pause');
  
  if (isPlaying) {
    currentAudio.pause();
    opacity.style.opacity = '0';
  } else {
    currentAudio.play();
    opacity.style.opacity = '1';
  }
  isPlaying = !isPlaying;
  console.log(!isPlaying)
});




///////////////SeekBar//////////////////MyProgressBar////////////////////Logic/////////Here///////////////////////


progressBar.addEventListener('input', updateAudioProgress);

function updateAudioProgress() {
    let seekPosition = progressBar.value;    // It tell where it is exist from 1 to 100 positions 
    // console.log(progressBar.value)
    let duration = currentAudio.duration;     // It tells how the song is long It tells in sec 
    // console.log(currentAudio.duration)
    let currentTime = (duration * seekPosition) / 100;
    
    currentAudio.currentTime = currentTime;
  }
  
  // Update seek bar position based on audio progress
  function updateProgressBar() {
    let currentTime = currentAudio.currentTime;
    let duration = currentAudio.duration;
    let seekPosition = (currentTime / duration) * 100;
    
    progressBar.value = seekPosition;
  }
  
  // Update seek bar position as the audio plays
  currentAudio.addEventListener('timeupdate', updateProgressBar);
