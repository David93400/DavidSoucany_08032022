import photoFactory from './photoFactory';
import videoFactory from './videoFactory';

const mediaFactory = (media, i) => {
  if (Object.prototype.hasOwnProperty.call(media, 'image')) {
    return photoFactory(media, i);
  }
  if (Object.prototype.hasOwnProperty.call(media, 'video')) {
    return videoFactory(media, i);
  }
};

export default mediaFactory;
