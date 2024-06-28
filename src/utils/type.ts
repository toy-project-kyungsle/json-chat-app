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
    id: string;
    conversationId: string;
    text: string;
    createdAt: number;
    userId: string;
}

// * conversation type
export interface ConversationType {
    id: string;
    createdAt: number;
    updatedAt: number;
    attendee: string[];
}
