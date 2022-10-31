
import Notiflix from 'notiflix';



const form = document.querySelector('.form')

let delayInput
let stepInput
let amountInput

form.addEventListener('submit', onFormSubmit)


function createPromise(position, delay) {
  
  const shouldResolve = Math.random() > 0.3;
  
  const promise = new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if(shouldResolve){
        resolve({position, delay});
      }
      else{
        reject({position, delay});
      }
    }, delayInput);
  })
  
  return promise;
}


function onFormSubmit(evt){
  evt.preventDefault()
  delayInput =  Number(evt.target.elements.delay.value);
  // console.log(delayInput)
  stepInput = Number(evt.target.elements.step.value);
  // console.log(stepInput)
  amountInput = Number(evt.target.elements.amount.value)
  // console.log(amountInput)

  for(let i = 1; i <= amountInput; i += 1){
    // console.log(amountInput)
    // console.log(stepInput)
    // console.log(delayInput)
    createPromise(i, delayInput)
    .then(({position, delay}) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      
    })
    .catch(({position, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      
    })
    delayInput += stepInput
  }
  
}





