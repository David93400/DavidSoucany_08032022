//  create fetch function
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

const setLightbox = (data, index) => {
  let content = '';
  let modalMedia = '';
  if (data[index].image !== undefined) {
    const { title, image } = data[index];
    content = `./assets/medias/${image}`;
    modalMedia = createGenericElement('img', null, 'photo photo-modal', [
      { name: 'src', value: content },
      { name: 'alt', value: `${content}` },
      { name: 'index', value: index },
    ]);
  } else {
    const { title, video } = data[index];
    content = `./assets/medias/${video}`;
    modalMedia = createGenericElement('video', null, 'video video-modal', [
      { name: 'controls', value: true },
      { name: 'index', value: index },
    ]);
    modalMedia.autoplay = true;
    modalMedia.muted = true;
    modalMedia.loop = true;
    const source = createGenericElement('source', null, null, [
      { name: 'src', value: content },
      { name: 'type', value: 'video/mp4' },
    ]);
    modalMedia.appendChild(source);
  }

  openPictureModal();

  const mediaModal = document.querySelector('.mySlides');

  const closeBtn = createGenericElement('i', '', 'fa-solid fa-xmark close');
  const previousBtn = createGenericElement('span', '<', 'prev');
  const nextBtn = createGenericElement('span', '>', 'next');

  const nextSlide = () => {
    const currentIndex = parseInt(
      mediaModal.querySelector('img, video').getAttribute('index')
    );
    mediaModal.innerHTML = '';
    const nextIndex = currentIndex + 1;
    if (nextIndex < data.length) {
      setLightbox(data, nextIndex);
    } else {
      setLightbox(data, 0);
    }
  };

  const previsousSlide = () => {
    const currentIndex = parseInt(
      mediaModal.querySelector('img, video').getAttribute('index')
    );
    mediaModal.innerHTML = '';
    const nextIndex = currentIndex - 1;
    if (nextIndex >= 0) {
      setLightbox(data, nextIndex);
    } else {
      setLightbox(data, data.length - 1);
    }
  };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      previsousSlide();
    }
  });
  nextBtn.addEventListener('click', nextSlide);
  nextBtn.addEventListener('keydown', nextSlide);
  previousBtn.addEventListener('click', previsousSlide);
  mediaModal.appendChild(closeBtn);
  mediaModal.appendChild(previousBtn);
  mediaModal.appendChild(nextBtn);
  mediaModal.appendChild(modalMedia);
  modalMedia.after(nextBtn);
  modalMedia.after(closeBtn);
  closeBtn.onclick = () => {
    closePictureModal();
  };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePictureModal();
    }
  });
};

export {
  customFetch,
  createGenericElement,
  countTotalLikes,
  openPictureModal,
  closePictureModal,
  setLightbox,
};
