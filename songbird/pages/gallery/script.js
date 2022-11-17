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

  const player = document.createElement('div');
  player.classList = 'player';
  blockCardDescription.append(player);

  const playerControls = document.createElement('div');
  player.classList = 'player-controls';
  player.append(playerControls);

  



}


// const cell = document.createElement('div');
// cell.className = 'cell';
// cell.style.width = `${sizeCell}px`
// cell.style.height = `${sizeCell}px`