import { conversationApiInstance } from './apiInstance';

// 서버에서 대화 목록을 가져옵니다.
export const getConversationListFromServer = async () => {
    const response = await conversationApiInstance.get('/conversations');
    return response.data;
};
