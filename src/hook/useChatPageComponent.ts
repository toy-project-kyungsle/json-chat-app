import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChatInfoType, ChatType, UserType } from '../utils/type';
import { getAllChatByIdFromServer, putChatByInfoId } from '../api/chatApi';
import { useQuery } from '@tanstack/react-query';
import { getChatInfoByIdFromServer } from '../api/chatInfoApi';
import useMyId from './useMyId';
import useUser from './useUser';
import useSocketWithInfoId from './useSocketWithInfoId';

const useChatPageComponent = (chatInfoId: string) => {
    const { myId } = useMyId();
    const { getCounterUser } = useUser();
    const { newSocket } = useSocketWithInfoId(chatInfoId, () => syncChatStateWithServer());
    const [chats, setChats] = useState<ChatType[]>([]);
    const [enteredText, setEnteredText] = useState<string>('');
    const { data: targetChatInfo } = useQuery<ChatInfoType>({
        queryKey: [`chatInfo-${chatInfoId}`],
        queryFn: () => getChatInfoByIdFromServer(chatInfoId),
    });
    const counterUser = useMemo(
        () => getCounterUser(targetChatInfo),
        [targetChatInfo, getCounterUser],
    );

    const syncChatStateWithServer = useCallback(async () => {
        const _emails = await getAllChatByIdFromServer(chatInfoId);
        setChats(_emails);
    }, [chatInfoId]);

    const handlePostChat = useCallback(async () => {
        const newProp = {
            infoId: chatInfoId,
            text: enteredText,
            userId: myId,
        };
        return await putChatByInfoId(newProp);
    }, [enteredText, myId, chatInfoId]);

    const handlePressChatBtn = useCallback(async () => {
        if (enteredText === '') return;
        await handlePostChat();
        newSocket.emit('chat', { id: chatInfoId });
        setEnteredText('');
    }, [enteredText, handlePostChat]);

    useEffect(() => {
        syncChatStateWithServer();
    }, [syncChatStateWithServer]);

    return {
        chats,
        enteredText,
        setEnteredText,
        counterUser,
        handlePressChatBtn,
        myId,
    };
};

export default useChatPageComponent;
