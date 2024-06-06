// lib
import React, { useEffect, useState, Fragment, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { v4 as uuid } from 'uuid';
import io from 'socket.io-client';
// etc
import { getEmailListFromServer, putConversationById } from 'api/conversationApi';
import { addGlobalEmailList, replaceDummyEmailList } from 'reducers/globalEmailList';
import { setGlobalEmailList } from 'reducers/globalEmailList';
import { updateConversation } from 'reducers/globalConversationList';
import { RootState } from 'reducers'; // type
import Styled from './EmailArea.styled';
import { Email } from 'utils/type';

const socket = io();

function EmailArea() {
    const dispatch = useDispatch();

    // * global state
    const { conversationId, userName, userAvatarUrl, hasUpdate } = useSelector(
        (state: RootState) => state.selectedConversationReducer,
    );
    const globalEmailList = useSelector((state: RootState) => state.globalEmailListReducer);
    // * state
    const [textAreaValue, setTextAreaValue] = useState('');
    const [bottomScroll, setBottomScroll] = useState(false);
    // * ref
    const emailListRef = useRef(null);
    // * function
    // 새로운 이메일을 추가하는 mutation
    const handlePutBodyData = useMutation(putConversationById, {
        onSuccess: (responseEmail: Email) => {
            dispatch(
                updateConversation({
                    conversationId: responseEmail.conversationId,
                    updatedAt: responseEmail.createdAt,
                }),
            );

            dispatch(
                replaceDummyEmailList({
                    conversationId: responseEmail.conversationId,
                    email: responseEmail,
                }),
            );
        },
        // error type에 대해 받은 것이 없어 임시 처리
        onError: (error: { response: { data: { message: string } } }) => {
            alert(error?.response?.data || '대화를 수정하는 과정에서 에러가 발생했습니다.');
            dispatch(
                replaceDummyEmailList({
                    conversationId: conversationId,
                }),
            );
        },
    });

    // text area에서 작성한 내용을 서버에 전송합니다.
    const _submitTextToServer = useCallback((): void => {
        const dummyEmail = {
            id: uuid(),
            conversationId,
            text: textAreaValue,
            createdAt: Date.now(),
            fromUser: false,
            isDummy: true,
        };
        dispatch(
            addGlobalEmailList({
                conversationId,
                email: dummyEmail,
            }),
        );
        handlePutBodyData.mutate({
            conversationId: conversationId,
            text: textAreaValue,
        });
        setTextAreaValue('');
        setBottomScroll(true);
    }, [textAreaValue, conversationId]);

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
        if (document.hasFocus() === true && email.fromUser === false) return;
        if (document.hasFocus() === true && email.fromUser === true) setBottomScroll(true);

        dispatch(
            updateConversation({
                conversationId: email.conversationId,
                updatedAt: email.createdAt,
            }),
        );

        dispatch(
            addGlobalEmailList({
                conversationId: email.conversationId,
                email,
            }),
        );
    }, []);

    const _initEmailList = useCallback(
        (propEmailList: Email[]): void => {
            const newEmailList = [...propEmailList];
            newEmailList.sort((a, b) => a.createdAt - b.createdAt);
            const lastEmail = newEmailList[newEmailList.length - 1];

            if (!lastEmail) return;

            dispatch(
                setGlobalEmailList({
                    conversationId,
                    emailList: newEmailList,
                }),
            );
        },
        [conversationId],
    );

    // * query
    // 컴포넌트 시작 시 이메일 리스트를 가져오는 query
    useQuery(['emailAreaInfo', conversationId], () => getEmailListFromServer(conversationId), {
        enabled:
            conversationId !== null &&
            userName !== null &&
            userAvatarUrl !== null &&
            hasUpdate === true,
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
    });

    // * effect
    // 소켓을 열어주는 effect
    useEffect(() => {
        socket.on(handleEmail);
        return () => {
            socket.off(handleEmail);
        };
    }, [handleEmail]);

    // 대화를 입력하거나 상대방이 입력하면 이메일 리스트의 최하단으로 화면 이동
    useEffect(() => {
        if (bottomScroll === true) {
            setTimeout(() => {
                emailListRef.current.scrollTop = emailListRef.current.scrollHeight;
            }, 100);
            setBottomScroll(false);
        }
    }, [bottomScroll]);

    return (
        <Styled.EmailArea>
            {conversationId && userAvatarUrl && userName && globalEmailList.get(conversationId) && (
                <Fragment>
                    <Styled.EmailList ref={emailListRef}>
                        {globalEmailList.get(conversationId).map((email) => (
                            <Styled.ConversationBox
                                key={`email-box-${email.id}`}
                                fromUser={email.fromUser}
                                data-testid="email"
                            >
                                {email.fromUser === true && (
                                    <Styled.ProfileImgBox>
                                        <img src={userAvatarUrl} alt="none" />
                                    </Styled.ProfileImgBox>
                                )}
                                <Styled.TalkBox fromUser={email.fromUser}>
                                    {email.fromUser === true && (
                                        <div className="userName">
                                            <span>{userName}</span>
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
