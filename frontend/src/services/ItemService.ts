import api from './api';
import type {Item, ItemCreateUpdate, PageResponse} from '../types';

export const getItems = async (search: string = '', page: number = 0, size: number = 10): Promise<PageResponse<Item>> => {
    const response = await api.get<PageResponse<Item>>('/api/items', {
        params: { search, page, size },
    });
    return response.data;
};

export const getItemById = async (id: string): Promise<Item> => {
    const response = await api.get<Item>(`/api/items/${id}`);
    return response.data;
};

export const createItem = async (item: ItemCreateUpdate): Promise<void> => {
    await api.post('/api/items', item);
};

export const updateItem = async (id: string, item: ItemCreateUpdate): Promise<void> => {
    await api.put(`/api/items/${id}`, item);
};

export const deleteItem = async (id: string): Promise<void> => {
    await api.delete(`/api/items/${id}`);
};