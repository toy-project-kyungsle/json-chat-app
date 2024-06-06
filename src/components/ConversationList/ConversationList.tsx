// lib
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import moment from 'moment';
// component
import { getConversationListFromServer } from 'api/conversationApi';
// etc
import { RootState } from 'reducers'; // type
import { selectConversation } from 'reducers/selectedConversation';
import { setGlobalConversationList } from 'reducers/globalConversationList';
import Styled from './ConversationList.styled';
import { Conversation } from 'utils/type';
import { getHashRoute } from 'utils/function';

function ConversationList() {
    const dispatch = useDispatch();
    const SHOWING_DATA_COUNT = 10;

    // * global state
    const globalConversationList = useSelector(
        (state: RootState) => state.globalConversationListReducer,
    );
    const globalEmailList = useSelector((state: RootState) => state.globalEmailListReducer);
    const { conversationId: selectedConversationId } = useSelector(
        (state: RootState) => state.selectedConversationReducer,
    );

    // * state
    const [shownConversationList, setShownConversationList] = useState<
        Conversation[] | undefined[]
    >([]);
    const [indexToGetConversationData, setIndexToGetConversationData] =
        useState(SHOWING_DATA_COUNT);

    // * function
    // 전역 대화 목록 및 대화 목록 스크롤 인덱스 생성
    const _initConversationList = (propConversationList: Conversation[]): Conversation[] => {
        if (!propConversationList) return [];
        const newConversationList = [...propConversationList];

        newConversationList.sort((a, b) => b.updatedAt - a.updatedAt); // updatedAt 속성을 오름차순으로 정렬
        dispatch(setGlobalConversationList({ globalConversationList: newConversationList }));
        setIndexToGetConversationData(SHOWING_DATA_COUNT);

        return newConversationList;
    };

    // 대화를 선택하여 전역 대화 선택 상태 변경
    const _selectConversation = useCallback(
        (conversation: Conversation): void => {
            const staleData = globalEmailList.get(conversation.id);
            const hasUpdate =
                staleData === undefined ||
                staleData[staleData.length - 1].createdAt > conversation.updatedAt;

            dispatch(
                selectConversation({
                    conversationId: conversation.id,
                    userName: conversation.userName,
                    userAvatarUrl: conversation.userAvatarUrl,
                    hasUpdate,
                }),
            );
        },
        [globalEmailList],
    );

    // * query
    // 페이지 처음 로딩 시 전체 대화 목록을 가져오는 query
    useQuery(['conversationList'], getConversationListFromServer, {
        onSuccess: (propConversationList: Conversation[]) => {
            if (!propConversationList) return;
            const newConversationList = _initConversationList(propConversationList);

            const targetConversationId = getHashRoute();
            if (targetConversationId !== '') {
                const targetConversationInfo = newConversationList.find(
                    (conversation) => conversation.id === targetConversationId,
                );
                if (!targetConversationInfo) return;
                _selectConversation(targetConversationInfo);
            }
        },
        // error type에 대해 받은 것이 없어 임시처리
        onError: (error: { response: { data: { message: string } } }) => {
            const errorMessage =
                error?.response?.data?.message ||
                '대화 목록을 가져오는 과정에서 에러가 발생했습니다.';
            alert(errorMessage);
        },
    });

    // * effect
    useEffect(() => {
        setShownConversationList(globalConversationList.slice(0, indexToGetConversationData));
    }, [globalConversationList, indexToGetConversationData]);

    return (
        <Styled.ConversationList>
            {shownConversationList &&
                shownConversationList.map((conversation: Conversation, i: number) => (
                    <Styled.ConversationBox
                        key={`converstion-list-${conversation.id}`}
                        onClick={() => {
                            _selectConversation(conversation);
                            location.hash = '#' + conversation.id;
                        }}
                        data-testid="conversation"
                        isSelected={selectedConversationId === conversation.id}
                    >
                        <Styled.ProfileImage>
                            <img src={conversation.userAvatarUrl} alt="" />
                        </Styled.ProfileImage>
                        <Styled.ConversationInfo>
                            <div className="titleBox">
                                <span>{conversation.title}</span>
                            </div>
                            <div className="userInfoBox">
                                <div className="userName">
                                    <span>{conversation.userName}</span>
                                </div>
                                <div className="updatedAt">
                                    <span>{moment(conversation.updatedAt).format('hh:mm')}</span>
                                </div>
                            </div>
                        </Styled.ConversationInfo>
                    </Styled.ConversationBox>
                ))}
        </Styled.ConversationList>
    );
}

export default ConversationList;
