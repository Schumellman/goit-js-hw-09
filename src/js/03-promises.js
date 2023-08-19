import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      else {
        reject({ position, delay });
      }
    }, delay);
  });
}


function onSubmitForm(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;
  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const promiseValue = Number(amount.value) + 1;
  callNumberPromise(delayValue, stepValue, promiseValue);
}

function callNumberPromise(delayValue, stepValue, promiseValue) {
  challengePromises(1, stepValue);
  for (let i = 0; i < promiseValue; i += 1) {
    delayValue += stepValue;
    challengePromises(i, delayValue);
  }
}
function challengePromises(numberPromis, time) {
  createPromise(numberPromis, time)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
