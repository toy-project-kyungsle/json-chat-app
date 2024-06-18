// * email type
export interface Email {
    id: string;
    conversationId: string;
    text: string;
    createdAt: number;
    fromUser: boolean;
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
