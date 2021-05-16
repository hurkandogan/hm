import api from './common_http';
import authHeader from './auth.header';

const findAllObjects = () => {
  return api.get("/api/objects", { headers: authHeader() });
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  findAllObjects
};