import { conversationApiInstance } from './apiInstance';

// 서버에서 유저 목록을 가져옵니다.
export const getUserListFromServer = async () => {
    const response = await conversationApiInstance.get('/users');
    return response.data;
};

// userId에 맞는 유저를 가져옵니다.
export const getUserByIdFromServer = async (userId: string) => {
    const response = await conversationApiInstance.get(`/users?id=${userId}`);
    return response.data;
};
