import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, createItem, updateItem } from '../services/ItemService.ts';
import type {ItemCreateUpdate} from '../types';

const ItemForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form, setForm] = useState<ItemCreateUpdate>({ name: '', description: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            getItemById(id).then((item) =>
                setForm({ name: item.name, description: item.description })
            );
        }
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) await updateItem(id, form);
            else await createItem(form);
            navigate('/');
        } catch (err) {
            setError('Ошибка сохранения');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {id ? 'Изменить задачу' : 'Создать задачу'}
                </h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Название</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={form.name}
                            onChange={handleChange}
                            required
                            minLength={3}
                            maxLength={50}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Описание</label>
                        <textarea
                            name="description"
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={form.description}
                            onChange={handleChange}
                            maxLength={255}
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="btn-primary text-white px-4 py-2 rounded transition"
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="bg-red-700/60  text-white px-4 py-3 rounded-lg transition"
                        >
                            Отменить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemForm;