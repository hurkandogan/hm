import common_http from './common_http';

const loadDashboardTotals = () => {
    return common_http.get("/api/dashboard");
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    loadDashboardTotals
};