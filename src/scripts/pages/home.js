import 'core-js/stable';
import 'regenerator-runtime/runtime';
import photographerFactory from '../factories/photographer';
import './../../css/style.css';
import { getFetch } from '../utils/helpers';

async function getPhotographers() {
  const data = await getFetch('./data/photographers.json');
  const photographers = data.photographers;
  console.log(photographers);
  return {
    photographers,
  };
}
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer-section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

export default async function init() {
  const { photographers } = await getPhotographers();
  console.log(photographers);
  displayData(photographers);
}

init();
