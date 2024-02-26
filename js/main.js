const generateRandomNumber = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    return new Error('min and max must be number');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateUniqueId = (idArray, min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    return new Error('min and max must be number');
  }
  let isUniqueId = true;
  let id;

  do {
    isUniqueId = true;
    id = generateRandomNumber(min, max);

    for (let j = 0; j < idArray.length; j++) {
      if (id === idArray[j]) {
        isUniqueId = false;
        break;
      }
    }
  } while (!isUniqueId);

  idArray.push(id);
  return id;
};

const generateComments = (commentsCount, messages, names) => {
  if (typeof commentsCount !== 'number') {
    return new Error('commentsCount must be number');
  }

  const commentsArray = [];
  const messagesArray = messages.replaceAll('\n', '').trim().match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
  const namesArray = names.split(', ');
  const idArray = [];

  for(let i = 0; i < commentsCount; i++) {
    const id = generateUniqueId(idArray, 1, 256);
    const avatarId = generateRandomNumber(1, 6);
    const avatar = `img/avatar-${avatarId}.svg`;

    const messageFirst = messagesArray[generateRandomNumber(0, messagesArray.length - 1)];
    let messageSecond = messagesArray[generateRandomNumber(0, messagesArray.length - 1)];

    while (messageFirst === messageSecond) {
      messageSecond = messagesArray[generateRandomNumber(0, messagesArray.length - 1)];
    }
    const message = `${messageFirst} ${messageSecond}`;

    const name = namesArray[generateRandomNumber(0, namesArray.length - 1)];

    commentsArray.push({
      id,
      avatar,
      message,
      name
    });
  }

  return commentsArray;
};

const generateImagePosts = (postsCount, commentsCount) => {
  if (typeof postsCount !== 'number' || typeof commentsCount !== 'number') {
    return new Error('postsCount and commentsCount must be number');
  }

  const idArray = [];
  const urlIdArray = [];
  const result = [];

  const messagesForImagePost = `Всё отлично!
  В целом всё неплохо. Но не всё.
  Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
  Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
  Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
  Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`;

  const namesForImagePost = 'Макар, Адам, Богдан, Платон, Леон, Савелий, Есения, Эмилия, Агата, Аделина, Ясмина, Оливия, Аврора, Мира, Агния, Амалия';

  for (let i = 0; i < postsCount; i++) {
    const id = generateUniqueId(idArray, 1, 25);
    const urlId = generateUniqueId(urlIdArray, 1, 25);
    const url = `photos/${urlId}.jpg`;
    const likes = generateRandomNumber(15, 215);
    const comments = generateComments(commentsCount, messagesForImagePost, namesForImagePost);

    result.push({
      id,
      url,
      description: 'Придумайте сами!',
      likes,
      comments
    });
  }
  return result;
};

console.log(generateImagePosts(25, 30));
