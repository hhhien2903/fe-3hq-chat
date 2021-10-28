import axiosClient from  './axiosClient';
import axiosClientFormData from  './axiosClient';


const USER_ENDPOINT = process.env.REACT_APP_API_USER_ENDPOINT;
const userApi = {
  getUserById: (id) => {
    const url = `/${USER_ENDPOINT}/${id}`;
    return axiosClient.get(url);
  },
  createUser: (data) => {
    const url = `/${USER_ENDPOINT}/`;
    return axiosClient.post(url, data);
  },
  uploadAvatar:(data) => {
    const url = `/${USER_ENDPOINT}/upload/avatar`;
    return axiosClientFormData.put(url,data);
  }
};

export default userApi;
