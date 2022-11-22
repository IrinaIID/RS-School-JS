import birdsData from './birdinfo.js';
import winDescription from './win-description.js'

// check category

let arrPlayCategory = [];
let numCategory;
let gameStart = false;
let numCurrentQuestion = 1;

const blockBtnAnswer = document.querySelector('.block-choice-buttons');
const allBtnCategories = document.querySelectorAll('.btn-category-selection');
const greetingMessage = document.querySelector('.question-content-choice-2');
const cardAboutBird = document.querySelector('.question-content-choice');
const questionContent = document.querySelector('.question-content');
const currentQuestion = document.querySelector('.span-num-question');

const formRestart = document.querySelector('.form-restart');
const checkedCategory = document.querySelector('.checked-category');


allBtnCategories.forEach(btn => {
  btn.addEventListener('click', () => {
    checkedCategory.textContent = btn.innerHTML;
    checkedCategory.style.display = 'flex';
    formRestart.style.display = 'block';

    allBtnCategories.forEach(elem => {
      elem.style.display = 'none';
    });

    numCategory = btn.value;
    arrPlayCategory = birdsData[numCategory];
    shuffle(arrPlayCategory);
    questionContent.classList.add('question-content-on');
    greetingMessage.style.display = 'block';
    cardAboutBird.style.display = 'none';
    gameStart = false;
    currentQuestion.textContent = numCurrentQuestion;
    setCards();
  });
});


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}


//  audioplyer-Question

const audioQuestion = new Audio();
let isPlay = false;
const playBtnQestion = document.querySelector('.play-btn-question');


function playAudio() {
  playBtnQestion.classList.toggle('pause');
  audioQuestion.src = arrPlayCategory[numCurrentQuestion - 1].audio;
  audioQuestion.currentTime = 0;

  if(gameStart === false) {
    greetingMessage.style.display = 'none';
    cardAboutBird.style.display = 'flex';
    gameStart = true;
    blockBtnAnswer.style.display = 'flex';
  }

  if (!isPlay) {
      audioQuestion.play();
      isPlay = true;
      audioCard.pause();
      isPlayCard = false;
      playBtnCard.classList.toggle('pause');
  } else {
      audioQuestion.pause();
      isPlay = false;
  }
}


playBtnQestion.addEventListener('click', playAudio);


// smart player

//click on timeline to skip around
const timelineQuestion = document.querySelector('.timeline-question');
const progressQuestion = document.querySelector('.progress-question');

timelineQuestion.addEventListener('click', e => {
  const timelineWidth = window.getComputedStyle(timelineQuestion).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audioQuestion.duration;
  progressQuestion.style.width = e.offsetX + 'px';

  audioQuestion.currentTime = timeToSeek;
}, false);


setInterval(() => {
    progressQuestion.style.width = audioQuestion.currentTime / audioQuestion.duration * 100 + '%';

    const timePlayingTrackQuestion = document.querySelector('.current-music-time-question');
    timePlayingTrackQuestion.textContent = getTimeCodeFromNum(audioQuestion.currentTime);
  }, 500);


// //turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num, 10);
    let minutes = parseInt((seconds / 60), 10);
    seconds -= minutes * 60;

    return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}


// sound on/off
const soundIconOnQuestion = document.querySelector('.sound-on-question');
const soundIconOffQuestion = document.querySelector('.sound-off-question');


soundIconOnQuestion.addEventListener('click', () => {
    audioQuestion.muted = true;
    soundIconOnQuestion.style.display = 'none';
    soundIconOffQuestion.style.display = 'block';
  });

  soundIconOffQuestion.addEventListener('click', () => {
    audioQuestion.muted = false;
    soundIconOffQuestion.style.display = 'none';
    soundIconOnQuestion.style.display = 'block';
  });



// to change volume
const volumeSliderQuestion = document.querySelector('.volume-slider-question');

