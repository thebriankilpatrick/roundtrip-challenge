import axios from "axios";

// const path = "http://localhost:5000";
const path = "https://json-server-green.vercel.app/db.json";

export default {

    getMasterPlans: function() {
        return axios.get(path + "/master-plans");
    },

    getUnmatchedPlans: function() {
        return axios.get(path + "/unmatched-plans");
    },

    getMasterPlan: function(planId) {
        return axios.get(path + "/master-plans/" + planId);
    },

    getUnmatchedPlan: function(planId) {
        return axios.get(path + "/unmatched-plans/" + planId);
    },

    getAliases: function() {
        return axios.get(path + "/aliases");
    },

    getAlias: function(aliasId) {
        return axios.get(path + "/aliases/" + aliasId);
    },

    createMasterPlan: function(planObj) {
        return axios.post(path + "/master-plans", planObj);
    },

    createAlias: function(aliasObj) {
        return axios.post(path + "/aliases", aliasObj);
    }

}