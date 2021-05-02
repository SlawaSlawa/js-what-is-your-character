'use strict';
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