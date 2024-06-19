import { conversationApiInstance } from 'api/apiInstance';
import uuid from 'react-native-uuid';

// 서버에서 대화 목록을 가져옵니다.
export const getConversationListFromServer = async () => {
    const response = await conversationApiInstance.get('/conversations');
    return response.data;
};

// 해당 대화 Id의 채팅 리스트를 가져옵니다.
export const getChatListFromServer = async (conversationId: string) => {
    const response = await conversationApiInstance.get(`/emails?conversationId=${conversationId}`);
    return response.data;
};

// 대화를 ID로 업데이트하고 업데이트된 데이터를 반환합니다.
export const putConversationById = async (props: {
    conversationId: string;
    text: string;
    userId?: string;
    userName?: string;
    userAvatarUrl?: string;
}) => {
    const response = await conversationApiInstance.post(`/emails`, {
        id: uuid.v4(),
        conversationId: props.conversationId,
        text: props.text,
        createdAt: Date.now(),
        userId: props.userId || 'dummyMyId',
        userName: props.userName || 'dummyMyName',
        userAvatarUrl: props.userAvatarUrl || 'https://picsum.photos/id/22/100',
    });
    return response.data;
};
