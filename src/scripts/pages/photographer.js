import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './../../css/photographer.css';
import './../../css/style.css';
import { getFetch, createElement } from '../utils/helpers';
// import { displayModal, closeModal } from '../utils/contactForm';
import photographerFactory from '../factories/photographer';
import testFactory from '../factories/test';

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
  return [photographerMedia];
}

getPhotographer();
getMedia();

async function displayData(photographerInfo) {
  const photographerSection = document.querySelector('.photograph-portrait');
  const photographerModel = testFactory(photographerInfo);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographerSection.appendChild(userCardDOM);
}

export default async function test() {
  // Récupère les datas des photographes
  const photographer = await getPhotographer();
  // console.log(photographer);
  displayData(photographer);
}
test();
