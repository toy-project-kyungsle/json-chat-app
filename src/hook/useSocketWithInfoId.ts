import { useEffect } from 'react';
import { io } from 'socket.io-client';

const newSocket = io('http://192.168.0.7:3000');

const useSocketWithInfoId = (chatInfoId: string, CallBack: () => void) => {
    useEffect(() => {
        newSocket.connect();
        newSocket.on(`chat-${chatInfoId}`, () => {
            CallBack();
        });
        return () => {
            newSocket.off(`chat-${chatInfoId}`);
            newSocket.disconnect();
        };
    }, [chatInfoId]);

    return { newSocket };
};

export default useSocketWithInfoId;
