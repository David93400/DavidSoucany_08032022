import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './../../css/photographer.css';
import { customFetch, countTotalLikes, setLightbox } from '../utils/helpers';
import photographerFactory from '../factories/photographerFactory';
import mediaFactory from '../factories/mediaFactory';
import { closeContactModal, openContactModal } from '../utils/contactForm';
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

  photographerMedia.forEach((media, i) => {
    const mediaModel = mediaFactory(media, i);
    const mediaCardDOM = mediaModel.getCardDOM();
    mediaSection.appendChild(mediaCardDOM);
    // listener for creating lightbox
    // document.querySelectorAll('.media-card').forEach((card) => {
    //   card.addEventListener('click', () => {
    //     console.log('click');
    //   });
    // });
  });
  const mediaCard = document.querySelectorAll('.photo, .video');
  console.log(mediaCard);
  mediaCard.forEach((card) => {
    card.addEventListener('click', () => {
      let index = card.getAttribute('index');
      console.log(index);
      setLightbox(photographerMedia, index);
    });
  });

  const encart = document.querySelector('.photographer-price');
  const likes = countTotalLikes(photographerMedia);
  encart.innerHTML += ` | Likes : ${likes}`;
}

const contact = document.querySelector('.contact-button');
contact.onclick = () => {
  openContactModal();
};
const closeContact = document.querySelector('.close-contact');
closeContact.onclick = () => {
  closeContactModal();
};

export default async function init() {
  const photographer = await getPhotographer();
  displayPhotographerData(photographer?.[0] || []);
  const medias = await getMedia();
  displayMedia(medias);
}
init();
