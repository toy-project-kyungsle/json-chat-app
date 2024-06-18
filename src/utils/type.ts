// * email type
export interface Chat {
    id: string;
    conversationId: string;
    text: string;
    createdAt: number;
    fromUser: boolean;
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
