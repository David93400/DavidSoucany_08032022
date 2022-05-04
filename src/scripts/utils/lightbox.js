import { createGenericElement } from './helpers';

const createLightbox = (title) => {
  if (document.querySelector('.modalPicture')) return;
  const modalPicture = createGenericElement('div', '', 'modalPicture', [
    { name: 'id', value: 'myModal' },
  ]);
  const mediaTitle = createGenericElement('h3', title, 'media-title');
  const modalContentDom = createGenericElement('div', '', 'modal-content');
  const lightboxDom = createGenericElement('div', '', 'mySlides');
  document.querySelector('#main').after(modalPicture);
  return modalPicture.append(lightboxDom, modalContentDom, mediaTitle);
};

function closePictureModal() {
  document.querySelector('.modalPicture').remove();
  location.reload();
}

const setLightbox = (data, index) => {
  console.log('lightbox');
  let content = '';
  let modalMedia = '';
  const { title } = data[index];
  if (data[index].image !== undefined) {
    const { image } = data[index];
    content = `./assets/medias/${image}`;
    modalMedia = createGenericElement('img', null, 'photo photo-modal', [
      { name: 'src', value: content },
      { name: 'alt', value: `${content}` },
      { name: 'index', value: index },
    ]);
  } else {
    const { video } = data[index];
    content = `./assets/medias/${video}`;
    modalMedia = createGenericElement('video', null, 'video video-modal', [
      { name: 'controls', value: true },
      { name: 'index', value: index },
    ]);
    modalMedia.autoplay = true;
    modalMedia.muted = true;
    modalMedia.loop = true;
    const source = createGenericElement('source', null, null, [
      { name: 'src', value: content },
      { name: 'type', value: 'video/mp4' },
    ]);
    modalMedia.appendChild(source);
  }

  createLightbox(title);

  const mediaModal = document.querySelector('.mySlides');
  const closeBtn = createGenericElement('i', '', 'fa-solid fa-xmark close');
  const previousBtn = createGenericElement('span', '<', 'prev');
  const nextBtn = createGenericElement('span', '>', 'next');

  const nextSlide = () => {
    closePictureModal();
    const nextIndex = index + 1;
    if (nextIndex < data.length) {
      return setLightbox(data, nextIndex);
    }
    return setLightbox(data, 0);
  };

  const previsousSlide = () => {
    closePictureModal();
    const nextIndex = index - 1;
    if (nextIndex >= 0) {
      return setLightbox(data, nextIndex);
    }
    return setLightbox(data, data.length - 1);
  };

  document.onkeydown = function (e) {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      previsousSlide();
    }
  };

  nextBtn.addEventListener('click', nextSlide);
  previousBtn.addEventListener('click', previsousSlide);
  mediaModal.appendChild(closeBtn);
  mediaModal.appendChild(previousBtn);
  mediaModal.appendChild(nextBtn);
  mediaModal.appendChild(modalMedia);
  modalMedia.after(nextBtn);
  modalMedia.after(closeBtn);
  closeBtn.onclick = () => {
    closePictureModal();
  };
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented) {
      return;
    }
    if (e.key === 'Escape') {
      closePictureModal();
    }
    e.preventDefault();
  });
};
export { setLightbox };
