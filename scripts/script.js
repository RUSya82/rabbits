const gamePlay = document.querySelector('.square-body');
const reset = document.querySelector('.btn-reset');

function clickToButton(event) {
    const btn = event.target.closest('.arrow');
    const elem = event.target.closest('.block');
    if (btn) {
        if (btn.classList.contains('right')) {
            moveLeft(elem);
        } else if (btn.classList.contains('left')) {
            moveRight(elem);
        } else if (btn.classList.contains('top')) {
            moveTop(elem);
        } else if (btn.classList.contains('bottom')) {
            moveDown(elem);
        }

    }
}
const moveLeft = function (elem) {
    const nextElem = elem.nextElementSibling;
    nextElem && nextElem.after(elem);
}
const moveRight = function (elem) {
    const prevElem = elem.previousElementSibling;
    prevElem && prevElem.before(elem);
}
const moveTop = function (elem) {
    const elements = [...document.querySelectorAll('.block')];      //собираем в массив
    const elementIndex = elements.findIndex(item => item === elem);
    const toggleElem = elements[ elementIndex - 5]; //ищем элемент перед которым вставляем по индексу
    const prevElem = elements[elementIndex - 1];   //ищем предыдущий элемент
    toggleElem && (toggleElem.after(elem) || prevElem.after(toggleElem)); //есди toggleElem есть, то вставляем после него наш элемент, а после предыдущего вставляем toggleElem
}
const moveDown = function (elem) {
    const elements = [...document.querySelectorAll('.block')];
    const elementIndex = elements.findIndex(item => item === elem);
    const toggleElem = elements[elementIndex + 5];
    const prevElem = elements[elementIndex + 1];
    toggleElem && (toggleElem.before(elem) || prevElem.before(toggleElem));
}
const resetAll = function () {
    const elements = [...document.querySelectorAll('.block')];
    elements.sort((a, b) => +a.querySelector('.block-number').textContent - b.querySelector('.block-number').textContent );
    gamePlay.prepend(elements[0]);
    for (let i = 1; i < elements.length; i++){
        elements[i-1].after(elements[i]);
    }
}

gamePlay.addEventListener('click', clickToButton);
reset.addEventListener('click', resetAll);
