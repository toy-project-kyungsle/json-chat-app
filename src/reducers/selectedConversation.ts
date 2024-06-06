import { SelectedConvesationActionType, SelectedConversationType } from 'utils/type';

// * constants
export const SELECT = 'CONVERSATION/SELECT';

// * state
const selectedConversationState = {
    conversationId: null,
    userName: null,
    userAvatarUrl: null,
    hasUpdate: true,
};

// * action
// 이메일 리스트를 가져오기 위해 대화를 선택합니다.
export const selectConversation = (params: SelectedConversationType) => ({
    type: SELECT,
    ...params,
});

// * reducer
export const selectedConversationReducer = (
    state = selectedConversationState,
    action: SelectedConvesationActionType,
) => {
    switch (action.type) {
        case SELECT:
            return {
                ...state,
                conversationId: action.conversationId,
                userName: action.userName,
                userAvatarUrl: action.userAvatarUrl,
                hasUpdate: action.hasUpdate,
            };

        default:
            return state;
    }
};
