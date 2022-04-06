function openContactModal() {
  const modal = document.getElementById('contact-modal');
  modal.style.display = 'block';
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  modal.style.display = 'none';
}

export { openContactModal, closeContactModal };
