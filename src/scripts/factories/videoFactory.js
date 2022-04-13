import { createGenericElement } from '../utils/helpers';

export default function videoFactory(media, i) {
  const { id, photographerId, title, likes, date, price } = media;

  function getCardDOM() {
    const videoContainer = createGenericElement(
      'div',
      null,
      'video-container media-card'
    );
    const videoTitle = createGenericElement('h3', title, 'video-title');
    const numberLikes = createGenericElement('p', likes, 'video-likes');
    const video = createGenericElement('video', null, 'video', [
      { name: 'controls', value: true },
      { name: 'index', value: i },
    ]);
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    const source = createGenericElement('source', null, null, [
      { name: 'src', value: `./assets/medias/${media.video}` },
      { name: 'type', value: 'video/mp4' },
    ]);
    video.appendChild(source);
    const heart = createGenericElement('i', null, 'fa-heart fa-solid');
    numberLikes.appendChild(heart);
    videoContainer.appendChild(video);
    videoContainer.appendChild(videoTitle);
    videoTitle.appendChild(numberLikes);
    return videoContainer;
  }

  return { id, photographerId, getCardDOM };
}