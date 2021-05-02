'use strict';

const content = document.querySelector('.content');

function init() {
    renderCard();
    startListener();
}

function renderCard() {
	console.log('renderCard');
    content.textContent = '';

    const card = `
		<div class="question">
                <span class="question__number">1.</span> Часто ли вы задумываетесь над тем, какое влияние оказывают ваши поступки на окружающих:
            </div>
            <!-- /.question -->
            <ul class="answer-list">
                <li class="answer-list__item">
                    <span class="answer-list__marker">
                        а)
                    </span> очень редко;
                </li>
                <li class="answer-list__item">
                    <span class="answer-list__marker">
                        б)
                    </span> редко;
                </li>
                <li class="answer-list__item">
                    <span class="answer-list__marker">
                        в)
                    </span> достаточно часто;
                </li>
                <li class="answer-list__item">
                    <span class="answer-list__marker">
                        г)
                    </span> очень часто?
                </li>
            </ul>
        <!-- /.answer-list -->
        <button class="btn-submit">
            Принять
        </button>
        <div class="result">
        </div>
        <!-- /.result -->
	`;

    content.insertAdjacentHTML('afterbegin', card);
}

function startListener() {
	const answerListItems = document.querySelectorAll('.answer-list__item');
	console.log('startListener');
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