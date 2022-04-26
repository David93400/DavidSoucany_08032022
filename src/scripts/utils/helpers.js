const customFetch = async (url, method = 'GET', headers = {}, body = '') => {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body === '' ? null : body,
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return (document.querySelector('.fetch-error').textContent =
      "Une erreur s'est produite lors du chargement des données, veuillez réessayer plus tard");
  }
};

// create DOM element
const createGenericElement = (
  type,
  text = '',
  className = '',
  attributes = []
) => {
  const element = document.createElement(type);
  if (text) {
    element.textContent = text;
  }
  if (className) {
    element.className = className;
  }
  if (attributes) {
    attributes.forEach((attribute) => {
      element.setAttribute(attribute.name, attribute.value);
    });
  }
  return element;
};

const countTotalLikes = (data) => {
  let likes = 0;
  data.forEach((media) => {
    likes += media.likes;
  });
  return likes;
};

const displayLikes = (data, liked) => {
  if (!liked) {
    return ` ${data} <i class="fa-regular fa-heart"></i>`;
  }
  return ` ${data} <i class="fa-solid fa-heart"></i>`;
};

const LikeUnlike = (media, index) => {
  let liked;
  const likeText = document.querySelector(`[likeindex="${index}"]`);

  likeText.getAttribute('liked') !== 'true' ? (liked = false) : (liked = true);
  !liked
    ? likeText.setAttribute('liked', 'true')
    : likeText.removeAttribute('liked');
  const newLike = liked ? (media[index].likes -= 1) : (media[index].likes += 1);
  return (likeText.innerHTML = displayLikes(newLike, !liked));
};

export {
  customFetch,
  createGenericElement,
  countTotalLikes,
  displayLikes,
  LikeUnlike,
};
