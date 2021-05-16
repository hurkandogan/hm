import api from './common_http';

const findAllCostTypes = () => {
    return api.get("/api/costTypes");
};

export default findAllCostTypes;