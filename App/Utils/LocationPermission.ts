const RequestPermission = async (url: any, params: any) => {
  return new Promise(async (resolve, reject) => {
    console.log('RequestPermission');
  });
};

const getLocation = async (url: any, body: any) => {
  return new Promise(async (resolve, reject) => {
    console.log('getLocation');
  });
};

export {RequestPermission, getLocation};
