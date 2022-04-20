import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './../../css/photographer.css';
import {
  customFetch,
  countTotalLikes,
  displayLikes,
  LikeUnlike,
} from '../utils/helpers';
import { setLightbox } from '../utils/lightbox';
import photographerFactory from '../factories/photographerFactory';
import mediaFactory from '../factories/mediaFactory';
let params = new URLSearchParams(window.location.search);
let id = params.get('id'); // Récupère l'id du photographe

async function getPhotographer() {
  const data = await customFetch('./data/photographers.json', 'GET');
  const photographerInfo = data.photographers.filter(
    (photographer) => photographer.id == id
  );
  return photographerInfo;
}

async function getMedia() {
  const data = await customFetch('./data/photographers.json', 'GET');
  const photographerMedia = data.media.filter(
    (media) => media.photographerId == id
  );
  console.log(photographerMedia);
  return photographerMedia;
}

async function displayPhotographerData(photographerInfo) {
  const photographerSection = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographerInfo);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographerSection.appendChild(userCardDOM);
}

async function displayMedia(photographerMedia) {
  const mediaSection = document.querySelector('.photograph-medias');

  const selector = document.querySelector('.order-select');
  selector.addEventListener('change', (e) => {
    const order = e.target.value;
    console.log(order);
    switch (order) {
      case 'popular':
        photographerMedia.sort((a, b) => b.likes - a.likes);
        break;
      case 'title':
        photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'date':
        photographerMedia.sort(function (a, b) {
          a = new Date(a.date).getTime();
          b = new Date(b.date).getTime();

          return a - b;
        });
    }
    mediaSection.innerHTML = '';
    displayMedia(photographerMedia);
  });

  photographerMedia.forEach((media, i) => {
    const mediaModel = mediaFactory(media, i);
    const mediaCardDOM = mediaModel.getCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });

  const encart = document.querySelector('.photographer-price');
  let likes = displayLikes(countTotalLikes(photographerMedia));
  encart.innerHTML += ` | Likes : ${likes}`;

  const mediaCard = document.querySelectorAll('.photo, .video');
  mediaCard.forEach((card) => {
    card.addEventListener('click', () => {
      let index = card.getAttribute('index');
      setLightbox(photographerMedia, parseInt(index));
    });
  });

  const likeCard = document.querySelectorAll('.photo-likes, .video-likes');
  likeCard.forEach((card) => {
    card.addEventListener('click', () => {
      let index = card.getAttribute('likeindex');
      LikeUnlike(photographerMedia, parseInt(index));
    });
  });
}

export default async function init() {
  const photographer = await getPhotographer();
  displayPhotographerData(photographer?.[0] || []);
  const medias = await getMedia();
  displayMedia(medias);
}
init();
