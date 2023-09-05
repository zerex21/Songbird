import birdsData from "./birds.js";
import {
    cardBird
} from './birdCardRender.js';



let answersCurrentQuestion = document.querySelector('.answers-current_question')
let audio = document.createElement('audio')
let quizNext = document.querySelector('.quiz-next')
let listQuestion = document.querySelectorAll('.list-question')
let defaultBlock = document.querySelector('.default-block')
let birdImgDefault = document.querySelector('.bird-img_default')
let birdCurrentName = document.querySelector('.bird-current_name')
let listQuestions = document.querySelector('.quiz')
let headerPreview = document.querySelector('.header-preview')
let greetingGame = document.querySelector('.greeting-game ')
let resultPage = document.querySelector('.results')
let buttonStartMax = document.querySelector('.button-start-max')
let totalScorePage = document.querySelector('.total-score')
let totalScoreMax = document.querySelector('.total-score-max')
let footer = document.querySelector('.footer')
let currentScore = document.querySelector('.current-score')
let buttonsChoose = document.querySelector('.buttons-choose')
let maxButtonsChoose = document.querySelector('.max-buttons-choose')
let buttonStart = document.querySelector('.button-start')
let buttonReturn = document.querySelector('.button-restart')

let rightAnswer;
quizNext.disabled = true
let selectQuestion = 0
let currentQuestion = 0
let totalScore = 5

currentScore.innerHTML = `Score: 0`

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return rightAnswer = Math.round(rand);
}

randomInteger(1, 6)


let showData = () => {
    checkRight = 0
    answersCurrentQuestion.innerHTML = ''

    for (let i = 0; i < birdsData[currentQuestion].length; i++) {
        answersCurrentQuestion.innerHTML += `<li class="list-type" data-answer="${i+1}"><span class="list-circle"></span>${birdsData[currentQuestion][i].name}</li>` /*  (birdsData[index][i].name) */
    }
    clickedAnswer()
}

let showCardChose = (index) => {

    defaultBlock.innerHTML = cardBird(birdsData[currentQuestion][Number(index)].name, birdsData[currentQuestion][Number(index)].species,
        birdsData[currentQuestion][Number(index)].image, birdsData[currentQuestion][Number(index)].description,
        birdsData[currentQuestion][Number(index)].audio)

    let audioPlayers = document.querySelectorAll('.control-audio')

    if (audioPlayers.length) {
        audioPlayers.forEach(function (audioPlayer, i) {
            let audio = audioPlayer.querySelector("audio");
            let playerButton = audioPlayer.querySelector(".icon-play");

            playerButton.addEventListener('click', (e) => {

                if (e.target.className == 'icon-play buttonPlay double' || e.target.className == 'icon-play double' || e.target.className == 'icon-play double buttonPlay') {
                    let current = e.currentTarget;
                    let audio = current.closest(".control-audio").querySelector("audio");




                    if (playerButton.classList.contains('buttonPlay')) {
                        playerButton.src = './imgs/icons8-pause-button-64.png'
                        playerButton.classList.remove('buttonPlay')

                    } else {
                        playerButton.src = './imgs/icons8-play-button-circled-64.png'
                        playerButton.classList.add('buttonPlay')
                    }

                    if (!audio.paused) {
                        audio.pause();
                    } else {
                        audio.play();
                    }

                    let timeline = audioPlayer.querySelector('.seek-song');
                    let curTime = audioPlayer.querySelector('.current-time')
                    let totalDur = audioPlayer.querySelector('.total-duration')
                    let changeSound = audioPlayer.querySelector('.change_sound')
                    let iconVolume = audioPlayer.querySelector('.icon-volume')
                    let time;

                    timeline.addEventListener('change', function (e) {
                        time = (timeline.value * audio.duration) / 100;
                        audio.currentTime = time;

                    });

                    let getTimer;

                    let getTime = () => {
                        let currentMinutes = Math.floor(audio.currentTime / 60)
                        let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60)
                        let durationMinutes = Math.floor(audio.duration / 60)
                        let durationSeconds = Math.floor(audio.duration - durationMinutes * 60)

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

                        curTime.innerHTML = `${currentMinutes}:${currentSeconds} `
                        totalDur.innerHTML = `${durationMinutes}:${durationSeconds}`
                    }
                    getTime()

                    getTimer = setInterval(() => {
                        getTime()
                    }, 1000)

                    changeSound.addEventListener('change', () => {
                        audio.volume = changeSound.value / 100

                        if (audio.volume === 0) {
                            iconVolume.src = './imgs/icons8-sound-64 (1).png'
                        } else {
                            iconVolume.src = './imgs/icons8-sound-64.png'
                        }

                    })

                    audio.addEventListener('ended', function (e) {
                    /*     console.log('audio finished'); */
                        timeline.value = 0;
                        curTime.innerHTML = `00:00`
                        clearInterval(getTimer);
                        playerButton.src = './imgs/icons8-play-button-circled-64.png'
                        playerButton.classList.add('buttonPlay')
                    });

                    audio.addEventListener('timeupdate', function (e) {
                        let percentagePosition = (100 * audio.currentTime) / audio.duration;
                        timeline.value = percentagePosition;
                    });
                }
            })
        })
    }
}

