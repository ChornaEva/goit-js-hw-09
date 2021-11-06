import Notiflix from 'notiflix';

const formNode = document.querySelector('.form');
let delayStep;
let amount;
let delay;

formNode.addEventListener('input', event => {
  if (event.target.name==='delay') {
    delay = +event.target.value;
  }
  if (event.target.name === 'step') {
    delayStep = +event.target.value;
   }
 if (event.target.name === 'amount') {
   amount = +event.target.value;
   }
})

formNode.addEventListener('submit', event => {
  event.preventDefault();
  counter(amount, delay, delayStep);
});


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}
 
function counter(amount, delay, delayStep) {
  for (let i = 1; i <= amount; i += 1) {
    
    createPromise(i, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay += delayStep;
  }
}



