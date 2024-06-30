import apiInstance from './apiInstance';

// 서버에서 유저 목록을 가져옵니다.
export const getUserListFromServer = async () => {
    const response = await apiInstance.get('/user');
    return response.data;
};

// userId에 맞는 유저를 가져옵니다.
export const getUserByIdFromServer = async (userId: string) => {
    const response = await apiInstance.get(`/user?id=${userId}`);
    return response.data;
};
