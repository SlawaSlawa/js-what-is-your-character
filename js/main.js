
const content = document.querySelector('.content');
let counterQuestion = 0;
let counterAnswers = 0;
let numberOfTest = 0;

function init() {
    renderCard(dbArray);
    startListener();
}

// function renderTitle() {
// 	const title = document.querySelector('.title');
// }

function renderCard(data) {
	const {id, title, questions, answers} = data[numberOfTest];

	const answerList = document.createElement('ul');
	answerList.classList.add('answer-list');

	answers[counterAnswers].forEach( item => {
	            			answerList.insertAdjacentHTML('beforeend', `
	            				<li class="answer-list__item">
				                    <span class="answer-list__marker">
				                        а)
				                    </span>
									${item}            						
                				</li>`
                			);
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
}

function startListener() {
	const answerListItems = document.querySelectorAll('.answer-list__item');
    answerListItems.forEach(item => {
        item.addEventListener('click', event => {
            const target = event.target;

            answerListItems.forEach(item => {
                item.classList.remove('answer-list__item--active');
            });
            target.classList.add('answer-list__item--active');
        });
    });
}




init();