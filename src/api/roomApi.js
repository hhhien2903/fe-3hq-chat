import { axiosClient } from './axiosClient';

const ROOM_ENDPOINT = process.env.REACT_APP_API_ROOM_ENDPOINT;
const roomApi = {
  getRoomsByUserId: (userId) => {
    const url = `/${ROOM_ENDPOINT}/user/${userId}`;
    return axiosClient.get(url);
  },
  getRoomById: (roomId) => {
    const url = `/${ROOM_ENDPOINT}/${roomId}`;
    return axiosClient.get(url);
  },
  getRoomsByUser: () => {
    const url = `/${ROOM_ENDPOINT}`;
    return axiosClient.get(url);
  },
  addMemberToRoom: (roomId, userId) => {
    const url = `/${ROOM_ENDPOINT}/add-member/${roomId}?userId=${userId}`;
    return axiosClient.put(url);
  },
  removeMemberFromRoom: (roomId, userId) => {
    const url = `/${ROOM_ENDPOINT}/remove-member/${roomId}?userId=${userId}`;
    return axiosClient.put(url);
  },
  createRoom: (data) => {
    const url = `/${ROOM_ENDPOINT}/groups`;
    return axiosClient.post(url, data);
  },
  updateRoom: (roomId, data) => {
    const url = `/${ROOM_ENDPOINT}/groups/${roomId}`;
    return axiosClient.put(url, data);
  },
  updateRoomAvatar: (roomId, data) => {
    const url = `/${ROOM_ENDPOINT}/upload/avatar?roomId=${roomId}`;
    return axiosClient.put(url, data);
  },
  leaveRoom: (roomId) => {
    const url = `/${ROOM_ENDPOINT}/leave/group?roomId=${roomId}`;
    return axiosClient.patch(url);
  },
};

export default roomApi;
