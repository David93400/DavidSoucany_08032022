import photoFactory from './photoFactory';
import videoFactory from './videoFactory';

const mediaFactory = (media, i) => {
  if (media.hasOwnProperty('image')) {
    return photoFactory(media, i);
  }

  if (media.hasOwnProperty('video')) {
    return videoFactory(media, i);
  }
};

export default mediaFactory;
