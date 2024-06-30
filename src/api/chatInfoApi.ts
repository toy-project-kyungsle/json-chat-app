import apiInstance from './apiInstance';

// 서버에서 대화 목록을 가져옵니다.
export const getAllChatInfoFromServer = async () => {
    const response = await apiInstance.get('/chatInfo');
    return response.data;
};

// 서버에서 대화 목록을 가져옵니다.
export const getChatInfoByIdFromServer = async (infoId: string) => {
    const response = await apiInstance.get(`/chatInfo?id=${infoId}`);
    return response.data[0];
};
