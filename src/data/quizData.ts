import type {QuizStep} from "@/types/quiz";

export const QUIZ_QUESTIONS: QuizStep[] = [
    {
        id: "terrain",
        required: true,
        index: 1,
        question: "Quel est votre terrain principale ?",
        type: "card",
        options: [
            {label: "Piste", value: "slope", img: "slope.jpg"},
            {label: "Park", value: "park", img: "park.jpg"},
            {label: "Poudreuse", value: "powder", img: "powder.jpg"},
        ],
        why: "Votre terrain de ski principal nous aide à recommander des skis qui sont optimisés pour les conditions et les styles de ski que vous préférez, assurant ainsi une meilleure performance et plaisir sur les pistes."
    },
    {
        id: "level",
        index: 2,
        required: true,
        question: "Comment évaluez-vous votre niveau ?",
        type: "select",
        placeholder: "Sélectionnez votre niveau",
        options: [
            {label: "Débutant", value: 1},
            {label: "Débrouillé avec faible condition physique", value: 2},
            {label: "Débrouillé avec bonne condition", value: 3},
            {label: "Bon skieur style souple", value: 5},
            {label: "Passe partout de façon aisée", value: 6},
            {label: "Bon skieur, ski d'attaque sur tout terrain", value: 8},
            {label: "Expert, sur terrains engagés", value: 10},
        ],
        why: "Votre niveau de ski nous aide à recommander des skis adaptés à votre expérience et à vos compétences, assurant ainsi une meilleure performance et plaisir sur les pistes."
    }, {
        id: "style",
        index: 3,
        question: "Quel est style recherchez-vous ?",
        type: "card",
        options: [
            {label: "Vitesse et stabilité", value: 1, img: "speed_stability.jpg"},
            {label: "Pop & Freestyle", value: 2, img: "pop_freestyle.jpg"},
            {label: "Vif & Rayon court", value: 3, img: "short-radius.jpg"},
        ],
        why: "Votre style de ski préféré nous aide à recommander des skis qui correspondent à vos préférences en matière de performance et de sensations sur les pistes."
    },
    {
        id: "physique",
        index: 3,
        question: "Votre gabarit ?",
        type: "multipleFields",
        fields: [
            {
                type: "input",
                id : "height",
                label: "Votre taille",
                inputType: "number",
                placeholder: "175cm",
                helpText: "Indiquez votre taille en cm",
                required: true,
                why: "La taille est un facteur clé pour déterminer la longueur du ski qui vous conviendrait le mieux, en fonction de votre niveau et de votre style de ski."
            },
            {
                type: "input",
                id: "weight",
                label: "Votre poids",
                inputType: "number",
                placeholder: "70kg",
                helpText: "Indiquez votre poids en kg",
                required: true,
                why: "La taille et le poids sont des facteurs importants pour déterminer la flexibilité et la longueur du ski qui vous conviendraient le mieux."
            },
            {
                type: "select",
                id: "age",
                label: "Votre âge",
                required: false,
                placeholder: "Sélectionnez votre tranche d'âge",
                options: [
                    {label: "Moins de 25 ans", value: "<25"},
                    {label: "25 à 50 ans", value: "25-50"},
                    {label: "Plus de 50 ans", value: ">50"},
                ],
                why: "L'âge peut influencer la flexibilité et les préférences de ski, nous permettant de mieux adapter nos recommandations à votre profil."
            }
        ]
    },{
        id: "skiDays",
        index: 4,
        question: "Combien de jours skiez-vous par an ?",
        type: "select",
        placeholder: "Sélectionnez le nombre de jours",
        options: [
            {label: "Moins de 5 jours", value: "<5"},
            {label: "5 à 15 jours", value: "5-15"},
            {label: "15 à 30 jours", value: "15-30"},
            {label: "Plus de 30 jours", value: ">30"},
        ],
        why: "Le nombre de jours de ski par an peut influencer la durabilité et les caractéristiques du ski qui vous conviendraient le mieux, en fonction de votre fréquence de pratique."
    },{
        id: "budget",
        index: 5,
        question: "Quel est votre budget pour votre prochain ski ?",
        type: "select",
        placeholder: "Sélectionnez votre budget",
        options: [
            {label: "Moins de 300€", value: "<300"},
            {label: "300€ à 500€", value: "300-500"},
            {label: "500€ à 800€", value: "500-800"},
            {label: "Plus de 800€", value: ">800"},
        ],
        why: "Votre budget nous aide à recommander des skis qui correspondent à vos attentes en termes de performance et de qualité, tout en respectant vos contraintes financières."
    }

];