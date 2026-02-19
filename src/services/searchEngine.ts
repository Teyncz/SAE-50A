import {prisma} from "@/lib/prisma";
import {QuizAnswers} from "@/types/quiz";

export async function getSkiRecommendations(answers: QuizAnswers,colors: (string | number)[] = [], brand: (string | number)[] = []) {
    const allSkis = await prisma.skis.findMany({
        where: {
            ...(Array.isArray(brand) && brand.length > 0 && {
                brandId: { in: brand.map(Number) }
            }),

            ...(Array.isArray(colors) && colors.length > 0 && {
                colors: {
                    some: {
                        colorId: { in: colors.map(Number) }
                    }
                }
            }),
        },
        include: {
            specifications: true,
            brand: true,
            skiLengths: true,
            categories: { include: { category: true } },
            colors: { include: { color: true } },
        }
    });

    const categoriesTerrains = [
        {category: 'All-Mountain', terrains: ['slope', 'powder', 'park']},
        {category: 'Freeride', terrains: ['powder']},
        {category: 'Freestyle', terrains: ['park']},
        {category: 'Piste', terrains: ['slope']}
    ];

    const budgetRules: Record<string, (price: number) => boolean> = {
        "<300": (p) => p < 300,
        "300-500": (p) => p >= 300 && p <= 500,
        "500-800": (p) => p > 500 && p <= 800,
        ">800": () => true,
    };

    const engine = {
        "styles": {
            "type": "specifications",
            "target": {
                1: {"pop": 5, "handling": 6, "stability": 9, "float": 6},
                2: {"pop": 9, "handling": 9, "stability": 5, "float": 4},
                3: {"pop": 7, "handling": 9, "stability": 7, "float": 2}
            }
        },

    }

    const compatibleCategoryNames = categoriesTerrains
        .filter(item => item.terrains.includes(answers.terrain.toLowerCase()))
        .map(item => item.category.toLowerCase());

    const scoredSkis = allSkis
        .map(ski => {

            let score = 0;

            const skiCatNames = ski.categories.map(c => c.category.name.toLowerCase().trim());

            const matchCategory = skiCatNames.some(name => compatibleCategoryNames.includes(name));

            if (!matchCategory) return {...ski, finalScore: score};

            if (answers.budget && budgetRules[answers.budget]) {
                console.log(ski.retailPrice)
                if (budgetRules[answers.budget](ski.retailPrice)) {
                    score += 20;
                }
            }

            if (answers.style) {
                const styleKey = Number(answers.style) as 1 | 2 | 3;
                const target = engine.styles.target[styleKey];
                type SkiKeys = keyof typeof ski;

                const type = engine.styles.type as SkiKeys;
                const skiSpecs = ski[type];

                if (skiSpecs) {
                    for (const spec in target) {
                        const targetValue = target[spec as keyof typeof target];
                        const skiValue = skiSpecs[spec as keyof typeof skiSpecs] || 0;
                        const diff = Math.abs(targetValue - skiValue);
                        score += Math.max(0, 10 - diff);
                        // console.log( ski.model + ` ( ${spec} ) : ` + skiValue + " " + targetValue + " " + diff + " " + score);
                    }
                }

            }

            return {...ski, finalScore: score};
        })
        .filter((ski): ski is (typeof ski & { finalScore: number }) => {
            return ski.finalScore > 0;
        })
        .sort((a, b) => b.finalScore - a.finalScore);

    console.log(scoredSkis);
    return scoredSkis;
}