import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export default (baseURL, newConfig = {}) => {
    return axios.create({
        baseURL,
        ...commonConfig,
        ...newConfig
    });
};