volumeSliderQuestion.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSliderQuestion).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audioQuestion.volume = newVolume;

  const volumePercentageQuestion = document.querySelector('.volume-percentage-question');
  volumePercentageQuestion.style.width = newVolume * 100 + '%';
}, false);


// show game board

const arrBtnAnswers = document.querySelectorAll('.btn-answer');

function setCards() {
  arrPlayCategory.forEach(info => {
    let num = +info.id;
    arrBtnAnswers[num-1].textContent = `${info.name}`
  })
}


// right/wrong answer

const nextBtn = document.querySelector('.btn-next');
let checkedBird;

const score = document.querySelector('.p-num-score');
let currentScoreQuestion = 5;
let questionComplete = false;

const cardNameBird = document.querySelector('.p-name-bird-choice');

const cardSpeciesBird = document.querySelector('.p-card-species');
const cardDescriptionBird = document.querySelector('.choice-description-p');
const cardImgBird = document.querySelector('.img-question-choice');

const questionNameBird = document.querySelector('.p-name-bird');
const questionImgBird = document.querySelector('.img-question');

// answer sound
const audioAnswerSound = new Audio();

arrBtnAnswers.forEach(btnAnswer => {

  function fillBirdCard(answer) {
    arrPlayCategory.forEach(elem => {
      if (elem.name === answer.innerHTML) {
        checkedBird = elem;
        cardNameBird.textContent = elem.name;
        cardSpeciesBird.textContent = `Вид: ${elem.species}`;
        cardDescriptionBird.textContent = elem.description;
        cardImgBird.style.background = `url('${elem.image}')`;
        cardImgBird.style.backgroundSize = 'cover';
      }
    })
  }

  function fillBirdQuestion() {
    questionNameBird.textContent = arrPlayCategory[numCurrentQuestion - 1].name;
    questionImgBird.style.background = `url('${arrPlayCategory[numCurrentQuestion - 1].image}')`;
    questionImgBird.style.backgroundSize = 'cover';
  }


  btnAnswer.addEventListener('click', () => {
    if (btnAnswer.innerHTML === arrPlayCategory[numCurrentQuestion - 1].name) {
      nextBtn.classList.add('btn-next-active');
      btnAnswer.classList.add('btn-answer-right');
      audioQuestion.pause();
      audioAnswerSound.src = '../../assets/sounds/sound-right.mp3';
      audioAnswerSound.play();
      fillBirdQuestion();
      fillBirdCard(btnAnswer);
      if (questionComplete === false) {
        score.textContent = +score.innerHTML + currentScoreQuestion;
      }
      questionComplete = true;
      currentScoreQuestion = 5;
    } else {
      fillBirdCard(btnAnswer);
      if (questionComplete === false) {
        if (!btnAnswer.classList.contains('btn-answer-wrong')) {
          currentScoreQuestion -= 1;
        }
        btnAnswer.classList.add('btn-answer-wrong');
        audioAnswerSound.src = '../../assets/sounds/sound-wrong.mp3';
        audioAnswerSound.play();
      }
    }
  })

})


// btn Next - next question

function cleanBirdCard() {
  arrPlayCategory.forEach(elem => {
    elem.name === '';
    checkedBird = elem;
    cardNameBird.textContent = '*******';
    cardSpeciesBird.textContent = '';
    cardDescriptionBird.textContent = '';
    cardImgBird.style.background = 'rgba(29, 29, 29, 0.3)';
  })
}

function cleanBirdQuestion() {
  questionNameBird.textContent = '*******';
  questionImgBird.style.background = "url('../../assets/icons/bird-thin.png') no-repeat";
  questionImgBird.style.backgroundSize = 'cover';
}

function stopAudio() {
  if (isPlay) {
    audioQuestion.pause();
    isPlay = false;
    playBtnQestion.classList.toggle('pause');
  }
  if (isPlayCard) {
    audioCard.pause();
    isPlayCard = false;
    playBtnCard.classList.toggle('pause');
  }
}


