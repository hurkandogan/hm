import { FaWindows } from 'react-icons/fa';
import api from './common_http';

const register = (firstName, lastName, mail, password) => {
  return api.post( "/api/signup", {
      firstName,
      lastName,
      mail,
      password
    });
};

const signin = (data) => {
    return api.post("/api/signin", data)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch(err => console.log(err));
};

const signout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user") || '{}');
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    signin,
    register,
    signout,
    getCurrentUser
};