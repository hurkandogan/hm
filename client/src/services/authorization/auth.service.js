import common_http from '../common_http';

const register = (username, email, password) => {
  return common_http.post( "/api/signup", {
      username,
      email,
      password
    });
};

const login = (data) => {
    return common_http.post("/api/signin", { data })
        .then((response) => {
            console.log("Works" + response);
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch(err => console.log(err));
};

const logout = () => {
   localStorage.removeItem("user");
};

const getCurrentUser = () => {
   return JSON.parse(localStorage.getItem("user"));
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    login,
    register,
    getCurrentUser,
    logout
};