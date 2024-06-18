import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatList from 'page/ChatList';
import ConversationList from 'page/ConversationList';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={ConversationList} />
                <Stack.Screen name="ChatList" component={ChatList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