let checkRight = 0
let scoreNum = 0;
let showScore = (num) => {
    totalScore = 5
    scoreNum += num
/*     console.log('scoreNum', scoreNum) */

    currentScore.innerHTML = `Score: ${scoreNum}`

}


function checkedAnswer(e) {

    e.preventDefault();

    /*  console.log('totalScore',totalScore) */
    let answerChose = (e.target.getAttribute('data-answer'))

    showCardChose(answerChose - 1)

/*     console.log(answerChose) */

    if (!checkRight) {
        if (answerChose == rightAnswer) {
            if (this.querySelector('.list-circle')) {
                this.querySelector('.list-circle').classList.add('correctAnswer');

            }
            pauseTrack()
            playPauseBtn.src = './imgs/icons8-play-button-circled-64.png'
            playPauseBtn.classList.add('buttonPlay')

            birdImgDefault.src = birdsData[currentQuestion][Number(rightAnswer - 1)].image
            birdCurrentName.innerHTML = birdsData[currentQuestion][Number(rightAnswer - 1)].name

            audio.src = './audio/jg-032316-sfx-elearning-correct-answer-sound-3 (mp3cut.net).mp3'
            audio.pause()
            audio.currentTime = 0
            audio.play()
            quizNext.disabled = false;
            checkRight = 1
            showScore(totalScore)
        } else {
            if (this.querySelector('.list-circle')) {
                this.querySelector('.list-circle').classList.add('wrongAnswer');
            }

            audio.src = './audio/jg-032316-sfx-elearning-incorrect-answer-sound-3 (mp3cut.net).mp3'
            audio.pause()
            audio.currentTime = 0
            audio.play()
                --totalScore
            if (totalScore <= 0) {
                totalScore = 0
            }
        }
    }
}

let clickedAnswer = () => {
    document.querySelectorAll('.list-type').forEach(function (el) {
        el.addEventListener('click', checkedAnswer);
    });
}


let switchShow = (par1, par2) => {
    /*  listQuestions.style.display = par1 */
    buttonReturn.style.display = par1
    buttonStart.style.display = par1
    buttonStartMax.style.display = par2
    totalScoreMax.style.display = par2
    totalScorePage.style.display = par1
    /* buttonsChoose.style.display=par1 */
}


