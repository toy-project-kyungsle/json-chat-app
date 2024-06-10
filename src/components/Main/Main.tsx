import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Styled from './Main.styled';
import { SelectedConversationType } from 'utils/type';
import EmailArea from 'components/EmailArea/EmailArea';
import ConversationList from 'components/ConversationList/ConversationList';

function Main() {
    const queryCache = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
            },
        },
    });
    const [selectedConversation, setSelectedConversation] = useState<SelectedConversationType>({
        conversationId: null,
        userName: null,
        userAvatarUrl: null,
    });

    return (
        <QueryClientProvider client={queryCache}>
            <Styled.Main>
                <ConversationList
                    selectedConversation={selectedConversation}
                    setSelectedConversation={setSelectedConversation}
                />
                <EmailArea selectedConversation={selectedConversation} />
            </Styled.Main>
        </QueryClientProvider>
    );
}

export default Main;
