import API from '../Config/API';
const GET = async (url: any, params: any) => {
  return new Promise(async (resolve, reject) => {
    fetch(API.BASE_URL + url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const POST = async (url: any, body: any) => {
  return new Promise(async (resolve, reject) => {
    fetch(API.BASE_URL + url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export {GET, POST};
