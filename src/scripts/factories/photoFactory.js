import { createGenericElement } from '../utils/helpers';

export default function photoFactory(media, i) {
  const { id, photographerId, title, image, likes, date, price } = media;
  const photo = `./assets/medias/${image}`;

  function getCardDOM() {
    const photoContainer = createGenericElement(
      'div',
      null,
      'photo-container media-card'
    );
    const photoTitle = createGenericElement('h3', title, 'photo-title');
    const numberLikes = createGenericElement('p', likes, 'photo-likes', [
      { name: 'likeindex', value: i },
    ]);
    const picture = createGenericElement('img', null, 'photo', [
      { name: 'src', value: photo },
      { name: 'alt', value: `photo de ${title}` },
      { name: 'index', value: i },
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
