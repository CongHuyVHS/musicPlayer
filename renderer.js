let songTitle = document.getElementById('title');
let songArtist = document.getElementById('artist');
let songArt = document.querySelector('.song-art');
let previousBtn = document.querySelector('.prev-button');
let playBtn = document.querySelector('.play-button');
let nextBtn = document.querySelector('.next-button');
let currentSong = document.createElement('audio');
let volumeSlider = document.querySelector('.volume_slider');
let songIndex = 0; 
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
    currentSong.src = musics[songIndex].src;
    currentSong.load();

    songTitle.textContent = musics[songIndex].name;
    songArtist.textContent = musics[songIndex].artist;
    songArt.style.backgroundImage = `url(${musics[songIndex].img})`;

    currentSong.addEventListener('ended', nextSong); 
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