import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './../../css/photographer.css';
import {
  getFetch,
  createElement,
  countTotalLikes,
  createGenericElement,
} from '../utils/helpers';
import photographerFactory from '../factories/photographer';
import mediaFactory from '../factories/mediaFactory';
let params = new URLSearchParams(window.location.search);
let id = params.get('id'); // Récupère l'id du photographe

async function getPhotographer() {
  const data = await getFetch('./data/photographers.json', 'GET');
  const photographerInfo = data.photographers.filter(
    (photographer) => photographer.id == id
  );
  return photographerInfo;
}

async function getMedia() {
  const data = await getFetch('./data/photographers.json', 'GET');
  const photographerMedia = data.media.filter(
    (media) => media.photographerId == id
  );
  // console.log(photographerMedia);
  return photographerMedia;
}

getMedia();

async function displayPhotographerData(photographerInfo) {
  const photographerSection = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographerInfo);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographerSection.appendChild(userCardDOM);
}

async function displayMedia(photographerMedia) {
  const mediaSection = document.querySelector('.photograph-medias');
  photographerMedia.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
  const encart = document.querySelector('.photographer-price');
  const likes = countTotalLikes(photographerMedia);
  encart.innerHTML += likes;
}

export default async function init() {
  const photographer = await getPhotographer();
  displayPhotographerData(photographer?.[0] || []);
  const media = await getMedia();
  console.log(media);
  displayMedia(media);
}
init();
