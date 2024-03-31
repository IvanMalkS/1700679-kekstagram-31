import { showBigPicture } from './bigPicture.js';
import { getData } from '../api/api';
import displayMessage from '../api/displayMessage';
let clickHandler = null;
const pictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const postParser = (post) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');
  const likes = pictureElement.querySelector('.picture__likes');
  const comments = pictureElement.querySelector('.picture__comments');
  image.src = post.url;
  image.alt = post.description;
  likes.textContent = post.likes;
  comments.textContent = post.comments.length;

  if (clickHandler) {
    pictureElement.removeEventListener('click', clickHandler);
  }

  clickHandler = () => showBigPicture(post);
  pictureElement.addEventListener('click', clickHandler);

  return pictureElement;
};

export const createThumbnails = () => {
  getData()
    .then((posts) => {
      const fragment = document.createDocumentFragment();
      const pictures = document.querySelector('.pictures');

      posts.forEach((post) => {
        const pictureElement = postParser(post);
        fragment.appendChild(pictureElement);
      });

      pictures.appendChild(fragment);
    })
    .catch((err) => {
      displayMessage('internet-error');
      throw new Error(`Ошибка при создании миниатюр: ${err}`);
    });
};
