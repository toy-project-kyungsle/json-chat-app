import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'reducers';

import Styled from './Main.styled';
import { SelectedConversationType } from 'utils/type';

function Main() {
    const queryCache = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
            },
        },
    });
    const store = createStore(rootReducer);
    const [selectedConversation, setSelectedConversation] = useState<SelectedConversationType>({
        conversationId: null,
        userName: null,
        userAvatarUrl: null,
    });

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryCache}>
                <Styled.Main>
                    <Styled.ConversationList
                        selectedConversation={selectedConversation}
                        setSelectedConversation={setSelectedConversation}
                    />
                    <Styled.EmailArea selectedConversation={selectedConversation} />
                </Styled.Main>
            </QueryClientProvider>
        </Provider>
    );
}

export default Main;
