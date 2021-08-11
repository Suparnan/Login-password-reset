import axios from 'axios';

const API_URL = "http://localhost:4180/auth/"

const postResetData = (myData) => {
    return axios.post(API_URL+"reset", myData);
}

const signupData = (myData) => {
    return axios.post(API_URL+"signup", myData)
}

const getLoginData = (myData) => {
    return axios.post(API_URL+"login", myData)
}

export { postResetData, getLoginData, signupData }

//validateLoginData, validateSignupData