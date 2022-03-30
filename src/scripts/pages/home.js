import 'core-js/stable';
import 'regenerator-runtime/runtime';
import photographerFactory from '../factories/photographer';
import './../../css/style.css';
import { getFetch } from '../utils/helpers';

async function getPhotographers() {
  const data = await getFetch('./data/photographers.json', 'GET');
  const photographers = data.photographers;
  console.log(photographers);
  return {
    photographers,
  };
}
getPhotographers();
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

export default async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
