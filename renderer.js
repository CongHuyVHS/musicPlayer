let songTitle = document.getElementById('title');
let songArtist = document.getElementById('artist');
let songArt = document.querySelector('.song-art');
let previousBtn = document.querySelector('.prev-button');
let playBtn = document.querySelector('.play-button');
let nextBtn = document.querySelector('.next-button');
let currentSong = document.createElement('audio');
let seek_slider = document.querySelector(".seek_slider");
let volumeSlider = document.querySelector('.volume_slider');
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let songIndex = 0; 
let updateTimer;
let isPlaying = false;


let musics = [
    {
        name: "Ghost duet",
        artist: "Louie Zong",
        img:"img/music01.png",
        src: "music/ghost01.mp3",
    },

    {
        name: "Ghost choir",
        artist: "Louie Zong",
        img:"img/music02.png",
        src: "music/ghost02.mp3",
    },
    {
        name: "Ghost + guest",
        artist: "Louie Zong",
        img:"img/music03.png",
        src: "music/ghost03.mp3",
    }
]


function loadSong(songIndex){
    clearInterval(updateTimer);
    resetValues();
    currentSong.src = musics[songIndex].src;
    currentSong.load();

    songTitle.textContent = musics[songIndex].name;
    songArtist.textContent = musics[songIndex].artist;
    songArt.style.backgroundImage = `url(${musics[songIndex].img})`;
    updateTimer = setInterval(seekUpdate, 1000);
    currentSong.onended = nextSong; 
}

function playPauseSong(){
    if(!isPlaying){
        playSong()
    }
    else pauseSong();
}

function playSong(){
    currentSong.play();
    isPlaying = true;
    playBtn.querySelector('img').src = 'img/pause.png';
}

function pauseSong(){
    currentSong.pause();
    isPlaying = false;
    playBtn.querySelector('img').src = 'img/continue.png';
}

function nextSong(){
    if(songIndex < musics.length - 1){
        songIndex++;
    }
    else songIndex = 0; 
    loadSong(songIndex);
    playSong();
}

function prevSong(){
    if(songIndex > 0){
        songIndex--;
    }
    else songIndex = musics.length - 1;
    loadSong(songIndex);
    playSong();
}

function setVolume(){
    currentSong.volume = volumeSlider.value / 100;
}

function seekTo(){
    let seekto = currentSong.duration * (seek_slider.value / 100);
    currentSong.currentTime = seekto;
}

function closeApp() {
    window.electronAPI.closeWindow();
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(currentSong.duration)) {
    seekPosition = currentSong.currentTime * (100 / currentSong.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currentSong.currentTime / 60);
    let currentSeconds = Math.floor(currentSong.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currentSong.duration / 60);
    let durationSeconds = Math.floor(currentSong.duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    // Display the updated duration
    currentTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
function resetValues() {
  currentTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seek_slider.value = 0;
}

window.addEventListener('DOMContentLoaded', () => {
    loadSong(songIndex);
});