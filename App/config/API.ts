const API = {
  // BASE_URL: 'http://192.168.73.9:8000/',
  // BASE_URL: 'http://192.168.1.66:8000/',
  BASE_URL: 'https://crewlog-server-ea14b4e528a9.herokuapp.com/',

  LOGIN: 'users/login',

  CREATE_USER: 'users/register',

  MARK_ATTENDANCE: 'attendance/create',

  REPORT_BY_USER: 'attendance/list_by_user/',

  REPORT_BY_USER2: 'attendance/list_by_user2/',

  GET_LOCATIONS: 'location/list',

  CREATE_LOCATIONS: 'location/create',

  DELETE_LOCATIONS: 'location/delete/',

  DELETE_USER: 'users/delete/',

  GET_USERS: 'users',
};

export default API;

// Token:

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBfaWQiOiI1NDMyMSIsImlhdCI6MTY4ODE5MTM3M30.8nDPs82fAE-rf7t6EAUfOe2NP4ZSRQSmJla1x-U2r24
