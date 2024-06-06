import { Map } from 'immutable';
import _ from 'lodash';
import { Email, GlobalEmailListActionType } from 'utils/type';

// * constants
const SET = 'EMAIL/SET';
const ADD = 'EMAIL/ADD';
const REPLACE_DUMMY = 'EMAIL/DUMMY/REPLACE';

// * state
const globalEmailState = <Map<string, Email[]>>Map({});

// * action
// 전역 이메일 목록을 설정하는 액션을 생성합니다.
export const setGlobalEmailList = (params: GlobalEmailListActionType) => ({
    type: SET,
    ...params,
});
// 전역 이메일 목록을 추가하는 액션을 생성합니다.
export const addGlobalEmailList = (params: GlobalEmailListActionType) => ({
    type: ADD,
    ...params,
});
// 더미데이터를 실제 데이터로 변경하는 액션을 생성합니다.
export const replaceDummyEmailList = (params: GlobalEmailListActionType) => ({
    type: REPLACE_DUMMY,
    ...params,
});

// * reducer
export const globalEmailListReducer = (
    state = globalEmailState,
    action: GlobalEmailListActionType,
) => {
    switch (action.type) {
        case SET: {
            if (!action?.emailList) return state;
            return state.set(action.conversationId, action.emailList);
        }
        case ADD: {
            // 이전에 값이 없다면 early return, 무조건 set을 우선으로 해야함
            if (!state.get(action.conversationId)) return state;
            return state.set(action.conversationId, [
                ...state.get(action.conversationId),
                action.email,
            ]);
        }
        case REPLACE_DUMMY: {
            const dummyDataIndex = _.findIndex(
                state.get(action.conversationId),
                (_email) => _email.isDummy === true,
            );
            if (dummyDataIndex === -1) return state;
            const newEmailList = [...state.get(action.conversationId)];
            let targetEmail: Email[] | undefined;
            // 더미 데이터를 대체하는 경우
            if (action.email) {
                targetEmail = newEmailList.splice(dummyDataIndex, 1, action.email);
            }
            // 더미 데이터를 지우는 경우
            else {
                targetEmail = newEmailList.splice(dummyDataIndex, 1);
            }
            return state.set(action.conversationId, newEmailList);
        }
        default:
            return state;
    }
};
