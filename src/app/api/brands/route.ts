import fs from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const dir = path.join(process.cwd(), 'public', 'images', 'brands');
        const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|svg|webp|avif|gif)$/i.test(f));
        return NextResponse.json(files);
    } catch (error) {
        console.error('Failed to read brand images', error);
        return NextResponse.json({error: 'could not read brand images'}, {status: 500});
    }
}
