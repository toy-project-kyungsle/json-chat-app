// lib
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
// component
import { getConversationListFromServer } from 'api/conversationApi';
// etc
import Styled from './ConversationList.styled';
import { Conversation, SelectedConversationType } from 'utils/type';
import { getHashRoute } from 'utils/function';

function ConversationList(props: {
    selectedConversation: SelectedConversationType;
    setSelectedConversation: React.Dispatch<React.SetStateAction<SelectedConversationType>>;
}) {
    const { selectedConversation, setSelectedConversation } = props;
    const [conversationList, setConversationList] = useState<Conversation[]>([]);

    // * function
    // 전역 대화 목록 및 대화 목록 스크롤 인덱스 생성
    const _initConversationList = (propConversationList: Conversation[]): Conversation[] => {
        if (!propConversationList) return [];
        const newConversationList = [...propConversationList];

        newConversationList.sort((a, b) => b.updatedAt - a.updatedAt); // updatedAt 속성을 오름차순으로 정렬
        // TODO conversation list 상태 생성

        return newConversationList;
    };

    // * query
    // 페이지 처음 로딩 시 전체 대화 목록을 가져오는 query
    useQuery('conversationList', getConversationListFromServer, {
        onSuccess: (propConversationList: Conversation[]) => {
            if (!propConversationList) return;
            const newConversationList = _initConversationList(propConversationList);

            const targetConversationId = getHashRoute();

            if (targetConversationId !== '') {
                const targetConversationInfo = newConversationList.find(
                    (conversation) => conversation.id === targetConversationId,
                );
                if (!targetConversationInfo) return;
                setSelectedConversation((prev) => ({
                    userAvatarUrl: targetConversationInfo.userAvatarUrl,
                    userName: targetConversationInfo.userName,
                    conversationId: targetConversationInfo.id,
                }));
            }

            setConversationList(newConversationList);
        },
        // error type에 대해 받은 것이 없어 임시처리
        onError: (error: { response: { data: { message: string } } }) => {
            const errorMessage =
                error?.response?.data?.message ||
                '대화 목록을 가져오는 과정에서 에러가 발생했습니다.';
            alert(errorMessage);
        },
    });

    return (
        <Styled.ConversationList>
            {conversationList.map((conversation: Conversation, i: number) => (
                <Styled.ConversationBox
                    key={`converstion-list-${conversation.id}`}
                    onClick={() => {
                        setSelectedConversation((prev) => ({
                            userAvatarUrl: conversation.userAvatarUrl,
                            userName: conversation.userName,
                            conversationId: conversation.id,
                        }));
                        location.hash = '#' + conversation.id;
                    }}
                    data-testid="conversation"
                    isSelected={selectedConversation?.conversationId === conversation.id}
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
