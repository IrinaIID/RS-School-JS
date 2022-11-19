import birdsData from '../game/birdinfo.js'

console.log(birdsData[0])
const arrAllDirds = birdsData.flat();
console.log(arrAllDirds);
const mainGallery = document.querySelector('.main-gallery');

for (let i = 0; i < arrAllDirds.length; i++) {

  const birdCard = document.createElement('div');
  birdCard.className = 'bird-card';
  mainGallery.append(birdCard);

  const cardImg = document.createElement('div');
  cardImg.className = 'card-img';
  cardImg.style.background = `url('${arrAllDirds[i].image}')`;
  cardImg.style.backgroundSize = 'cover';
  birdCard.append(cardImg);

  const blockCardDescription = document.createElement('div');
  blockCardDescription.classList = 'block-question-choice';
  birdCard.append(blockCardDescription);

  const cardNameBird = document.createElement('p');
  cardNameBird.classList = 'p-name-bird-choice';
  cardNameBird.textContent = arrAllDirds[i].name;
  blockCardDescription.append(cardNameBird);

  // const player = document.createElement('div');
  // player.classList = 'player';
  // blockCardDescription.append(player);

  // const playerControls = document.createElement('div');
  // player.classList = 'player-controls';
  // player.append(playerControls);

  // const btnPlay = document.createElement('button');
  // btnPlay.className = 'play player-icon play-btn';
  // playerControls.append(btnPlay);

  // const soundControls = document.createElement('div');
  // soundControls.className = 'sound-controls';
  // playerControls.append(soundControls);

  // const imgSoundOn = document.createElement('img');
  // imgSoundOn.className = 'sound-icon sound-on';
  // imgSoundOn.src = '../../assets/icons/sound.png';
  // soundControls.append(imgSoundOn);

  // const imgSoundOff = document.createElement('img');
  // imgSoundOff.className = 'sound-icon sound-off';
  // imgSoundOff.src = '../../assets/icons/none-sound.png';
  // soundControls.append(imgSoundOff);

  // const volumeSlider = document.createElement('div');
  // volumeSlider.classList = 'volume-slider';
  // soundControls.append(volumeSlider);

  // const volumePrecentage = document.createElement('div');
  // volumePrecentage.className = 'volume-percentage';
  // volumeSlider.append(volumePrecentage);

  // const timeControls = document.createElement('div');
  // timeControls.className = 'time-controls';
  // player.append(timeControls);

  // const timeLine = document.createElement('div');
  // timeLine.className = 'timeline';
  // timeControls.append(timeLine);

  // const timeProgress = document.createElement('div');
  // timeProgress.className = 'progress';
  // timeLine.append(timeProgress);

  // const playerTime = document.createElement('div');


}


// const cell = document.createElement('div');
// cell.className = 'cell';
// cell.style.width = `${sizeCell}px`
// cell.style.height = `${sizeCell}px`