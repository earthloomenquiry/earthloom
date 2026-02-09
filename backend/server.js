import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve static images from the frontend public folder
// Assuming existing images are in ../public/images
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// API Routes

// Get all categories
app.get('/api/categories', (req, res) => {
    db.all("SELECT * FROM categories", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get all products
app.get('/api/products', (req, res) => {
    const sql = `
    SELECT p.*, 
           GROUP_CONCAT(DISTINCT pi.image_url) as images_list,
           GROUP_CONCAT(DISTINCT pf.feature) as features_list
    FROM products p
    LEFT JOIN product_images pi ON p.id = pi.product_id
    LEFT JOIN product_features pf ON p.id = pf.product_id
    GROUP BY p.id
  `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        // Process results to convert comma-separated strings back to arrays
        const processedRows = rows.map(row => ({
            ...row,
            inStock: Boolean(row.inStock),
            images: row.images_list ? row.images_list.split(',') : [],
            features: row.features_list ? row.features_list.split(',') : []
        }));

        res.json(processedRows);
    });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;

    const productSql = "SELECT * FROM products WHERE id = ?";
    const imagesSql = "SELECT image_url FROM product_images WHERE product_id = ?";
    const featuresSql = "SELECT feature FROM product_features WHERE product_id = ?";

    db.get(productSql, [productId], (err, product) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        db.all(imagesSql, [productId], (err, images) => {
            if (err) return res.status(500).json({ error: err.message });

            db.all(featuresSql, [productId], (err, features) => {
                if (err) return res.status(500).json({ error: err.message });

                const fullProduct = {
                    ...product,
                    inStock: Boolean(product.inStock),
                    images: images.map(img => img.image_url),
                    features: features.map(f => f.feature)
                };

                res.json(fullProduct);
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
