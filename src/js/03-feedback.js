import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;
let dataForm = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);
reloadPage();

function onInputData(event) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
}

function reloadPage() {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert(`Please fill in all required fields.`);
  }

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  dataForm = {};
}
