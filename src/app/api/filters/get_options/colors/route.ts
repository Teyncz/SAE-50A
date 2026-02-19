import {NextResponse} from 'next/server';
import {prisma} from "@/lib/prisma";

export async function GET() {

    try {
        const colors = await prisma.colors.findMany({
            select: {
                id: true,
                name: true,
                hexaCode: true,
            }
        })

        const formattedColors = colors.map(({ id, name, ...data }) => ({
            value: id,
            label: name,
            ...data
        }));

        return NextResponse.json(formattedColors);
    }catch (error) {
        console.error('Failed to fetch colors', error);
        return NextResponse.json({error: 'could not fetch colors'}, {status: 500});
    }
}
