const content = document.querySelector('.content');
const app = document.querySelector('.app');
let counterQuestion = 0;
let counterAnswers = 0;
let numberOfTest = 0;
let scores = 0;

function init() {
    if (counterQuestion === 0 && counterAnswers === 0) {
        scores = 0;        
    }
    renderTitle();
    renderCard(dbArray);
    toggleBtn();
    startListener();
}

function changeBgColor() {
    const colorIndex = Math.floor(Math.random() * bgColors.length);
    app.style.backgroundColor = bgColors[colorIndex];
}

function renderTitle() {
 const title = document.querySelector('.title');
 title.textContent = dbArray[numberOfTest].title;
}

function toggleBtn() {
    const button = document.querySelector('.btn-submit');
    if (button.disabled) {
        button.disabled = false;
    }else {
        button.disabled = true;
    }
}

function renderCard(data) {
    const { id, title, questions, answers } = data[numberOfTest];
    changeBgColor();

    const answerList = document.createElement('ul');
    answerList.classList.add('answer-list');

    answers[counterAnswers].forEach((item, i) => {
        answerList.insertAdjacentHTML('beforeend', `
                                <li class="answer-list__item">
                                    <span class="answer-list__marker">
                                        ${alphabet[i]}
                                    </span>
                                    ${item}                                 
                                </li>`);
    });

    const card = document.createElement('div');
    card.classList.add('question');

    card.insertAdjacentHTML('beforeend', `
                <span class="question__number">${counterQuestion + 1}.</span> 
                ${questions[counterQuestion]}`);

    content.textContent = '';

    content.insertAdjacentElement('afterbegin', card);
    const answersElement = document.querySelector('.content');
    answersElement.insertAdjacentElement('beforeend', answerList);
    answersElement.insertAdjacentHTML('beforeend', `
            <button class="btn-submit">
                ??????????????
            </button>
        `);

    const btnSubmit = document.querySelector('.btn-submit');
    btnSubmit.addEventListener('click', handlerBtnSubmit);

    function handlerBtnSubmit() {
        let choice = answerList.querySelector('.answer-list__item--active');
        choice = choice.getAttribute('data-target').trim();
        handlerBtnClick(choice, counterQuestion);
    }

    if ((counterQuestion) == (dbArray[numberOfTest].questions.length)) {
        btnSubmit.removeEventListener('click', handlerBtnSubmit);
        getResult(scores);
    }
}

function handlerBtnClick(choice, questionNum) {
    const btnSubmit = document.querySelector('.btn-submit');

    switch (choice) {
        case '??':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][0];
            break;
        case '??':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][1];
            break;
        case '??':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][2];
            break;
        case '??':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][3];
            break;
        case '??':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][4];
            break;
        case '??':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][5];
            break;
        case '??':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][6];
            break;
    }

    if ((counterQuestion) < (dbArray[numberOfTest].questions.length - 1)) {
        counterQuestion++;
        counterAnswers++;
        toggleBtn();
        init();
    } else {
        getResult(scores);
        scores = 0;
    }
}

function getResult(scores) {
    const question = document.querySelector('.question');
    const answerList = document.querySelector('.answer-list');
    const btnSubmit = document.querySelector('.btn-submit');
    btnSubmit.disabled = false;
    const resultTextBlock = document.createElement('p');
    resultTextBlock.classList.add('result');
    question.textContent = '?????? ??????????????????:';
    answerList.remove();

    if (scores < 15) {
        resultTextBlock.textContent = dbArray[numberOfTest].results.less15;
    }
    if (scores > 15 && scores < 25) {
        resultTextBlock.textContent = dbArray[numberOfTest].results.less25;
    }
    if (scores > 26 && scores < 38) {
        resultTextBlock.textContent = dbArray[numberOfTest].results.less38;
    }
    if (scores > 38) {
        resultTextBlock.textContent = dbArray[numberOfTest].results.more38;
    }

    question.insertAdjacentElement('afterend', resultTextBlock);

    btnSubmit.textContent = '???????????? ????????????';
    scores = 0;

    counterQuestion = 0;
    counterAnswers = 0;
    numberOfTest = 0;
    scores = 0;

    btnSubmit.addEventListener('click', resetTest);

    function resetTest() {
        counterQuestion = 0;
        counterAnswers = 0;
        numberOfTest = 0;
        scores = 0;
        btnSubmit.removeEventListener('click', resetTest);
        init();
    }
}

function startListener() {
    const answerListItems = document.querySelectorAll('.answer-list__item');
    answerListItems.forEach(item => {
        item.addEventListener('click', event => {
            const target = event.target;
            toggleBtn();

            answerListItems.forEach(item => {
                item.classList.remove('answer-list__item--active');
                item.removeAttribute('data-target');
            });
            const choice = target.querySelector('.answer-list__marker');
            target.classList.add('answer-list__item--active');
            target.setAttribute('data-target', choice.textContent);
        });
    });
}

init();