import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const p = path.resolve('src/data/products.js');
const content = fs.readFileSync(p, 'utf-8');

const projectRoot = path.resolve('.');
const productsDir = path.join(projectRoot, 'public', 'images', 'products');
const categoriesDir = path.join(projectRoot, 'public', 'images', 'categories');

if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });
if (!fs.existsSync(categoriesDir)) fs.mkdirSync(categoriesDir, { recursive: true });

// Backup Pool for when the primary remote URL in products.js fails (404/403)
const BACKUP_POOL = [
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80",
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?w=800&q=80",
    "https://images.unsplash.com/photo-1501854140884-074cf2b21d25?w=800&q=80",
    "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&q=80",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=800&q=80",
    "https://images.unsplash.com/photo-1491466424936-e304919aada7?w=800&q=80",
    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
];

const getUniqueBackupUrl = () => {
    if (BACKUP_POOL.length === 0) return "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80";
    const randomIndex = Math.floor(Math.random() * BACKUP_POOL.length);
    const url = BACKUP_POOL[randomIndex];
    BACKUP_POOL.splice(randomIndex, 1);
    return url;
};

const downloadFile = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        const request = https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                file.close();
                fs.unlink(filepath, () => { });
                reject(`Status ${response.statusCode}`);
            }
        });
        request.on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err.message);
        });
    });
};

const main = async () => {
    const productMatches = [...content.matchAll(/id:\s*(\d+),[\s\S]*?image:\s*"(https:\/\/[^"]+)"/g)];
    const productGalleryMatches = [...content.matchAll(/id:\s*(\d+),[\s\S]*?images:\s*\[([\s\S]*?)\]/g)];

    // Download Products with Fallback
    for (const match of productMatches) {
        const id = match[1];
        let url = match[2];
        const filename = `${id}.jpg`;
        const filepath = path.join(productsDir, filename);

        console.log(`Product ${id}: Downloading...`);
        try {
            await downloadFile(url, filepath);
        } catch (e) {
            console.error(`Product ${id} Failed: ${e}. Using Backup.`);
            try {
                url = getUniqueBackupUrl();
                await downloadFile(url, filepath);
                console.log(`Product ${id} Backup Saved.`);
            } catch (e2) {
                console.error(`Product ${id} Backup Failed too.`);
            }
        }
    }

    // Ensure gallery consistency
    for (const match of productGalleryMatches) {
        const id = match[1];
        const mainFilepath = path.join(productsDir, `${id}.jpg`);
        const galleryFilepath = path.join(productsDir, `${id}-1.jpg`);

        if (fs.existsSync(mainFilepath)) {
            // Simply copy main image to gallery image to ensure it exists and matches
            fs.copyFileSync(mainFilepath, galleryFilepath);
        }
    }

    console.log("Localization Complete.");
};

main();
