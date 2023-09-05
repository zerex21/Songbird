export let cardBird  = (name, species, img, description,sound='') =>{
return(`<div class="bird-card" data-name = "${name}">
<div class="bird-view">
  <div class="bird-img">
    <img src="${img}" alt="${species}">
  </div>
  <div class="bird-show">
    <h2>${name}</h2>
    <h4>${species}</h4>
    <div class="control-audio">

      <div class="bird-song">
        <div class="icon-play-container">
          <img class="icon-play buttonPlay double" src="./imgs/icons8-play-button-circled-64.png" alt="play">
        </div>
        <audio preload="metadata" src="${sound}"></audio>
        <div class="line-player">
          <div class="current-time">00:00</div>
          <input type="range" min="0" max="100" value="0" class="seek-song">
          <div class="total-duration">00:00</div>
        </div>
      </div>
      <div class="icon-volume-container">
        <img class="icon-volume" src="./imgs/icons8-sound-64.png" alt="sound">
        <input type="range" min="0" max="100" value="99" class="change_sound">
      </div>
    </div>
  </div>
</div>
<div class="bird-description">${description}</div>
</div>`)
}
