const app = require('express')();
const { get } = require('axios');
const fs = require('fs');
const cors = require('cors')
app.use(cors())
app.use((res, req, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Expose-Headers', '*');
  res.header('Set-Cookie', 'HttpOnly;Secure;SameSite=None');
  next();
});

app.get('/shuffleGif', (request, response) => {
  const getGiphy = async () => {
    try {
      return await get(`http://api.giphy.com/v1/gifs/search?api_key=MwYVseqHsZL05C5EK1A0yV6kRcIuXS2b&q=${request.query.gifName}&limit=1`);
      //todo get all sizes
    } catch (e) {
      console.error(e);
    }
  };

  getGiphy().then(res => {
    response.send({ url: res.data.data[0].images.downsized_large.url });
  });
});

app.listen(2021, () => console.log('listening on http://localhost:2021/shuffleGif'));
