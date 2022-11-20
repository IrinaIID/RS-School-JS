import birdsData from '../game/birdinfo.js'

const arrAllDirds = birdsData.flat();
const mainGallery = document.querySelector('.main-gallery');

const textMainGallery = document.createElement('div');
textMainGallery.className = 'text-main-gallery';
textMainGallery.textContent = 'Добро пожаловать в галерею птиц! Смотри, слушай и начинай игру. А можешь создать свой птичий хор - просто запускай плеер тех птиц, которых хочешь услышать. Можно получить свмые неожиданные сочетания :-)'
mainGallery.append(textMainGallery);

const formStartGame = document.createElement('form');
formStartGame.action = "../game/index.html";
mainGallery.append(formStartGame);

const btnStartGame = document.createElement('button');
btnStartGame.className = 'btn-start btn-star-gallery';
btnStartGame.textContent = 'Начать игру';
formStartGame.append(btnStartGame);

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
  blockCardDescription.classList = 'block-description';
  birdCard.append(blockCardDescription);

  const cardNameBird = document.createElement('p');
  cardNameBird.classList = 'p-name-bird-choice';
  cardNameBird.textContent = arrAllDirds[i].name;
  blockCardDescription.append(cardNameBird);

  const playerGallery = document.createElement('audio');
  playerGallery.setAttribute('controls', '');
  playerGallery.src = arrAllDirds[i].audio;
  blockCardDescription.append(playerGallery);

  const speciesBird = document.createElement('p');
  speciesBird.className = 'description-bird';
  speciesBird.textContent = `Вид: ${arrAllDirds[i].species}`;
  blockCardDescription.append(speciesBird);

  const descriptionBird = document.createElement('p');
  descriptionBird.className = 'description-bird';
  descriptionBird.textContent = arrAllDirds[i].description;
  blockCardDescription.append(descriptionBird);
}