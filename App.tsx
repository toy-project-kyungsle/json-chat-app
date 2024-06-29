import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatList from './src/page/ChatList';
import ConversationList from './src/page/ConversationList';
import Home from './src/page/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
    return (
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="ConversationList" component={ConversationList} />
                    <Stack.Screen name="ChatList" component={ChatList} />
                </Stack.Navigator>
            </QueryClientProvider>
        </NavigationContainer>
    );
}
