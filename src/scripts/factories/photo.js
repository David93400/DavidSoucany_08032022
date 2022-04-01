import { createGenericElement } from '../utils/helpers';

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
    const heart = createGenericElement('i', null, 'fa-heart fa-solid');
    numberLikes.appendChild(heart);
    photoContainer.appendChild(picture);
    photoContainer.appendChild(photoTitle);
    photoTitle.appendChild(numberLikes);
    return photoContainer;
  }
  return { id, photographerId, getCardDOM };
}
