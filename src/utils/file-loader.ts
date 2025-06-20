import { promises as fs } from 'fs';
import path from 'path';

/**
 * Reads a markdown file from the public/legal directory
 * @param filename - The name of the file to read
 * @returns The content of the file
 */
export async function readMarkdownFile(filename: string): Promise<string> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'legal', filename);
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        console.error(`Error reading markdown file ${filename}:`, error);
        return '# Error loading content\n\nThe requested content could not be loaded.';
    }
}

/**
 * Reads and parses a JSON file from the public/legal directory
 * @param filename - The name of the file to read
 * @returns The parsed JSON data
 */
export async function readJsonFile<T>(filename: string): Promise<T | null> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'legal', filename);
        const content = await fs.readFile(filePath, 'utf8');
        return JSON.parse(content) as T;
    } catch (error) {
        console.error(`Error reading JSON file ${filename}:`, error);
        return null;
    }
}
