import apiInstance from './apiInstance';
import uuid from 'react-native-uuid';
import { ChatTypeForPut } from '../utils/type';

// 해당 대화 Id의 채팅 리스트를 가져옵니다.
export const getAllChatByIdFromServer = async (infoId: string) => {
    const response = await apiInstance.get(`/chat?infoId=${infoId}`);
    return response.data;
};

// 대화를 ID로 업데이트하고 업데이트된 데이터를 반환합니다.
export const putChatByInfoId = async (props: ChatTypeForPut) => {
    const response = await apiInstance.post(`/chat`, {
        id: props.id || uuid.v4(),
        infoId: props.infoId,
        text: props.text,
        createdAt: props.createdAt || Date.now(),
        userId: props.userId,
    });
    return response.data;
};
