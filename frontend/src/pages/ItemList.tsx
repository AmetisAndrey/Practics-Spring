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
        if (window.confirm('Вы действительно хотите удалить?')) {
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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Заметки</h1>
                <Link
                    to="/items/new"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                >
                     Создать новое
                </Link>
            </div>

            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Поиск по названию или описанию..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
                    >
                       Поиск
                    </button>
                </div>
            </form>

            {loading && <div className="text-center text-gray-500">Загрузка</div>}

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">Название</th>
                        <th className="py-3 px-6 text-left">Описание</th>
                        <th className="py-3 px-6 text-left">Время создания</th>
                        <th className="py-3 px-6 text-center">Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-6">{item.name}</td>
                            <td className="py-3 px-6">{item.description || '—'}</td>
                            <td className="py-3 px-6">{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 px-6 text-center space-x-2">
                                <Link
                                    to={`/items/${item.id}/edit`}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded inline-block"
                                >
                                    Изменить
                                </Link>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    {items.length === 0 && (
                        <tr>
                            <td colSpan={4} className="py-4 text-center text-gray-500">
                                Заметка не найдена
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    <button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 0}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 bg-gray-800 text-white rounded">
            {page + 1} / {totalPages}
          </span>
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page + 1 >= totalPages}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                    >
                        Следующее
                    </button>
                </div>
            )}
        </div>
    );
};

export default ItemList;