const content = document.querySelector('.content');
let counterQuestion = 0;
let counterAnswers = 0;
let numberOfTest = 0;
let scores = 0;

function init() {
    if (counterQuestion === 0 && counterAnswers === 0) {
        scores = 0;        
    }
    renderCard(dbArray);
    startListener();
}

// function renderTitle() {
//  const title = document.querySelector('.title');
// }

function renderCard(data) {
    const { id, title, questions, answers } = data[numberOfTest];

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
                Принять
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
    }
}

function handlerBtnClick(choice, questionNum) {
    switch (choice) {
        case 'а':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][0];
            break;
        case 'б':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][1];
            break;
        case 'в':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][2];
            break;
        case 'г':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][3];
            break;
        case 'д':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][4];
            break;
        case 'е':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][5];
            break;
        case 'ж':
            scores += dbArray[numberOfTest].keysForCharacterTest[questionNum][6];
            break;
    }

    if ((counterQuestion) <= (dbArray[numberOfTest].questions.length - 2)) {
        counterQuestion++;
        counterAnswers++;
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

    const resultTextBlock = document.createElement('p');
    resultTextBlock.classList.add('result');
    question.textContent = 'Ваш результат:';
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

    btnSubmit.textContent = 'Начать заново';
    scores = 0;

    btnSubmit.addEventListener('click', () => {
        counterQuestion = 0;
        counterAnswers = 0;
        numberOfTest = 0;
        scores = 0;
        init();
    });
}

function startListener() {
    const answerListItems = document.querySelectorAll('.answer-list__item');
    answerListItems.forEach(item => {
        item.addEventListener('click', event => {
            const target = event.target;

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