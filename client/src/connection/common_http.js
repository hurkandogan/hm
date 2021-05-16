import axios from 'axios';

const user = JSON.parse(localStorage.getItem("user") || '{}');

export default axios.create({
   baseURL: 'http://localhost:5000',
   headers: {
      'x-access-token': user.accessToken
   }
});