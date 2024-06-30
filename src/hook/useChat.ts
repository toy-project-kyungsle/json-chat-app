import { useCallback, useEffect, useState } from 'react';
import { ChatType } from '../utils/type';
import { getAllChatByIdFromServer, putChatByInfoId } from '../api/chatApi';

import useMyId from './useMyId';
import useSocketWithInfoId from './useSocketWithInfoId';

const useChat = (chatInfoId: string) => {
    const { myId } = useMyId();
    const { newSocket } = useSocketWithInfoId(chatInfoId, () => syncChatStateWithServer());
    const [chats, setChats] = useState<ChatType[]>([]);
    const [enteredText, setEnteredText] = useState<string>('');

    const syncChatStateWithServer = useCallback(async () => {
        const _emails = await getAllChatByIdFromServer(chatInfoId);
        setChats(_emails);
    }, []);

    const handlePostChat = useCallback(async () => {
        const newProp = {
            infoId: chatInfoId,
            text: enteredText,
            userId: myId,
        };
        return await putChatByInfoId(newProp);
    }, [enteredText, myId]);

    const handlePressChatBtn = useCallback(async () => {
        if (enteredText === '') return;
        await handlePostChat();
        newSocket.emit('chat', { id: chatInfoId });
        setEnteredText('');
    }, [enteredText, handlePostChat]);

    const onChangeChatText = useCallback((text: string) => {
        setEnteredText(text);
    }, []);

    useEffect(() => {
        syncChatStateWithServer();
    }, [syncChatStateWithServer]);

    return {
        chats,
        enteredText,
        setEnteredText,
        syncChatStateWithServer,
        handlePostChat,
        handlePressChatBtn,
        onChangeChatText,
    };
};

export default useChat;
