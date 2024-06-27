// * chat type
export interface ChatType {
    id: string;
    conversationId: string;
    text: string;
    createdAt: number;
    userId: string;
    userName: string;
    userAvatarUrl: string;
}

export interface ChatTypeForPut {
    id?: string;
    conversationId: string;
    text: string;
    createdAt?: number;
    userId?: string;
    userName?: string;
    userAvatarUrl?: string;
}

// * conversation type
export interface ConversationType {
    id: string;
    userId: string;
    userName: string;
    userAvatarUrl: string;
    title: string;
    createdAt: number;
    updatedAt: number;
}
