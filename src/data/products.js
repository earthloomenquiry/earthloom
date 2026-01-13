// Mock product data for the e-commerce store
export const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 12999,
        originalPrice: 19999,
        discount: 35,
        rating: 4.5,
        reviews: 2847,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop"
        ],
        description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding.",
        features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Bluetooth 5.0",
            "Premium comfort padding",
            "Foldable design"
        ],
        inStock: true,
        brand: "AudioPro"
    },
    {
        id: 2,
        name: "Smart Watch Series 7",
        category: "Electronics",
        price: 24999,
        originalPrice: 34999,
        discount: 29,
        rating: 4.7,
        reviews: 5234,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=800&fit=crop"
        ],
        description: "Stay connected and track your fitness goals with our latest smart watch. Features heart rate monitoring, GPS, and water resistance.",
        features: [
            "Heart rate monitor",
            "GPS tracking",
            "Water resistant (50m)",
            "7-day battery life",
            "Always-on display"
        ],
        inStock: true,
        brand: "TechWear"
    },
    {
        id: 3,
        name: "Minimalist Leather Backpack",
        category: "Fashion",
        price: 3499,
        originalPrice: 5999,
        discount: 42,
        rating: 4.3,
        reviews: 892,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=800&h=800&fit=crop"
        ],
        description: "Premium genuine leather backpack with modern minimalist design. Perfect for work, travel, or daily use.",
        features: [
            "Genuine leather",
            "Laptop compartment (15.6\")",
            "Multiple pockets",
            "Adjustable straps",
            "Water-resistant"
        ],
        inStock: true,
        brand: "UrbanStyle"
    },
    {
        id: 4,
        name: "4K Ultra HD Camera",
        category: "Electronics",
        price: 45999,
        originalPrice: 64999,
        discount: 29,
        rating: 4.8,
        reviews: 1567,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1606980707123-cccd25a0f21c?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop"
        ],
        description: "Capture stunning 4K videos and high-resolution photos with our professional-grade camera. Perfect for content creators and photography enthusiasts.",
        features: [
            "4K video recording",
            "24MP sensor",
            "Image stabilization",
            "WiFi & Bluetooth",
            "Touchscreen LCD"
        ],
        inStock: true,
        brand: "PixelPro"
    },
    {
        id: 5,
        name: "Ergonomic Office Chair",
        category: "Home",
        price: 8999,
        originalPrice: 14999,
        discount: 40,
        rating: 4.6,
        reviews: 3421,
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop"
        ],
        description: "Premium ergonomic office chair designed for all-day comfort. Features adjustable lumbar support and breathable mesh back.",
        features: [
            "Adjustable lumbar support",
            "Breathable mesh",
            "360° swivel",
            "Height adjustable",
            "Armrest adjustment"
        ],
        inStock: true,
        brand: "ComfortZone"
    },
    {
        id: 6,
        name: "Wireless Gaming Mouse",
        category: "Electronics",
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        rating: 4.4,
        reviews: 1876,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=800&h=800&fit=crop"
        ],
        description: "High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.",
        features: [
            "16000 DPI sensor",
            "RGB lighting",
            "6 programmable buttons",
            "70-hour battery",
            "Wireless charging"
        ],
        inStock: true,
        brand: "GameTech"
    },
    {
        id: 7,
        name: "Classic Denim Jacket",
        category: "Fashion",
        price: 2499,
        originalPrice: 3999,
        discount: 38,
        rating: 4.2,
        reviews: 654,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&h=800&fit=crop"
        ],
        description: "Timeless denim jacket with a modern fit. Made from premium quality denim for durability and style.",
        features: [
            "Premium denim fabric",
            "Classic fit",
            "Multiple pockets",
            "Button closure",
            "Machine washable"
        ],
        inStock: true,
        brand: "DenimCo"
    },
    {
        id: 8,
        name: "Stainless Steel Water Bottle",
        category: "Home",
        price: 799,
        originalPrice: 1299,
        discount: 38,
        rating: 4.5,
        reviews: 2341,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1624266888052-3e6e9b1b4e9e?w=800&h=800&fit=crop"
        ],
        description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
        features: [
            "Double-wall insulation",
            "24-hour cold retention",
            "BPA-free",
            "Leak-proof lid",
            "750ml capacity"
        ],
        inStock: true,
        brand: "HydroLife"
    },
    {
        id: 9,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 3999,
        originalPrice: 6999,
        discount: 43,
        rating: 4.6,
        reviews: 1923,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop"
        ],
        description: "Portable Bluetooth speaker with 360° sound and deep bass. Waterproof design perfect for outdoor adventures.",
        features: [
            "360° sound",
            "Waterproof (IPX7)",
            "20-hour battery",
            "Bluetooth 5.0",
            "Built-in microphone"
        ],
        inStock: true,
        brand: "SoundWave"
    },
    {
        id: 10,
        name: "Running Shoes",
        category: "Fashion",
        price: 4999,
        originalPrice: 7999,
        discount: 38,
        rating: 4.7,
        reviews: 4567,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop"
        ],
        description: "Lightweight running shoes with responsive cushioning and breathable mesh upper. Perfect for daily runs and workouts.",
        features: [
            "Responsive cushioning",
            "Breathable mesh",
            "Lightweight design",
            "Durable outsole",
            "Arch support"
        ],
        inStock: true,
        brand: "RunFast"
    },
    {
        id: 11,
        name: "Desk Lamp LED",
        category: "Home",
        price: 1499,
        originalPrice: 2499,
        discount: 40,
        rating: 4.3,
        reviews: 876,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&h=800&fit=crop"
        ],
        description: "Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.",
        features: [
            "Adjustable brightness",
            "Color temperature control",
            "USB charging port",
            "Touch control",
            "Energy efficient"
        ],
        inStock: true,
        brand: "BrightHome"
    },
    {
        id: 12,
        name: "Yoga Mat Premium",
        category: "Sports",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        rating: 4.5,
        reviews: 1234,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop"
        ],
        description: "Non-slip yoga mat with extra cushioning for comfort. Eco-friendly and durable material.",
        features: [
            "Non-slip surface",
            "6mm thickness",
            "Eco-friendly TPE",
            "Carrying strap included",
            "Easy to clean"
        ],
        inStock: true,
        brand: "ZenFit"
    },
    {
        id: 13,
        name: "Coffee Maker Automatic",
        category: "Home",
        price: 5999,
        originalPrice: 8999,
        discount: 33,
        rating: 4.4,
        reviews: 987,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop"
        ],
        description: "Programmable coffee maker with thermal carafe. Brew perfect coffee every morning with one-touch operation.",
        features: [
            "Programmable timer",
            "Thermal carafe",
            "12-cup capacity",
            "Auto shut-off",
            "Pause & serve"
        ],
        inStock: true,
        brand: "BrewMaster"
    },
    {
        id: 14,
        name: "Sunglasses Polarized",
        category: "Fashion",
        price: 1999,
        originalPrice: 3499,
        discount: 43,
        rating: 4.6,
        reviews: 1543,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=800&fit=crop"
        ],
        description: "Stylish polarized sunglasses with UV400 protection. Lightweight frame for all-day comfort.",
        features: [
            "Polarized lenses",
            "UV400 protection",
            "Lightweight frame",
            "Scratch-resistant",
            "Includes case"
        ],
        inStock: true,
        brand: "SunStyle"
    },
    {
        id: 15,
        name: "Mechanical Keyboard RGB",
        category: "Electronics",
        price: 6999,
        originalPrice: 9999,
        discount: 30,
        rating: 4.8,
        reviews: 2156,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop"
        ],
        description: "Premium mechanical keyboard with customizable RGB backlighting and tactile switches. Perfect for gaming and typing.",
        features: [
            "Mechanical switches",
            "RGB backlighting",
            "Programmable keys",
            "Aluminum frame",
            "Detachable cable"
        ],
        inStock: true,
        brand: "KeyMaster"
    },
    {
        id: 16,
        name: "Fitness Tracker Band",
        category: "Electronics",
        price: 2499,
        originalPrice: 3999,
        discount: 38,
        rating: 4.3,
        reviews: 3421,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=800&h=800&fit=crop"
        ],
        description: "Track your fitness goals with this sleek fitness band. Features heart rate monitoring, sleep tracking, and waterproof design.",
        features: [
            "Heart rate monitor",
            "Sleep tracking",
            "Waterproof",
            "10-day battery",
            "Step counter"
        ],
        inStock: true,
        brand: "FitLife"
    },
    {
        id: 17,
        name: "Canvas Tote Bag",
        category: "Fashion",
        price: 899,
        originalPrice: 1499,
        discount: 40,
        rating: 4.4,
        reviews: 765,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&h=800&fit=crop"
        ],
        description: "Eco-friendly canvas tote bag perfect for shopping, beach, or daily use. Durable and stylish.",
        features: [
            "100% cotton canvas",
            "Large capacity",
            "Reinforced handles",
            "Inner pocket",
            "Machine washable"
        ],
        inStock: true,
        brand: "EcoBag"
    },
    {
        id: 18,
        name: "Air Purifier HEPA",
        category: "Home",
        price: 7999,
        originalPrice: 12999,
        discount: 38,
        rating: 4.7,
        reviews: 1876,
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=800&h=800&fit=crop"
        ],
        description: "HEPA air purifier removes 99.97% of airborne particles. Quiet operation and smart air quality monitoring.",
        features: [
            "HEPA filter",
            "Smart sensors",
            "Quiet operation",
            "3-speed settings",
            "Timer function"
        ],
        inStock: true,
        brand: "PureAir"
    },
    {
        id: 19,
        name: "Notebook Set Premium",
        category: "Books",
        price: 599,
        originalPrice: 999,
        discount: 40,
        rating: 4.5,
        reviews: 2341,
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=800&fit=crop"
        ],
        description: "Set of 3 premium notebooks with hardcover and dotted pages. Perfect for journaling, note-taking, or sketching.",
        features: [
            "Hardcover design",
            "Dotted pages",
            "180 pages each",
            "Ribbon bookmark",
            "Elastic closure"
        ],
        inStock: true,
        brand: "WriteWell"
    },
    {
        id: 20,
        name: "Phone Stand Adjustable",
        category: "Electronics",
        price: 499,
        originalPrice: 899,
        discount: 44,
        rating: 4.2,
        reviews: 1234,
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&h=800&fit=crop"
        ],
        description: "Adjustable phone stand compatible with all smartphones and tablets. Sturdy aluminum construction.",
        features: [
            "Adjustable angle",
            "Aluminum build",
            "Non-slip base",
            "Universal compatibility",
            "Foldable design"
        ],
        inStock: true,
        brand: "StandPro"
    }
];

export const categories = [
    {
        id: 1,
        name: "Electronics",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
        count: 8
    },
    {
        id: 2,
        name: "Fashion",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
        count: 5
    },
    {
        id: 3,
        name: "Home",
        image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop",
        count: 5
    },
    {
        id: 4,
        name: "Sports",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
        count: 1
    },
    {
        id: 5,
        name: "Books",
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop",
        count: 1
    }
];

export default products;
