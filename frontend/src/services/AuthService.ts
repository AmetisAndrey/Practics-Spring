import api from './api';
import {AuthRequest, AuthResponse, RegisterRequest} from "../types";

export const login = async (data: AuthResponse): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/login', data);
    return response.data;
}

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data)
    return response.data;
}
