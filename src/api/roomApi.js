import { axiosClient } from './axiosClient';

const ROOM_ENDPOINT = process.env.REACT_APP_API_ROOM_ENDPOINT;
const roomApi = {
  getRoomsByUserId: (userId) => {
    let url = `/${ROOM_ENDPOINT}/user/${userId}`;
    return axiosClient.get(url);
  },
  getRoomById: (roomId) => {
    let url = `/${ROOM_ENDPOINT}/${roomId}`;
    return axiosClient.get(url);
  },
  getRoomsByUser: () => {
    let url = `/${ROOM_ENDPOINT}`;
    return axiosClient.get(url);
  },
};

export default roomApi;
