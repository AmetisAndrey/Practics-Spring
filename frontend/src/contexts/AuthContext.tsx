import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { login as loginApi, register as registerApi } from '../services/authService.ts';
import type {RegisterRequest, AuthRequest} from '../types';

interface AuthContextType {
    user: { username: string; role: string } | null;
    token: string | null;
    login: (data: AuthRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<{ username: string; role: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = async (data: AuthRequest) => {
        const response = await loginApi(data);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({ username: response.username, role: response.role }));
        setToken(response.token);
        setUser({ username: response.username, role: response.role });
    };

    const register = async (data: RegisterRequest) => {
        const response = await registerApi(data);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({ username: response.username, role: response.role }));
        setToken(response.token);
        setUser({ username: response.username, role: response.role });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};