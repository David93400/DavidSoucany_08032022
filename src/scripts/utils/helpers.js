//  create fetch function
const getFetch = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return console.log(error);
  }
};

// create DOM element
const createElement = (type, text, classname, attributes = []) => {
  const element = document.createElement(type);
  if (text) {
    element.textContent = text;
  }
  if (classname) {
    element.classList.add(classname);
  }
  if (attributes) {
    attributes.forEach((attribute) => {
      element.setAttribute(attribute.name, attribute.value);
    });
  }
  return element;
};

export { getFetch, createElement };
