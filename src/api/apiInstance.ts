import axios from 'axios';

export const conversationApiInstance = axios.create({
    baseURL: `http://localhost:3001`,
    headers: {
        'Content-type': 'application/json',
    },
});

export default conversationApiInstance;
