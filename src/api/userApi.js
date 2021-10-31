import { axiosClient, axiosClientFormData } from './axiosClient';

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
  updateUser: (data) => {
    const url = `/${USER_ENDPOINT}`;
    return axiosClient.put(url, data);
  },
  uploadFile: (data) => {
    let url = `/${USER_ENDPOINT}/upload/file`;
    return axiosClientFormData.post(url, data);
  },
  uploadAvatar: (data) => {
    const url = `/${USER_ENDPOINT}/upload/avatar`;
    return axiosClientFormData.put(url, data);
  },
  getFriendList: () => {
    const url = `/${USER_ENDPOINT}/friend/list`;
    return axiosClient.get(url);
  },
  getSearhFriend: (data) => {
    const url = `/${USER_ENDPOINT}/find/contact/${data}`;
    return axiosClient.get(url, data);
  },
  postSendFriendRequest: (data) => {
    const url = `/${USER_ENDPOINT}/friend/request`;
    return axiosClient.post(url, data);
  },
  getListFriendRequest: () => {
    const url = `/${USER_ENDPOINT}/friend/request`;
    return axiosClient.get(url);
  },
  postAcceptFriend: (data) => {
    const url = `/${USER_ENDPOINT}/friend/accept`;
    return axiosClient.post(url, data);
  },
  postRejectFriend: (data) => {
    const url = `/${USER_ENDPOINT}/friend/reject`;
    return axiosClient.post(url, data);
  },
};

export default userApi;
