// Mock order history data
export const mockOrders = [
    {
        id: "ORD-2024-001",
        date: "2024-01-10",
        status: "Delivered",
        total: 15998,
        items: [
            {
                id: 1,
                name: "Premium Wireless Headphones",
                price: 12999,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
            },
            {
                id: 8,
                name: "Stainless Steel Water Bottle",
                price: 799,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop"
            }
        ],
        shippingAddress: {
            name: "Deepak Kumar",
            address: "Gandak colony , Motihari , East Champaran Bihar",
            city: "Motihari",
            state: "Bihar",
            pincode: "400001"
        },
        paymentMethod: "Credit Card"
    },
    {
        id: "ORD-2024-002",
        date: "2024-01-08",
        status: "In Transit",
        total: 24999,
        items: [
            {
                id: 2,
                name: "Smart Watch Series 7",
                price: 24999,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop"
            }
        ],
        shippingAddress: {
            name: "John Doe",
            address: "123 Main Street, Apartment 4B",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001"
        },
        paymentMethod: "UPI",
        trackingNumber: "TRK123456789"
    },
    {
        id: "ORD-2024-003",
        date: "2024-01-05",
        status: "Delivered",
        total: 8999,
        items: [
            {
                id: 5,
                name: "Ergonomic Office Chair",
                price: 8999,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200&h=200&fit=crop"
            }
        ],
        shippingAddress: {
            name: "John Doe",
            address: "123 Main Street, Apartment 4B",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001"
        },
        paymentMethod: "Cash on Delivery"
    }
];

export default mockOrders;
