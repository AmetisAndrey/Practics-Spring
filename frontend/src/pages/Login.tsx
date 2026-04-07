import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ username, password });
            navigate('/');
        } catch (err) {
            setError('Не правильный логин или пароль');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card max-w-md w-full p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Вход</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Имя пользователя</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Пароль</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                        Войти
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Нет аккаунта?{' '}
                    <Link to="/register" className="text-purple-600 hover:underline">
                        Регистрация
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;