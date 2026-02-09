const API_URL = '/api';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};
