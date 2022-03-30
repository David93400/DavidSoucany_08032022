import { createElement } from '../utils/helpers';

export default function testFactory(data) {
  const { name, portrait, tagline, city, id, country, price } = data[0];
  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = createElement('article', null, null);
    const img = createElement('img', null, 'photographer_img', [
      { name: 'src', value: picture },
      { name: 'alt', value: `photo de ${name}` },
    ]);
    const h2 = createElement('h2', name, 'photographer_name');
    const ville = createElement(
      'p',
      `${city}, ${country}`,
      'photographer_city'
    );
    const description = createElement(
      'p',
      `" ${tagline} "`,
      'photographer_description'
    );
    const prix = createElement('p', `${price} €`, 'photographer_price');
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(description);
    article.appendChild(ville);
    article.appendChild(prix);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
