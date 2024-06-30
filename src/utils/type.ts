// * chat type
export interface ChatType {
    id: string;
    infoId: string;
    text: string;
    createdAt: number;
    userId: string;
}

export interface ChatTypeForPut {
    id?: string;
    infoId: string;
    text: string;
    createdAt?: number;
    userId: string;
}

// * conversation type
export interface ChatInfoType {
    id: string;
    createdAt: number;
    updatedAt: number;
    attendee: string[];
}

// * user type
export interface UserType {
    id: string;
    name: string;
    avatarUrl: string;
}
