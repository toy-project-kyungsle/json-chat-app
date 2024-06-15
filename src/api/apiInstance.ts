import axios from 'axios';

export const conversationApiInstance = axios.create({
    baseURL: `http://192.168.0.7:3001`,
    headers: {
        'Content-type': 'application/json',
    },
});

export default conversationApiInstance;
