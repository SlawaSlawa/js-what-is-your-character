const content = document.querySelector('.content');
let counterQuestion = 0;
let counterAnswers = 0;
let numberOfTest = 0;
let scores = 0;

function init() {
    renderCard(dbArray);
    startListener();
}

// function renderTitle() {
// 	const title = document.querySelector('.title');
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
	        <div class="result">
	        </div>
		`);

    const btnSubmit = document.querySelector('.btn-submit');

    btnSubmit.addEventListener('click', () => {
        let choice = answerList.querySelector('.answer-list__item--active');
        choice = choice.getAttribute('data-target').trim();
        handlerBtnClick(choice, counterQuestion);
    });
}

function handlerBtnClick(choice, questionNum) {

    switch (choice) {
        case 'а':
        scores += keysForCharacterTest[questionNum][0];
            break;
        case 'б':
        scores += keysForCharacterTest[questionNum][1];
            break;
        case 'в':
        scores += keysForCharacterTest[questionNum][2];
            break;
        case 'г':
        scores += keysForCharacterTest[questionNum][3];
            break;
        case 'д':
        scores += keysForCharacterTest[questionNum][4];
            break;
        case 'е':
        scores += keysForCharacterTest[questionNum][5];
            break;
        case 'ж':
        scores += keysForCharacterTest[questionNum][6];
            break;
    }

    console.log(scores);

    if ((counterQuestion) <= (dbArray[numberOfTest].questions.length - 2)) {
    	counterQuestion++;
    	counterAnswers++;
    }else {
    	getResult(scores);
    }
    init();
}

function getResult(scores) {
	alert('Great!!!');
	console.log(scores);
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
            // console.log(target);
        });
    });
}




init();