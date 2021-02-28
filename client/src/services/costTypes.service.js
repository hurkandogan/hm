import common_http from './common_http';

const findAllCostTypes = () => {
    return common_http.get("/api/costTypes");
};

export default findAllCostTypes;