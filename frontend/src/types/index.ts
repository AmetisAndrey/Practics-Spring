export interface Item {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updateAt: string;
}

export interface ItemCreateUpdate {
    name: string;
    description?:string;
}

export interface AuthRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    username: string;
    role: string;
}

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}