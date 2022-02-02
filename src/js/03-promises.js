import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRf = document.querySelector('.form');

formRf.addEventListener('submit', onStart);

function onStart(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount }
  } = e.currentTarget;

  let qwantity = null;
  let delayPlusStep = Number(delay.value);

  for (qwantity = 1; qwantity <= Number(amount.value); qwantity += 1) {
    createPromise(qwantity, delayPlusStep)
    .then(onSuccess)
      .catch(onFailure);
    
    delayPlusStep += Number(step.value);
  }
};


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });

    }, delay)
  })
}

function onSuccess({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onFailure({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}




