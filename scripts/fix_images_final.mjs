import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const productsDir = path.join(publicDir, 'images', 'products');

// Pool of 40+ Unique Reliable Nature/Texture Images for Fallbacks
// This ensures that if the main product image fails, we don't just use the same image 28 times.
const BACKUP_POOL = [
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80", // Nature texture
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80", // Forest
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80", // Hills
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80", // Forest 2
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80", // Dark leaves
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", // Foggy leaves
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80", // Tree
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?w=800&q=80", // Sunrise
    "https://images.unsplash.com/photo-1501854140884-074cf2b21d25?w=800&q=80", // Water
    "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&q=80", // Texture
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", // Work
    "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80", // Forest path
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80", // Nature
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80", // Field
    "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&q=80", // Bulb
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80", // Camping
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=800&q=80", // Bamboo texture
    "https://images.unsplash.com/photo-1491466424936-e304919aada7?w=800&q=80", // Plant
    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80", // Minimal
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80", // Bridge
    "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&q=80", // Forest fog
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80", // Plant flatlay
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80", // Sun
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80", // Leaves
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80", // Travel
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80", // Woods
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80", // Blue water
    "https://images.unsplash.com/photo-1440342359726-591836169f46?w=800&q=80", // Mountains
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80", // Landscape
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80", // Lake
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", // Food
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", // Coffee
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", // Cafe
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80", // Morning
    "https://images.unsplash.com/photo-1512428813837-c5993436d940?w=800&q=80", // Plant pot
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80", // Soap
    "https://images.unsplash.com/photo-1603504899738-9cf434190c42?w=800&q=80", // Brush
    "https://images.unsplash.com/photo-1602825389990-23a7e0edec28?w=800&q=80", // Wax
];

// Previous map (kept for reference, but we rely on backup pool for failures)
const IMAGE_MAP = {
    // Sustainable Fashion
    101: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    102: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    103: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    104: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    105: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80",
    106: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
    107: "https://images.unsplash.com/photo-1590735234538-4061e862c262?w=800&q=80",
    108: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=800&q=80",
    109: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
    110: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",

    // Eco Home
    201: "https://images.unsplash.com/photo-1589365278144-830550fac4a9?w=800&q=80",
    202: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    203: "https://images.unsplash.com/photo-1629196924846-77885b596568?w=800&q=80",
    204: "https://images.unsplash.com/photo-1594918734281-229d47936a7a?w=800&q=80",
    205: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80",
    206: "https://images.unsplash.com/photo-1602825389990-23a7e0edec28?w=800&q=80",
    207: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&q=80",
    208: "https://images.unsplash.com/photo-1622325988582-747de4de994b?w=800&q=80",
    209: "https://images.unsplash.com/photo-1603504899738-9cf434190c42?w=800&q=80",
    210: "https://images.unsplash.com/photo-1512428813837-c5993436d940?w=800&q=80",

    // Personal Care
    301: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=800&q=80",
    302: "https://images.unsplash.com/photo-1590159931217-17eb7d5cc4e2?w=800&q=80",
    303: "https://images.unsplash.com/photo-1608514143330-8a1a3682970a?w=800&q=80",
    304: "https://images.unsplash.com/photo-1607613009820-a29f7bb6dcaf?w=800&q=80",
    305: "https://images.unsplash.com/photo-1632738725835-296bc63d0920?w=800&q=80",
    306: "https://images.unsplash.com/photo-1596755389601-a19b889d7027?w=800&q=80",
    307: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&q=80",
    308: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80",
    309: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    310: "https://images.unsplash.com/photo-1603504899738-9cf434190c42?w=800&q=80",

    // Food
    401: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80",
    402: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
    403: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
    404: "https://images.unsplash.com/photo-1594488589094-g9e3345b53e8?w=800&q=80",
    405: "https://images.unsplash.com/photo-1615485925694-a692a30055e1?w=800&q=80",
    406: "https://images.unsplash.com/photo-1518112166137-5264b971a62d?w=800&q=80",
    407: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=800&q=80",
    408: "https://images.unsplash.com/photo-1579632857440-g3bd798229d1?w=800&q=80",
    409: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=800&q=80",
    410: "https://images.unsplash.com/photo-1599321955364-79fa2c46279f?w=800&q=80",

    // Zero Waste
    501: "https://images.unsplash.com/photo-1627916962804-d57551066746?w=800&q=80",
    502: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    503: "https://images.unsplash.com/photo-1574062168972-c510db9df781?w=800&q=80",
    504: "https://images.unsplash.com/photo-1527383418406-f85a3b146499?w=800&q=80",
    505: "https://images.unsplash.com/photo-1596755389445-0e6d625c2826?w=800&q=80",
    506: "https://images.unsplash.com/photo-1616401201977-805177242d99?w=800&q=80",
    507: "https://images.unsplash.com/photo-1606232594246-3c061d473489?w=800&q=80",
    508: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    509: "https://images.unsplash.com/photo-1632832961806-03fc05101a87?w=800&q=80",
    510: "https://images.unsplash.com/photo-1597505886638-b997c768ea3f?w=800&q=80",
};

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const downloadFile = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
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
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
};

