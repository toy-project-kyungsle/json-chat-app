import { combineReducers } from 'redux';
import { selectedConversationReducer } from './selectedConversation';

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드
// store에 저장되는 리듀서는 오직 1개
const rootReducer = combineReducers({
    selectedConversationReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
