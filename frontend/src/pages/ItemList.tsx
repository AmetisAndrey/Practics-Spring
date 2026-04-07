import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/ItemService.ts';
import type {Item} from '../types';
import { Link } from 'react-router-dom';

const ItemList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const data = await getItems(search, page, 10);
            setItems(data.content);
            setTotalPages(data.totalPages);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [page, search]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Вы действительно хотите удалить задачу?')) {
            await deleteItem(id);
            fetchItems();
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        fetchItems();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="glass-card p-6 mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-3xl font-bold text-white">Задачи</h1>
                    <Link to="/items/new" className="btn-primary">
                        Создать задачу
                    </Link>
                </div>
            </div>

            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Поиск..."
                        className="glass-input flex-1 input-field"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="btn-primary">
                        Поиск
                    </button>
                </div>
            </form>

            {loading && (
                <div className="text-center text-white/60 py-8">
                    Загрузка...
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <div key={item.id} className="card p-6 hover:transform hover:scale-105 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">{item.name}</h3>
                        <p className="text-gray-700 mb-4">{item.description || 'Нет описания'}</p>
                        <div className="text-sm text-white/40 mb-4">
                            Created: {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                            <Link to={`/items/${item.id}/edit`} className="btn-primary text-sm flex-1 text-center">
                                Изменить
                            </Link>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-700/60 hover:bg-red-500/30 text-white px-4 py-2 rounded-lg transition flex-1"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {items.length === 0 && !loading && (
                <div className="glass-card p-12 text-center">
                    <p className="text-white/60 text-lg">Нет задач</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    <button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 0}
                        className="glass-button-secondary disabled:opacity-50"
                    >
                        Назад
                    </button>
                    <span className="glass-card px-4 py-2 text-white">
            {page + 1} / {totalPages}
          </span>
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page + 1 >= totalPages}
                        className="glass-button-secondary disabled:opacity-50"
                    >
                        Вперед
                    </button>
                </div>
            )}
        </div>
    );
};

export default ItemList;