const getUniqueBackupUrl = () => {
    if (BACKUP_POOL.length === 0) {
        // Recycle just in case we run out, though 38 should be enough for 28 failures
        return "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80";
    }
    const randomIndex = Math.floor(Math.random() * BACKUP_POOL.length);
    const url = BACKUP_POOL[randomIndex];

    // Remove it from pool to avoid duplicates
    BACKUP_POOL.splice(randomIndex, 1);

    return url;
};

const main = async () => {
    ensureDir(productsDir);
    console.log(`Starting Unique Image Generation. Backup Pool Size: ${BACKUP_POOL.length}`);

    for (const [id, url] of Object.entries(IMAGE_MAP)) {
        const filename = `${id}.jpg`;
        const filepath = path.join(productsDir, filename);

        // Skip ONLY if we are sure it's a good file. 
        // If it was a duplicate fallback (from previous run), we should probably overwrite it?
        // Actually, to be safe and fix the user's issue, let's ONLY skip if it exists AND the previous run didn't fail it.
        // But since we can't easily track that state, let's try to download the PRIMARY url.
        // If it fails, we use a unique backup.

        let success = false;

        // Strategy: Check if file exists. If so, we assume it *might* be the old duplicate one.
        // To be 100% sure we fix duplicates, we should try to re-download the ones that failed before.
        // Or simpler: Just rely on the "Failed Product..." log trigger to overwrite with unique backup.

        // Let's Force-Check the primary URL for everyone again just to be safe? 
        // No, that's slow.
        // Let's assume if the file exists from the *previous* run (which used the single fallback),
        // we might want to replace it if it's the duplicate image.
        // But checking file hash is hard. 

        // User said "208.jpg" is duplicated.
        // If we just re-run this logic:
        // Try Primary -> Fail -> Use UNIQUE backup.

        // We need to delete the "bad" files first or overwrite them.
        // `downloadFile` overwrites.

        try {
            // We can use a HEAD request to check if primary URL is 200 OK before downloading?
            // Or just try to download it.

            // To speed up: If existing file is roughly the size of the Generic Fallback (which was ~74KB or ~80KB specifically for that image), we overwrite.
            // But simpler: just try to download primary. If it fails (404), use unique backup.

            console.log(`Processing Product ${id}...`);
            await downloadFile(url, filepath);
            success = true;
        } catch (e) {
            console.error(`  -> Primary Failed: ${e.message}`);
            console.log(`  -> Assigning UNIQUE backup image...`);
            try {
                const uniqueUrl = getUniqueBackupUrl();
                await downloadFile(uniqueUrl, filepath);
                console.log(`  -> Backup Saved`);
                success = true;
            } catch (e2) {
                console.error("  -> Critical Failure on Backup: " + e2.message);
            }
        }

        // Ensure Gallery File Exists (Clone main image)
        const galleryFilename = `${id}-1.jpg`;
        const galleryFilepath = path.join(productsDir, galleryFilename);
        if (fs.existsSync(filepath)) {
            fs.copyFileSync(filepath, galleryFilepath); // Always overwrite gallery to match main
        }
    }
    console.log('--- Unique Fix Complete ---');
};

main();
