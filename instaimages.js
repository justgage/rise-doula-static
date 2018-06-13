const fetch = require('node-fetch');
const fs = require('fs');

const folder = 'insta';

const saveImage = (url, name) => {
  fetch(url).then(response => {
    const dest = fs.createWriteStream(`./${folder}/${name}.png`);
    response.body.pipe(dest);
  });
};

fetch(
  'https://api.instagram.com/v1/users/self/media/recent/?access_token=262165231.29ff3eb.ff5df6cc1c4a464dbf415bbd5411797d'
)
  .then(data => data.json())
  .then(data => {
    data.data.map((pic, i) => {
      saveImage(pic.images.standard_resolution.url, i);
    });
  });
