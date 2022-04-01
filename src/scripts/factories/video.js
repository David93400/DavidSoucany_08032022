import { createGenericElement } from '../utils/helpers';

export default function videoFactory(data) {
  const { id, photographerId, title, media, likes, date, price } = data;

  function getCardDOM() {
    const videoContainer = createGenericElement('div', null, 'video-container');
    const videoTitle = createGenericElement('h3', title, 'video-title');
    const numberLikes = createGenericElement('p', likes, 'video-likes');
    const video = createGenericElement('video', null, 'video', [
      { name: 'src', value: `./assets/medias/${data.video}` },
    ]);
    const heart = createGenericElement('i', null, 'fa-heart fa-solid');
    numberLikes.appendChild(heart);
    videoContainer.appendChild(video);
    videoContainer.appendChild(videoTitle);
    videoTitle.appendChild(numberLikes);
    return videoContainer;
  }

  return { id, photographerId, getCardDOM };
}
