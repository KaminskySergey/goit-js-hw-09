// / Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

// all modules
import Notiflix from 'notiflix';



const input = document.querySelector('#datetime-picker')
// console.log(input)
const button = document.querySelector('[data-start]')
// console.log(button)
const valueDays = document.querySelector('[data-days]')
// console.log(valueDays)
const valueHours = document.querySelector('[data-hours]')
// console.log(valueHours)
const valueMinutes = document.querySelector('[data-minutes]')
// console.log(valueMinutes)
const valueSeconds = document.querySelector('[data-seconds]')
// console.log(valueSeconds)
const span = document.querySelectorAll('.value')




let timerId = null;

disabledButtonOpen()



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    
    onClose(selectedDates) {
        let inputTime =  selectedDates[0].getTime();  // выбранное время в инпуте
        console.log(inputTime)
        let currentTime = Date.now() // теперешнее время
        console.log(currentTime)
        if(inputTime < currentTime){
            Notiflix.Notify.failure('Что ты делаешь? Не тупи!');
            // alert("Please choose a date in the future")
        }
        else {
            button.disabled = false;
            currentTime = selectedDates[0]
            console.log(currentTime)
            Notiflix.Notify.success('А ты харош!!!');
        }
        
        button.addEventListener('click', ()=>{
            let timerId = setInterval(() => {
                const currentDateTime = Date.now();
                console.log(inputTime)
                console.log(currentDateTime)
                const deltaTime = inputTime - currentDateTime; // получаем разницу времени
                console.log(deltaTime)
                const resultTime = convertMs(deltaTime)
                changeTextTimer(resultTime)
                
                if(deltaTime <= 0){
                    clearInterval(timerId)
                    // не очень красиво, но по другому не получилось
                    valueDays.textContent = '00';
                    valueHours.textContent = '00';
                    valueMinutes.textContent = '00';
                    valueSeconds.textContent = '00';
                }
            }, 1000);

            if(setInterval){
                disabledButtonOpen()
                disabledInputOpen()
            }
            
            
        })
  }

}
function changeTextTimer({ days, hours, minutes, seconds }){
    valueDays.textContent = days;
    valueHours.textContent = hours;
    valueMinutes.textContent = minutes;
    valueSeconds.textContent = seconds;
}

function disabledButtonOpen(){
    button.disabled = true;
}

function disabledInputOpen(){
    input.disabled = true;
}







function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  flatpickr(input, options);