const popUpAll = document.querySelector('.popup-win-all');

function fillPopUp() {
  const popUpCategory = document.querySelector('.p-popUp-category');
  const popUpScore = document.querySelector('.popup-span-score');
  const popUpTextResult = document.querySelector('.popup-text-result');
  let numScore = +score.innerHTML;

  if (numScore === 30) {
    popUpTextResult.textContent = winDescription[0]
  } else if (numScore >= 25) {
    popUpTextResult.textContent = winDescription[1]
  } else if (numScore >= 18) {
    popUpTextResult.textContent = winDescription[2]
  } else if (numScore >= 10) {
    popUpTextResult.textContent = winDescription[3]
  } else {
    popUpTextResult.textContent = winDescription[4]
  }

  popUpCategory.textContent = `Подборка ${+numCategory + 1}`;
  popUpScore.textContent = score.innerHTML;
}

function startNextQuestion() {

  if (nextBtn.classList.contains('btn-next-active')) {
    questionComplete = false;
    currentScoreQuestion = 5;
    numCurrentQuestion += 1;
    if (numCurrentQuestion === 7) {
      fillPopUp();
      popUpAll.classList.add('popup-win-all-on');
    }
    nextBtn.classList.remove('btn-next-active');
    gameStart === false;
    arrBtnAnswers.forEach(btn => {
      btn.classList.remove('btn-answer-wrong');
      btn.classList.remove('btn-answer-right');
    });
    currentQuestion.textContent = numCurrentQuestion;

    stopAudio();
    cleanBirdCard();
    cleanBirdQuestion();
  }
}

nextBtn.addEventListener('click', startNextQuestion);


// player birdCard

const audioCard = new Audio();
let isPlayCard = false;
const playBtnCard = document.querySelector('.play-btn-card');


function playAudioCard() {
  playBtnCard.classList.toggle('pause');
  audioCard.src = checkedBird.audio;
  audioCard.currentTime = 0;

  if (!isPlayCard) {
      audioCard.play();
      isPlayCard = true;
      audioQuestion.pause();
      isPlay = false;
      playBtnQestion.classList.toggle('pause');
  } else {
      audioCard.pause();
      isPlayCard = false;
  }
}


playBtnCard.addEventListener('click', playAudioCard);


// smart player

//click on timeline to skip around
const timelineCard = document.querySelector('.timeline-card');
const progressCard = document.querySelector('.progress-card');

timelineCard.addEventListener('click', e => {
  const timelineWidth = window.getComputedStyle(timelineCard).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audioCard.duration;
  progressCard.style.width = e.offsetX + 'px';

  audioCard.currentTime = timeToSeek;
}, false);



setInterval(() => {
    progressCard.style.width = audioCard.currentTime / audioCard.duration * 100 + '%';

    const timePlayingTrackCard = document.querySelector('.current-music-time-card');
    timePlayingTrackCard.textContent = getTimeCodeFromNum(audioCard.currentTime);
  }, 500);


// sound on/off
const soundIconOnCard = document.querySelector('.sound-on-card');
const soundIconOffCard = document.querySelector('.sound-off-card');


soundIconOnCard.addEventListener('click', () => {
    audioCard.muted = true;
    soundIconOnCard.style.display = 'none';
    soundIconOffCard.style.display = 'block';
  });

  soundIconOffCard.addEventListener('click', () => {
    audioCard.muted = false;
    soundIconOffCard.style.display = 'none';
    soundIconOnCard.style.display = 'block';
  });



// to change volume
const volumeSliderCard = document.querySelector('.volume-slider-card');

volumeSliderCard.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSliderCard).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audioCard.volume = newVolume;

  const volumePercentageCard = document.querySelector('.volume-percentage-card');
  volumePercentageCard.style.width = newVolume * 100 + '%';
}, false);