let clickNextBtn = () => {
    quizNext.disabled = true
    defaultBlock.innerHTML = `  Послушайте плеер.<br>Выберите птицу из списка`
    resultPage.style.display = 'none'

        ++currentQuestion
    if (currentQuestion == 6) {
        currentQuestion = 0

        /* scoreNum = 30 */

        resultPage.style.display = 'block'
        buttonReturn.style.display = 'block'
        buttonStart.style.display = 'block'
        buttonStartMax.style.display = 'block'
        totalScoreMax.innerHTML = 'Поздравляю!!! Вы завершили игру со счетом: !'
        totalScorePage.innerHTML = 'Поздравляю!!! Вы завершили игру со счетом: !'
        /*  headerPreview.style.display = 'block'
         greetingGame.style.display = 'block' */
        if (scoreNum === 30) {

            switchShow('none', 'block')
            /*  buttonReturn.style.display = 'none'
             buttonStart.style.display = 'none'
             buttonStartMax.style.display = 'block'
             totalScoreMax.style.display = 'block'
             totalScorePage.style.display = 'none' */
            /* buttonsChoose.style.display = 'block' */
            buttonsChoose.style.display = 'none'
            maxButtonsChoose.style.display = 'flex';
            listQuestions.style.display = 'none'
            totalScoreMax.innerHTML = 'Поздравляю!!! Вы победили игру со счетом: 30 - это максимальный бал !!!'
        } else if (scoreNum < 30) {

            switchShow('block', 'none')
            /*      buttonReturn.style.display = 'block'
                 buttonStart.style.display = 'block'
                 buttonStartMax.style.display = 'none'
                 totalScoreMax.style.display = 'none'
                 totalScorePage.style.display = 'block' */
            /*  buttonsChoose.style.display = 'flex' */
            buttonsChoose.style.display = 'flex'
            maxButtonsChoose.style.display = 'none';
            listQuestions.style.display = 'none'
            totalScorePage.innerHTML = `Поздравляю!!! Вы завершили игру со счетом: ${scoreNum} !`

        }


        buttonStart.addEventListener('click', () => {
        /*     console.log('start') */
            /* resultPage.style.display = 'none' */
            listQuestions.style.display = 'none'
            buttonReturn.style.display = 'none'
            buttonStart.style.display = 'none'
            buttonStartMax.style.display = 'none'
            totalScoreMax.style.display = 'none'
            headerPreview.style.display = 'block'
            greetingGame.style.display = 'block'
            totalScorePage.style.display = 'none'
            footer.style.display = 'block'
            scoreNum = 0
            currentScore.innerHTML = `Score: 0`
            buttonsChoose.style.display = 'none'
            maxButtonsChoose.style.display = 'none';
            /*   headerPreview.style.display = 'none' */
            /*   listQuestions.style.display = 'none' */
            /* totalScoreMax.style.display = 'none' */
        })

        buttonReturn.addEventListener('click', () => {
            listQuestions.style.display = 'block'
            buttonReturn.style.display = 'none'
            buttonStart.style.display = 'none'
            buttonStartMax.style.display = 'none'
            totalScoreMax.style.display = 'none'
            headerPreview.style.display = 'none'
            greetingGame.style.display = 'none'
            totalScorePage.style.display = 'none'
            footer.style.display = 'none'
            scoreNum = 0
            currentScore.innerHTML = `Score: 0`
            resultPage.style.display = 'none'
            buttonsChoose.style.display = 'none'
            maxButtonsChoose.style.display = 'none';
            /* totalScoreMax.style.display = 'none' */
            /*  headerPreview.style.display = 'block' */
            /*  */
        })

        buttonStartMax.addEventListener('click', () => {
            listQuestions.style.display = 'none'
            buttonReturn.style.display = 'none'
            buttonStart.style.display = 'none'
            buttonStartMax.style.display = 'none'
            totalScoreMax.style.display = 'none'
            headerPreview.style.display = 'block'
            greetingGame.style.display = 'block'
            totalScorePage.style.display = 'none'
            footer.style.display = 'block'
            scoreNum = 0
            currentScore.innerHTML = `Score: 0`
            buttonsChoose.style.display = 'none'
            maxButtonsChoose.style.display = 'none';
            /* headerPreview.style.display = 'none' */
        })
    }
    showData(currentQuestion)
}

let currentQuestionChose = (selectQuestion) => {

    for (let i = 0; i < listQuestion.length; i++) {
       /*  console.log(currentQuestion) */
        if (selectQuestion == i) {
            listQuestion[i].className = 'list-question' + " " + "list-question_active"
        } else {
            listQuestion[i].className = 'list-question'
        }
        /*  console.log(listQuestion[i].className ='list-question'+" " + "list-question_active" ) */
    }
}

let curNum = 0;
let returnCurrentAnswer = () => {
    ++curNum

    if (curNum == 7) {
        curNum = 1
    }
    return curNum
}

window.onload = function () {
    let iconPlay = document.querySelector('.buttonPlay')
    iconPlay.addEventListener("click", playerCurrent);
}

let playerCurrent = () => {
  /*   console.log(currentQuestion + 1) */
    playPauseTrack(),
    changeIconPlay()
    playPause()
}

let playPauseBtn = document.querySelector('.icon-play');
let soundBtn = document.querySelector('.icon-volume');
let lineSong = document.querySelector('.seek-song');
let lineSound = document.querySelector('.change_sound');
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let curr_track = document.createElement('audio');

let isPlaying = false;
let updateTimer;


let reset = () => {
    currentTime.innerHTML = '00:00'
    totalDuration.innerHTML = '00:00'
    pauseTrack()
    curr_track.currentTime = 0
    lineSong.value = 0
/*     console.log('asd') */
}

let loadTrack = (track) => {
    reset();
    clearInterval(updateTimer);
    curr_track.src = track;
    curr_track.load()
    updateTimer = setInterval(setUpdate, 1000)
/*     console.log(track) */
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
}

loadTrack(birdsData[currentQuestion][Number(rightAnswer - 1)].audio)

quizNext.addEventListener('click', () => {
    birdImgDefault.src = './imgs/bird.06a46938.jpg'
    birdCurrentName.innerHTML = '*****'
    playPauseBtn.src = './imgs/icons8-play-button-circled-64.png'
    playPauseBtn.classList.add('buttonPlay')

    returnCurrentAnswer()
    currentQuestionChose(++selectQuestion)
    randomInteger(1, 6)
    clickNextBtn()
    if (selectQuestion == 5) {
        selectQuestion = -1

    }
    loadTrack(birdsData[currentQuestion][Number(rightAnswer - 1)].audio)
  /*   console.log('2', ) */
})
currentQuestionChose(selectQuestion)


export {
    returnCurrentAnswer,
    showData,
    clickedAnswer,

}