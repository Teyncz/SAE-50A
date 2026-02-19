import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(
    request: Request,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params;
        const skiId = parseInt(id, 10);

        if (isNaN(skiId)) {
            return NextResponse.json({error: "ID invalide"}, {status: 400});
        }

        const ski = await prisma.skis.findUnique({
            where: {id: skiId},
            include: {
                brand: true,
                skiLengths: true,
                specifications: true,
                images: true,
                categories: {
                    include: {
                        category: true
                    }
                },
                colors: {
                    include: {
                        color: true
                    }
                }
            }
        });

        if (!ski) {
            return NextResponse.json({error: "Ski non trouvé"}, {status: 404});
        }

        return NextResponse.json(ski);
    } catch (error) {
        console.error("Error fetching ski:", error);
        return NextResponse.json({error: "Erreur serveur"}, {status: 500});
    }
}

