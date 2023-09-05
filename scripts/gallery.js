import birdsData from "./birds.js";
import {
   cardBird
} from './birdCardRender.js';

let gallery = document.querySelector('.gallery');


let arr = []

gallery.innerHTML = '';
let renderGallery = () => {
   for (let i of birdsData) {
      if (typeof i == 'object') {
         for (let y = 0; y < i.length; y++) {
            arr.push(i[y].name)
            gallery.innerHTML += cardBird(i[y].name, i[y].species, i[y].image, i[y].description, i[y].audio)

            let audioPlayers = document.querySelectorAll('.control-audio')

            if (audioPlayers.length) {
               audioPlayers.forEach(function (audioPlayer, i) {
                  let audio = audioPlayer.querySelectorAll("audio");

                  let playerButton = audioPlayer.querySelector(".icon-play");

                  playerButton.addEventListener('click', (e) => {
                     /* console.log(e.target.className) */

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
                           /* console.log('audio finished'); */
                           timeline.value = 0;
                           curTime.innerHTML = `00:00`
                           clearInterval(getTimer);
                           playerButton.src = './imgs/icons8-play-button-circled-64.png'
                           playerButton.classList.add('buttonPlay')
                           /*   audio.src ='' */
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

      }

   }
}


export {
   renderGallery,
}