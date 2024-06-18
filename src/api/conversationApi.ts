import { conversationApiInstance } from 'api/apiInstance';
import uuid from 'react-native-uuid';

/**
 * 서버에서 대화 목록을 가져옵니다.
 *
 * @return {Promise<Conversation[]>} 대화 목록입니다.
 */
export const getConversationListFromServer = async () => {
    const response = await conversationApiInstance.get('/conversations');
    return response.data;
};

/**
 * 해당 대화 Id의 이메일 리스트를 가져옵니다.
 *
 * @param {string} conversationId - 대화의 ID입니다.
 * @return {Promise<Email[]>} 대화 데이터를 반환하는 Promise입니다.
 */
export const getChatListFromServer = async (conversationId: string) => {
    const response = await conversationApiInstance.get(`/emails?conversationId=${conversationId}`);
    return response.data;
};

/**
 * 대화를 ID로 업데이트하고 업데이트된 데이터를 반환합니다.
 *
 * @param {string} props.conversationId - 업데이트할 대화의 ID입니다.
 * @param {object} props.text - 대화에서 업데이트할 속성입니다.
 * @return {Promise<Email>} 업데이트된 대화 데이터입니다.
 */
export const putConversationById = async (props: { conversationId: string; text: string }) => {
    const response = await conversationApiInstance.post(`/emails`, {
        id: uuid.v4(),
        conversationId: props.conversationId,
        text: props.text,
        createdAt: Date.now(),
        fromUser: false,
    });
    return response.data;
};
