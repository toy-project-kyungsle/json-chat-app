import _ from 'lodash';
import { Conversation, GlobalConversationListActionType } from 'utils/type';

// * constants
const SET = 'CONVERSATION_LIST/SET';
const REORDER = 'CONVERSATION_LIST/REORDER';

// * state
const conversationListState = <Conversation[]>[];

// * action
// 대화 목록을 설정하는 액션을 생성합니다.
export const setGlobalConversationList = (params: GlobalConversationListActionType) => ({
    type: SET,
    ...params,
});
// 특정 대화 데이터를 최산화하는 액션을 생성합니다.
export const updateConversation = (params: GlobalConversationListActionType) => {
    return {
        type: REORDER,
        conversationId: params.conversationId,
        updatedAt: params.updatedAt,
    };
};

// * reducer
export const globalConversationListReducer = (
    state = conversationListState,
    action: GlobalConversationListActionType,
) => {
    switch (action.type) {
        case SET: {
            if (!action.globalConversationList) return state;
            return action.globalConversationList;
        }
        case REORDER: {
            if (!action.updatedAt || !action.conversationId) return state;
            const newConversationList = [...state];
            const staleDataIndex = _.findIndex(
                newConversationList,
                (_conversation) => _conversation.id === action.conversationId,
            );
            if (staleDataIndex === -1) return state;
            const targetConversation = newConversationList.splice(staleDataIndex, 1);
            if (!targetConversation[0] || targetConversation[0].updatedAt === action.updatedAt)
                return state;
            targetConversation[0].updatedAt = action.updatedAt;
            newConversationList.unshift(targetConversation[0]);
            return newConversationList;
        }
        default:
            return state;
    }
};
