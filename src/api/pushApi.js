import { axiosClient } from './axiosClient';

const PUSH_ENDPOINT = process.env.REACT_APP_API_REGISTER_PUSH;
const pushApi = {
  userSubscribe: (data) => {
    const url = `/${PUSH_ENDPOINT}/`;
    return axiosClient.post(url, data);
  },
};

export default pushApi;
