let playPauseBtn = document.querySelector('.icon-play');
let soundBtn = document.querySelector('.icon-volume');

let lineSong = document.querySelector('.seek-song');
let lineSound = document.querySelector('.change_sound');

let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let curr_track = document.createElement('audio');

let isPlaying = false;
let updateTimer;



/**/ //////        Попробывать создать глобальную переменную audio         ///////////// */


let reset = () => {

    currentTime.innerHTML = '00:00'
    totalDuration.innerHTML = '00:00'


    /////Попробывть//////////////////////////////////// curr_track.pause()

    pauseTrack()
    curr_track.currentTime = 0


    /*////////*/ ////////////////////////////////////////////


    lineSong.value = 0
    /* console.log('asd') */
}



let loadTrack = (track) => {

    reset();
    clearInterval(updateTimer);

    curr_track.src = track;
    curr_track.load()

    updateTimer = setInterval(setUpdate, 1000)
  /*   console.log(track) */
}




let playPauseTrack = () => {
    isPlaying ? pauseTrack() : playTrack()
}


let playTrack = () => {
    curr_track.play()
    isPlaying = true
}

let pauseTrack = () => {
    isPlaying = false
    curr_track.pause()
}




let seekTo = () => {
    let seekto = curr_track.duration * (lineSong.value / 100)
    curr_track.currentTime = seekto
}

let setVolume = () => {
    curr_track.volume = lineSound.value / 100

    if (curr_track.volume === 0) {
        soundBtn.src = './imgs/icons8-sound-64 (1).png'
    } else {
        soundBtn.src = './imgs/icons8-sound-64.png'
    }
}

let setUpdate = () => {

    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration)
        lineSong.value = seekPosition

        let currentMinutes = Math.floor(curr_track.currentTime / 60)
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60)
        let durationMinutes = Math.floor(curr_track.duration / 60)
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60)

        if (currentSeconds < 10) {
            currentSeconds = '0' + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = '0' + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = '0' + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = '0' + durationMinutes;
        }

        currentTime.innerHTML = currentMinutes + ':' + currentSeconds;
        totalDuration.innerHTML = durationMinutes + ':' + durationSeconds;

        if (currentTime.innerText == totalDuration.innerHTML) {


            playPauseBtn.src = './imgs/icons8-play-button-circled-64.png'
            playPauseBtn.classList.add('buttonPlay')
            currentTime.innerHTML = '00:00'
            lineSong.value = 0;
            pauseTrack()
        }
    }
}

let changeIconPlay = () => {

    if (playPauseBtn.classList.contains('buttonPlay')) {
        playPauseBtn.src = './imgs/icons8-pause-button-64.png'
        playPauseBtn.classList.remove('buttonPlay')

    } else {
        playPauseBtn.src = './imgs/icons8-play-button-circled-64.png'
        playPauseBtn.classList.add('buttonPlay')
    }

}


let playPause = () => {

    lineSong.addEventListener('change', seekTo)
    lineSound.addEventListener('change', setVolume)
    playPauseBtn.addEventListener('click', () => {
        loadTrack(birdsData[1][1].audio), playPauseTrack(), changeIconPlay()
    })

}

export {
    loadTrack,
    playPause
};