// * email type
export interface Email {
    id: string;
    conversationId: string;
    text: string;
    createdAt: number;
    fromUser: boolean;
    isDummy?: boolean;
}

export interface GlobalEmailListActionType {
    type?: string;
    conversationId: string;
    emailList?: Email[];
    email?: Email;
}

// * conversation type
export interface Conversation {
    id: string;
    userName: string;
    userAvatarUrl: string;
    title: string;
    createdAt: number;
    updatedAt: number;
}

export interface GlobalConversationListActionType {
    type?: string;
    globalConversationList?: Conversation[];
    conversationId?: string;
    updatedAt?: number;
}

// * selectedConversation type
export interface SelectedConversationType {
    conversationId: string | null;
    userName: string | null;
    userAvatarUrl: string | null;
    hasUpdate: boolean;
}

export interface SelectedConvesationActionType extends SelectedConversationType {
    type?: string;
}
