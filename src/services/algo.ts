import {prisma} from "@/lib/prisma";
import {QuizAnswers} from "@/types/quiz";

export async function getSkiRecommendations(answers: QuizAnswers) {

    const allSkis = await prisma.skis.findMany({
        include: {
            specifications: true,
            brand: true,
            skiLengths: true,
        }
    });

    return allSkis
}