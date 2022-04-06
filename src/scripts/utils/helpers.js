//  create fetch function
const getFetch = async (url, method = 'GET', body) => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    document.querySelector('.fetch-error').textContent =
      "Une erreur s'est produite lors du chargement des données, veuillez réessayer plus tard";
    return console.log(error);
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
  return ` ${likes} <i class="fa-solid fa-heart"></i>`;
};

function openPictureModal() {
  document.getElementById('myModal').style.display = 'block';
}

function closePictureModal() {
  document.getElementById('myModal').style.display = 'none';
  document.querySelector('.mySlides').innerHTML = '';
}

export {
  getFetch,
  createGenericElement,
  countTotalLikes,
  openPictureModal,
  closePictureModal,
};
