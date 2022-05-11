import { createGenericElement } from '../utils/helpers';

export default function photoFactory(media, i) {
  const { id, photographerId, title, image, likes } = media;
  const photo = `./assets/medias/${image}`;

  function getCardDOM() {
    const photoContainer = createGenericElement(
      'div',
      null,
      'photo-container media-card',
      [{ name: 'index', value: i }]
    );
    const photoTitle = createGenericElement('h3', title, 'photo-title');
    const numberLikes = createGenericElement('p', likes, 'photo-likes', [
      { name: 'likeindex', value: i },
      { name: 'tabindex', value: i + 6 },
      { name: 'aria-label', value: `presser Entrer pour aimer cette photo` },
    ]);
    const picture = createGenericElement('img', null, 'photo', [
      { name: 'src', value: photo },
      { name: 'alt', value: `photo de ${title}` },
      {
        name: 'aria-label',
        value: `presser Entrer pour ouvrir la photo de ${title}`,
      },
      { name: 'index', value: i },
      { name: 'tabindex', value: i + 6 },
    ]);
    const heart = createGenericElement('i', null, 'fa-regular fa-heart');
    numberLikes.appendChild(heart);
    photoContainer.appendChild(picture);
    photoContainer.appendChild(photoTitle);
    photoTitle.appendChild(numberLikes);
    return photoContainer;
  }
  return { id, photographerId, getCardDOM };
}
