import photoFactory from './photoFactory';
import videoFactory from './videoFactory';

const mediaFactory = (media, i) => {
  // eslint-disable-next-line no-prototype-builtins
  if (media.hasOwnProperty('image')) {
    return photoFactory(media, i);
  }

  // eslint-disable-next-line no-prototype-builtins
  if (media.hasOwnProperty('video')) {
    return videoFactory(media, i);
  }
};

export default mediaFactory;
