import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Import data directly
import { products, categories } from '../src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

const FALLBACK_URL = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80";

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const downloadFile = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        file.on('error', (err) => {
            reject(err);
        });

        const request = https.get(url, (response) => {
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(filepath, () => { });
                reject(new Error(`Status ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(true);
            });
        });

        request.on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
};

const downloadImageWithFallback = async (originalUrl, filepath) => {
    // Skip if exists and has content
    if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        if (stats.size > 0) {
            console.log(`Skipping (Exists): ${path.basename(filepath)}`);
            return;
        }
    }

    try {
        console.log(`Downloading: ${path.basename(filepath)}...`);
        await downloadFile(originalUrl, filepath);
        console.log(`  -> Success (Original)`);
    } catch (err) {
        console.error(`  -> Failed original (${err.message}). Trying fallback...`);
        try {
            await delay(500); // Wait a bit before retry
            await downloadFile(FALLBACK_URL, filepath);
            console.log(`  -> Success (Fallback)`);
        } catch (fallbackErr) {
            console.error(`  -> Failed fallback too! ${fallbackErr.message}`);
        }
    }
};

const main = async () => {
    const productsDir = path.join(publicDir, 'images', 'products');
    const categoriesDir = path.join(publicDir, 'images', 'categories');

    ensureDir(productsDir);
    ensureDir(categoriesDir);

    console.log('--- Starting Category Image Download ---');
    for (const cat of categories) {
        const filename = `c-${cat.id}.jpg`;
        const filepath = path.join(categoriesDir, filename);
        await downloadImageWithFallback(cat.image, filepath);
    }

    console.log('--- Starting Product Image Download ---');
    for (const prod of products) {
        // Main image
        const mainFilename = `p-${prod.id}.jpg`;
        const mainFilepath = path.join(productsDir, mainFilename);
        await downloadImageWithFallback(prod.image, mainFilepath);

        // Gallery images
        if (prod.images && prod.images.length > 0) {
            for (let i = 0; i < prod.images.length; i++) {
                const galleryFilename = `p-${prod.id}-${i + 1}.jpg`;
                const galleryFilepath = path.join(productsDir, galleryFilename);
                await downloadImageWithFallback(prod.images[i], galleryFilepath);
            }
        }
    }

    console.log('--- Download Complete ---');
};

main();
