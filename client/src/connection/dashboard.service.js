import api from './common_http';

const loadDashboardTotals = () => {
    return api.get("/api/dashboard");
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    loadDashboardTotals
};