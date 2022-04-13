import { createGenericElement } from '../utils/helpers';

export default function photographerFactory(data) {
  const { name, portrait, tagline, city, id, country, price } = data;
  const picture = `./assets/photographers/${portrait}`;
  let params = new URLSearchParams(window.location.search);
  let photographerId = params.get('id'); // Récupère l'id du photographe
  function getUserCardDOM() {
    let article;
    const body = document.querySelector('body');
    if (photographerId == id) {
      article = createGenericElement('div', null, 'photograph-info');
    } else {
      article = createGenericElement('a', null, null, [
        { name: 'href', value: `./photographer.html?id=${id}` },
      ]);
    }
    const img = createGenericElement('img', null, 'photographer-img', [
      { name: 'src', value: picture },
      { name: 'alt', value: `photo de ${name}` },
    ]);
    const h2 = createGenericElement('h2', name, 'photographer-name');
    const ville = createGenericElement(
      'p',
      `${city}, ${country}`,
      'photographer-city'
    );
    const description = createGenericElement(
      'p',
      tagline,
      'photographer-description'
    );
    const prix = createGenericElement(
      'p',
      `${price}€ / jour `,
      'photographer-price'
    );

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(ville);
    article.appendChild(description);
    if (photographerId == id) {
      body.appendChild(prix);
    } else {
      article.appendChild(prix);
    }
    return article;
  }
  return { name, picture, getUserCardDOM };
}
