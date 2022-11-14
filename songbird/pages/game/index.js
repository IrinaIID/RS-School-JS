import birdsData from './birdinfo.js';

// check category

let arrPlayCategory = [];
let numCategory;
let gameStart = false;
let numCurrentQuestion = 1;
const allBtnCategories = document.querySelectorAll('.btn-category-selection');
const greetingMessage = document.querySelector('.question-content-choice-2');
const cardAboutBird = document.querySelector('.question-content-choice');
const questionContent = document.querySelector('.question-content');
const currentQuestion = document.querySelector('.span-num-question');

allBtnCategories.forEach(btn => {
  btn.addEventListener('click', () => {
    allBtnCategories.forEach(elem => {
      elem.classList.remove('btn-category-selection-checked');
    });
    btn.classList.add('btn-category-selection-checked');
    numCategory = btn.value;
    arrPlayCategory = birdsData[numCategory];
    shuffle(arrPlayCategory);
    console.log(arrPlayCategory);
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

let numSound = 0;

const audioQuestion = new Audio();
let isPlay = false;
const playBtnQestion = document.querySelector('.play-btn-question');


function playAudio() {
  playBtnQestion.classList.toggle('pause');
  audioQuestion.src = arrPlayCategory[numSound].audio;
  audioQuestion.currentTime = 0;

  if(gameStart === false) {
    greetingMessage.style.display = 'none';
    cardAboutBird.style.display = 'flex';
    gameStart = true;
  }

  if (!isPlay) {
      audioQuestion.play();
      isPlay = true;
  } else {
      audioQuestion.pause();
      isPlay = false;
  }
}


// function toggleBtn() {
//     playBtn.classList.toggle('pause');
// }


playBtnQestion.addEventListener('click', playAudio);
// playBtn.addEventListener('click', toggleBtn);

// ?????????
// audioQuestion.addEventListener('ended', () => {
//   playBtnQestion.classList.add('play');
// });


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

arrBtnAnswers.forEach(btnAnswer => {

  const cardNameBird = document.querySelector('.p-name-bird-choice');
  const cardSpeciesBird = document.querySelector('.p-card-species');
  const cardDescriptionBird = document.querySelector('.choice-description-p');
  const cardImgBird = document.querySelector('.img-question-choice');

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

  btnAnswer.addEventListener('click', () => {
    if (btnAnswer.innerHTML === arrPlayCategory[numCurrentQuestion - 1].name) {
      nextBtn.classList.add('btn-next-active');
      btnAnswer.classList.add('btn-answer-right');
      fillBirdCard(btnAnswer)
    } else {
      btnAnswer.classList.add('btn-answer-wrong');
      fillBirdCard(btnAnswer)


    }
  })
})





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
  } else {
      audioQuestion.pause();
      isPlayCard = false;
  }
}


playBtnCard.addEventListener('click', playAudioCard);

// ?????????
// audioQuestion.addEventListener('ended', () => {
//   playBtnQestion.classList.add('play');
// });


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

