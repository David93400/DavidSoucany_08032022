import { createGenericElement } from '../utils/helpers';

export default function videoFactory(media, i) {
  const { id, photographerId, title, likes } = media;

  function getCardDOM() {
    const videoContainer = createGenericElement(
      'div',
      null,
      'video-container media-card',
      [{ name: 'index', value: i }]
    );
    const videoTitle = createGenericElement('h3', title, 'video-title');
    const numberLikes = createGenericElement('p', likes, 'video-likes', [
      { name: 'likeindex', value: i },
      { name: 'tabindex', value: i + 6 },
      { name: 'aria-label', value: `presser Entrer pour aimer cette vidéo` },
    ]);
    const video = createGenericElement('video', null, 'video', [
      { name: 'index', value: i },
      { name: 'alt', value: `vidéo de ${media.video}` },
      {
        name: 'aria-label',
        value: `presser Entrer pour ouvrir la vidéo de ${title}`,
      },
      { name: 'tabindex', value: i + 6 },
    ]);
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    const source = createGenericElement('source', null, null, [
      { name: 'src', value: `./assets/medias/${media.video}` },
      { name: 'type', value: 'video/mp4' },
    ]);
    video.appendChild(source);
    const heart = createGenericElement('i', null, 'fa-regular fa-heart');
    numberLikes.appendChild(heart);
    videoContainer.appendChild(video);
    videoContainer.appendChild(videoTitle);
    videoTitle.appendChild(numberLikes);
    return videoContainer;
  }

  return { id, photographerId, getCardDOM };
}
