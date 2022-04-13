const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submit = document.getElementById('submit');
const firstNameError = document.querySelector('#errorFirst');
const lastNameError = document.querySelector('#errorLast');
const mailError = document.querySelector('#errorMail');
const messageError = document.querySelector('#errorMessage');

function openContactModal() {
  const modal = document.getElementById('contact-modal');
  modal.style.display = 'block';
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  modal.style.display = 'none';
}

const displaySuccess = (field, fieldError) => {
  fieldError.classList.add('success');
  field.classList.add('valid');
  field.classList.remove('invalid');
};

const displayError = (field, fieldError) => {
  fieldError.classList.remove('success');
  field.classList.add('invalid');
  field.classList.remove('valid');
};

const validateField = (regex, field, fieldError, long = 0) => {
  if (regex.test(field.value) && field.value.length >= long) {
    displaySuccess(field, fieldError);
    return true;
  }
  displayError(field, fieldError);
  return false;
};

const getInputs = () => {
  const firstName = document.getElementById('first').value;
  const lastName = document.getElementById('last').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  return { firstName, lastName, email, message };
};

const checkForm = (formInputs) => {
  const isValid = {};
  Object.entries(formInputs).map((input) => {
    const key = input[0];
    if (key === 'firstName')
      isValid[key] = validateField(regexName, firstName, firstNameError, 2);
    if (key === 'lastName')
      isValid[key] = validateField(regexName, lastName, lastNameError, 2);
    if (key === 'email')
      isValid[key] = validateField(regexMail, email, mailError);
    if (key === 'message')
      isValid[key] = validateField(regexName, message, messageError, 10);
  });
  const wrongInputs = Object.entries(isValid).filter(([key, value]) => !value);
  return !wrongInputs.length;
};
if (submit !== null) {
  firstName.addEventListener('focusout', () =>
    validateField(regexName, firstName, firstNameError, 2)
  );
  lastName.addEventListener('focusout', () =>
    validateField(regexName, lastName, lastNameError, 2)
  );
  email.addEventListener('focusout', () =>
    validateField(regexMail, email, mailError)
  );
  message.addEventListener('focusout', () =>
    validateField(regexName, message, messageError, 10)
  );

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const inputs = getInputs();
    const formIsValid = checkForm(inputs);
    if (formIsValid) {
      console.log('form is valid', inputs);
      closeContactModal();
    }
  });
}

export { openContactModal, closeContactModal };
