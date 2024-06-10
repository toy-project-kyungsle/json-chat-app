// lib
import React, { useEffect, useState, Fragment, useCallback, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import io from 'socket.io-client';
// etc
import { getEmailListFromServer, putConversationById } from 'api/conversationApi';
import Styled from './EmailArea.styled';
import { Email, SelectedConversationType } from 'utils/type';

const socket = io();

function EmailArea(props: { selectedConversation: SelectedConversationType }) {
    const { selectedConversation } = props;
    // * state
    const [textAreaValue, setTextAreaValue] = useState('');
    const [emailList, setEmailList] = useState<Email[]>([]);
    // * function
    // 새로운 이메일을 추가하는 mutation
    const handlePutBodyData = useMutation(putConversationById, {
        onSuccess: (responseEmail: Email) => {
            //TODO conversation의 updateAt 바꾸기
        },
        // error type에 대해 받은 것이 없어 임시 처리
        onError: (error: { response: { data: { message: string } } }) => {
            alert(error?.response?.data || '대화를 수정하는 과정에서 에러가 발생했습니다.');
        },
    });

    // text area에서 작성한 내용을 서버에 전송합니다.
    const _submitTextToServer = useCallback((): void => {
        if (!textAreaValue || !selectedConversation?.conversationId) return;
        handlePutBodyData.mutate({
            conversationId: selectedConversation.conversationId,
            text: textAreaValue,
        });
        socket.emit('message', { conversationId: selectedConversation, text: textAreaValue });
        setTextAreaValue('');
    }, [selectedConversation, handlePutBodyData, textAreaValue]);

    // form 을 제출하는 함수
    const handleFormSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            _submitTextToServer();
        },
        [_submitTextToServer],
    );

    const handleTextAreaKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
            if (e.key === 'Enter' && e.shiftKey && e.nativeEvent.isComposing === false) {
                e.preventDefault(); // 기본 엔터 동작 방지
                _submitTextToServer();
            }
        },
        [_submitTextToServer],
    );

    /**
     * 사용자가 보고 있는 다른 대화에서는 fromUser에 상관 없이 함수를 실행합니다.
     * 만약 지금 사용자가 보고 있는 대화라면, 사용자가 보낸 대화는 response에서 처리되므로 early return합니다.
     */
    const handleEmail = useCallback((email: Email): void => {
        // TODO conversation updateAt
    }, []);

    const _initEmailList = useCallback((propEmailList: Email[]): void => {
        const newEmailList = [...propEmailList];
        newEmailList.sort((a, b) => a.createdAt - b.createdAt);
        const lastEmail = newEmailList[newEmailList.length - 1];

        if (!lastEmail) return;

        setEmailList(newEmailList);
    }, []);

    // * query
    // 컴포넌트 시작 시 이메일 리스트를 가져오는 query
    useQuery(
        ['emailAreaInfo', selectedConversation],
        () =>
            selectedConversation?.conversationId &&
            getEmailListFromServer(selectedConversation.conversationId),
        {
            enabled: selectedConversation.conversationId !== null,
            onSuccess: (propEmailList: Email[]) => {
                if (!propEmailList) return;
                _initEmailList(propEmailList);
            },
            onError: (error: any) => {
                let errorMessage =
                    error?.response?.data?.message ||
                    '대화 정보를 가져오는 과정에서 에러가 발생했습니다.';
                alert(errorMessage);
            },
        },
    );

    // * effect
    // 소켓을 열어주는 effect
    useEffect(() => {
        socket.on('message', handleEmail);
        return () => {
            socket.off('message', handleEmail);
        };
    }, [handleEmail]);

    return (
        <Styled.EmailArea>
            {selectedConversation?.conversationId !== null && (
                <Fragment>
                    <Styled.EmailList>
                        {emailList.map((email) => (
                            <Styled.ConversationBox
                                key={`email-box-${email.id}`}
                                fromUser={email.fromUser}
                                data-testid="email"
                            >
                                {email.fromUser === true && (
                                    <Styled.ProfileImgBox>
                                        <img
                                            src={selectedConversation?.userAvatarUrl || ''}
                                            alt="none"
                                        />
                                    </Styled.ProfileImgBox>
                                )}
                                <Styled.TalkBox fromUser={email.fromUser}>
                                    {email.fromUser === true && (
                                        <div className="userName">
                                            <span>{selectedConversation?.userName || ''}</span>
                                        </div>
                                    )}
                                    <div className="text">
                                        <span>{email.text}</span>
                                    </div>
                                </Styled.TalkBox>
                            </Styled.ConversationBox>
                        ))}
                    </Styled.EmailList>
                    <Styled.EnterBox>
                        <form className="form" onSubmit={handleFormSubmit}>
                            <textarea
                                className="textarea"
                                name="textarea"
                                placeholder="내용을 입력하세요."
                                data-testid="textarea"
                                onChange={(e) => setTextAreaValue(e.target.value)}
                                value={textAreaValue}
                                onKeyDown={handleTextAreaKeyDown}
                            />
                            <button className="button" data-testid="submit">
                                전송
                            </button>
                        </form>
                    </Styled.EnterBox>
                </Fragment>
            )}
        </Styled.EmailArea>
    );
}

export default EmailArea;
