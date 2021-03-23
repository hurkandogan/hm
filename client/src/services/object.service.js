import common_http from './common_http';
import authHeader from './authorization/auth.header';

const findAllObjects = () => {
  return common_http.get("/api/objects", { headers: authHeader() });
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  findAllObjects
};