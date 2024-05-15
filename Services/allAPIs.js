// allAPIs.js

import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";

//Register User CALL
export const registerUserAPI = async (user) => {
    return await commonAPI("post", `${serverURL}/registerUser`, user, "");
}

//Login API CALL
export const loginAPI = async (user) => {
    return await commonAPI("post", `${serverURL}/login`, user, "");
}