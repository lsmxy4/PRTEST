const container = document.querySelector('#container');
const title = document.querySelector('#container h1');
const playBtn = document.querySelector('.btn-wrap a.play');
const stopBtn = document.querySelector('.btn-wrap a.stop');

let play = null; // 처음엔 멈춘 상태

function getRandomColor() {
    const hex = '#' + Math.random().toString(16).slice(2, 8).padEnd(6, '0');
    return hex;
}

function bgChange() {
    const randomColor = getRandomColor();
    container.style.backgroundColor = randomColor;
    title.textContent = randomColor.toUpperCase();
}

// Stop 버튼
stopBtn.addEventListener('click', (e) => {
    e.preventDefault(); // a 태그 기본 동작 방지
    clearInterval(play);
    play = null;
});

// Play 버튼
playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!play) {
        play = setInterval(bgChange, 1000);
    }
});