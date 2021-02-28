import common_http from './common_http';

const findAllObjects = () => {
  return common_http.get("/api/objects");
};

export default findAllObjects;