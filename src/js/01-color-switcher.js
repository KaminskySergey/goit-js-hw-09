const startBtn = document.querySelector('[data-start]')
console.log(startBtn)
const stopBtn = document.querySelector('[data-stop]')
console.log(stopBtn)
const body = document.querySelector('body')
console.log(body)

let timerId = null;

const INTERVAL_TIME = 1000;

startBtn.addEventListener('click', onStartRandomColor)
stopBtn.addEventListener('click', onStopColor)

function onStartRandomColor(){
    startBtn.disabled = true;
    
    timerId = setInterval(() => {
        console.log('hello')
        body.style.backgroundColor = getRandomHexColor()
    }, INTERVAL_TIME);
    
}



function onStopColor(){
body.style.backgroundColor = 'white';
clearInterval(timerId)
startBtn.disabled = false;
}







function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
