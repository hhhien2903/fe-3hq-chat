import axiosClient from './axiosClient';

const USER_ENDPOINT = process.env.REACT_APP_API_USER_ENDPOINT;
const userApi = {
  getUserById: (id) => {
    let url = `/${USER_ENDPOINT}/${id}`;
    return axiosClient.get(url);
  },
  createUser: (data) => {
    let url = `/${USER_ENDPOINT}/`;
    return axiosClient.post(url, data);
  },
};

export default userApi;
