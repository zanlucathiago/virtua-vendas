import helper from './helper.js';

const post = (path, body, callback) => {
  fetch(path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      const res = await response.json();

      if (!response.ok) {
        throw Error(res.msg);
      }

      callback(res);
    })
    .catch((err) => {
      helper.notifyError(err.message);
    });
};

const get = (path, callback) => {
  fetch(path, {
    method: 'GET',
  })
    .then(async (response) => {
      const res = await response.json();

      if (!response.ok) {
        throw Error(res.msg);
      }

      callback(res);
    })
    .catch((err) => {
      helper.notifyError(err.message);
    });
};

export default { get, post };
