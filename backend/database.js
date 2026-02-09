import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'earthloom.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  // Create Categories Table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    count INTEGER
  )`);

  // Create Products Table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    originalPrice INTEGER,
    discount INTEGER,
    rating REAL,
    reviews INTEGER,
    image TEXT,
    description TEXT,
    inStock BOOLEAN,
    brand TEXT
  )`);

  // Create Product Images Table (for multiple images per product)
  db.run(`CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    image_url TEXT,
    FOREIGN KEY(product_id) REFERENCES products(id)
  )`);

  // Create Product Features Table (for features array)
  db.run(`CREATE TABLE IF NOT EXISTS product_features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    feature TEXT,
    FOREIGN KEY(product_id) REFERENCES products(id)
  )`);
});

export default db;
