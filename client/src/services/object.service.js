import common_http from './common_http';
import authHeader from './authorization/auth.header';

const findAllObjects = () => {
  return common_http.get("/api/objects", { headers: authHeader() });
};

export default findAllObjects;