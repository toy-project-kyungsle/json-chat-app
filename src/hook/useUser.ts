import { useCallback } from 'react';
import { ChatInfoType, UserType } from '../utils/type';
import { getUserListFromServer } from '../api/userApi';
import { useQuery } from '@tanstack/react-query';
import useMyId from './useMyId';

const useUser = () => {
    const { myId } = useMyId();

    const { data: userList } = useQuery<UserType[]>({
        queryKey: ['userList'],
        queryFn: getUserListFromServer,
    });

    const getCounterUser = useCallback(
        (targetChatInfo: ChatInfoType | undefined) => {
            if (!targetChatInfo || !myId || !userList) return null;
            const _attendee = targetChatInfo.attendee;
            const _counterUserId = _attendee.find((userId: string) => userId !== myId);
            const _counterUser = userList.find((user: UserType) => user.id === _counterUserId);
            return _counterUser;
        },
        [myId, userList],
    );

    return {
        userList,
        getCounterUser,
    };
};

export default useUser;
