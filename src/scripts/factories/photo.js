import {
  closePictureModal,
  createGenericElement,
  openPictureModal,
} from '../utils/helpers';

export default function photoFactory(data) {
  const { id, photographerId, title, image, likes, date, price } = data;
  const photo = `./assets/medias/${image}`;

  function getCardDOM() {
    const photoContainer = createGenericElement('div', null, 'photo-container');
    const photoTitle = createGenericElement('h3', title, 'photo-title');
    const numberLikes = createGenericElement('p', likes, 'photo-likes');
    const picture = createGenericElement('img', null, 'photo', [
      { name: 'src', value: photo },
      { name: 'alt', value: `photo de ${title}` },
    ]);
    picture.onclick = () => {
      openPictureModal();
      const photoModal = document.querySelector('.mySlides');
      const modalPicture = createGenericElement('img', null, 'photo', [
        { name: 'src', value: photo },
        { name: 'alt', value: `photo de ${title}` },
      ]);
      const closeBtn = createGenericElement('i', '', 'fa-solid fa-xmark close');
      const previousBtn = createGenericElement('span', '<', 'prev');
      const nextBtn = createGenericElement('span', '>', 'next');
      modalPicture.classList.add('photo-modal');
      photoModal.appendChild(closeBtn);
      photoModal.appendChild(previousBtn);
      photoModal.appendChild(nextBtn);
      photoModal.appendChild(modalPicture);
      modalPicture.after(nextBtn);
      modalPicture.after(closeBtn);
      closeBtn.onclick = () => {
        closePictureModal();
      };
    };
    const heart = createGenericElement('i', null, 'fa-heart fa-solid');
    numberLikes.appendChild(heart);
    photoContainer.appendChild(picture);
    photoContainer.appendChild(photoTitle);
    photoTitle.appendChild(numberLikes);
    return photoContainer;
  }
  return { id, photographerId, getCardDOM };
}
