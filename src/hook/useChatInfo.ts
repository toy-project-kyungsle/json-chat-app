import { useQuery } from '@tanstack/react-query';
import useMyId from './useMyId';
import { useMemo } from 'react';
import { ChatInfoType } from '../utils/type';
import { getAllChatInfoFromServer } from '../api/chatInfoApi';

const useChatInfo = () => {
    const { myId } = useMyId();
    const { data: chatInfoFromServer } = useQuery<ChatInfoType[]>({
        queryKey: ['chatInfo', myId],
        queryFn: getAllChatInfoFromServer,
    });

    const myChatInfo = useMemo(() => {
        if (!chatInfoFromServer) return;
        return chatInfoFromServer.filter((_chatInfo: ChatInfoType) =>
            _chatInfo.attendee.includes(myId),
        );
    }, [chatInfoFromServer, myId]);

    return { myChatInfo };
};

export default useChatInfo;
