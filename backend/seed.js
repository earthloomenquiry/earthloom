import db from './database.js';
import { products, categories } from '../src/data/products.js';

const seedDatabase = () => {
    db.serialize(() => {
        // Clear existing data
        db.run("DELETE FROM categories");
        db.run("DELETE FROM products");
        db.run("DELETE FROM product_images");
        db.run("DELETE FROM product_features");

        // Insert Categories
        const categoryStmt = db.prepare("INSERT INTO categories (id, name, image, count) VALUES (?, ?, ?, ?)");
        categories.forEach(category => {
            categoryStmt.run(category.id, category.name, category.image, category.count);
        });
        categoryStmt.finalize();

        // Insert Products
        const productStmt = db.prepare("INSERT INTO products (id, name, category, price, originalPrice, discount, rating, reviews, image, description, inStock, brand) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        const imageStmt = db.prepare("INSERT INTO product_images (product_id, image_url) VALUES (?, ?)");
        const featureStmt = db.prepare("INSERT INTO product_features (product_id, feature) VALUES (?, ?)");

        products.forEach(product => {
            productStmt.run(
                product.id,
                product.name,
                product.category,
                product.price,
                product.originalPrice,
                product.discount,
                product.rating,
                product.reviews,
                product.image,
                product.description,
                product.inStock,
                product.brand
            );

            // Insert multiple images
            if (product.images && product.images.length > 0) {
                product.images.forEach(img => {
                    imageStmt.run(product.id, img);
                });
            }

            // Insert features
            if (product.features && product.features.length > 0) {
                product.features.forEach(feature => {
                    featureStmt.run(product.id, feature);
                });
            }
        });

        productStmt.finalize();
        imageStmt.finalize();
        featureStmt.finalize();

        console.log("Database seeded successfully!");
    });
};

seedDatabase();
