import photoFactory from './photo';
import videoFactory from './video';

const mediaFactory = (data) => {
  if (data.hasOwnProperty('image')) {
    return photoFactory(data);
  }

  if (data.hasOwnProperty('video')) {
    return videoFactory(data);
  }
};

export default mediaFactory;
