import axios from 'axios';

let baseURL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // baseURL = process.env.SERVER_BASE_URL; //'https://wesvance-prod.herokuapp.com'
  baseURL = "http://localhost:3001";
} else {
  // TALK TO THE HEROKU SERVER
  baseURL = process.env.SERVER_BASE_URL; //'https://wesvance-prod.herokuapp.com'
}

const Axios = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

export default Axios;
