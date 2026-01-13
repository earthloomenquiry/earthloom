import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ShopContext = createContext();

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop must be used within ShopProvider');
    }
    return context;
};

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    // Persist cart to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Persist wishlist to localStorage
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Persist orders to localStorage
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // Persist user to localStorage
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    // Persist dark mode to localStorage
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                toast.success('Updated cart quantity');
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            toast.success('Added to cart!');
            return [...prevCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        toast.success('Removed from cart');
    };

    const updateCartQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const addToWishlist = (product) => {
        setWishlist((prevWishlist) => {
            const exists = prevWishlist.find((item) => item.id === product.id);
            if (exists) {
                toast.error('Already in wishlist');
                return prevWishlist;
            }
            toast.success('Added to wishlist!');
            return [...prevWishlist, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) =>
            prevWishlist.filter((item) => item.id !== productId)
        );
        toast.success('Removed from wishlist');
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    const placeOrder = (orderDetails) => {
        const newOrder = {
            id: Date.now(),
            items: [...cart],
            ...orderDetails,
            date: new Date().toISOString(),
            status: 'Pending',
        };
        setOrders((prevOrders) => [newOrder, ...prevOrders]);
        clearCart();
        toast.success('Order placed successfully!');
        return newOrder;
    };

    const login = (userData) => {
        setUser(userData);
        toast.success('Logged in successfully!');
    };

    const logout = () => {
        setUser(null);
        toast.success('Logged out successfully!');
    };

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    const cartTotal = cart.reduce((total, item) => {
        const discountedPrice = item.price - (item.price * item.discount) / 100;
        return total + discountedPrice * item.quantity;
    }, 0);

    const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

    const value = {
        cart,
        wishlist,
        orders,
        user,
        darkMode,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        placeOrder,
        login,
        logout,
        toggleDarkMode,
        cartTotal,
        cartItemsCount,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
