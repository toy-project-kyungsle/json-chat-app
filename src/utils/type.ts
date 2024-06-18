// * email type
export interface Chat {
    id: string;
    conversationId: string;
    text: string;
    createdAt: number;
    userId: string;
    userName: string;
    userAvatarUrl: string;
}

// * conversation type
export interface Conversation {
    id: string;
    userId: string;
    userName: string;
    userAvatarUrl: string;
    title: string;
    createdAt: number;
    updatedAt: number;
}
