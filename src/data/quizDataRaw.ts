import type {QuizRaw} from "@/types/quiz";


export const QUIZ_QUESTIONS: QuizRaw[] = [
    {
        id: "terrain",
        label: "Quel est votre terrain principale ?",
        placeholder: "Selectionnez votre terrain",
        type: "select",
        options: [
            {label: "Piste", value: "slope"},
            {label: "Park", value: "park"},
            {label: "Poudreuse", value: "powder"},
        ]
    },
    {
        id: "level",
        label: "Comment évaluez-vous votre niveau ?",
        placeholder: "Selectionnez votre niveau",
        type: "select",
        options: [
            {label: "Débutant", value: 1},
            {label: "Débrouillé avec faible condition physique", value: 2},
            {label: "Débrouillé avec bonne condition", value: 3},
            {label: "Bon skieur style souple", value: 5},
            {label: "Passe partout de façon aisée", value: 6},
            {label: "Bon skieur, ski d'attaque sur tout terrain", value: 8},
            {label: "Expert, sur terrains engagés", value: 10},
        ]
    }, {
        id: "style",
        label: "Quel est style recherchez-vous ?",
        placeholder: "Selectionnez votre style recherchez-vous ?",
        type: "select",
        options: [
            {label: "Vitesse et stabilité", value: 1},
            {label: "Pop & Freestyle", value: 2},
            {label: "Vif & Rayon court", value: 3},
        ]
    },
    {
        id: "height",
        label: "Votre taille ?",
        placeholder: "Indiquez votre taille en cm",
        type: "input",
        inputType: "number",
    },
    {
        id: "weight",
        label: "Votre poids ?",
        placeholder: "Indiquez votre poids en kg",
        type: "input",
        inputType: "number",
    },
    {
        id: "age",
        label: "Votre âge ?",
        placeholder: "Indiquez votre âge",
        type: "input",
        inputType: "number",
    },
    {
        id: "skiDays",
        label: "Combien de jours de ski par saison ?",
        placeholder: "Indiquez le nombre de jours de ski par saison",
        type: "select",
        options: [
            {label: "Moins de 5 jours", value: "0-5"},
            {label: "5 à 10 jours", value: "5-10"},
            {label: "10 à 20 jours", value: "10-20"},
            {label: "Plus de 20 jours", value: "20+"},
        ]
    },
    {
        id: "budget",
        label: "Quel est votre budget pour les skis ?",
        placeholder: "Indiquez votre budget pour les skis",
        type: "select",
        options: [
            {label: "Moins de 300€", value: "<300"},
            {label: "300€ à 500€", value: "300-500"},
            {label: "500€ à 800€", value: "500-800"},
            {label: "Plus de 800€", value: ">800"},
        ]
    },
]