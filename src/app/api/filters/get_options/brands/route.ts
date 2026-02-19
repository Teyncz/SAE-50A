import {NextResponse} from 'next/server';
import {prisma} from "@/lib/prisma";

export async function GET() {

    try {
        const brands = await prisma.brand.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        const formattedBrands = brands.map(({ id, name }) => ({
            value: id,
            label: name,
        }));

        return NextResponse.json(formattedBrands);
    }catch (error) {
        console.error('Failed to fetch brands', error);
        return NextResponse.json({error: 'could not fetch brands'}, {status: 500});
    }
}
