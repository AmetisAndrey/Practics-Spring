import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(form);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Ошибка регистрации');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card max-w-md w-full p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Зарегистрироваться</h2>

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
                            name="username"
                            className="input-field"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input-field"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Пароль</label>
                        <input
                            type="password"
                            name="password"
                            className="input-field"
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                        Зарегистрироваться
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Аккаунт уже существует?{' '}
                    <Link to="/login" className="text-purple-600 hover:underline">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;