import type {Prisma} from '@/generated/prisma/client';

export type StepType = 'card' | 'select' | 'input' | 'multipleFields';
export type FieldType = 'input' | 'select';

export type DynamicAnswers = Record<string, string | number>;

export type PhysiqueAnswers = {
    height: number;
    weight: number;
    age: string;
}

export type QuizAnswers = {
    terrain: string;
    level: string;
    style: string;
    physique?: PhysiqueAnswers;
    skiDays: string;
    budget: string;
};

export interface Option {
    label: string;
    value: string | number;
    img?: string;
}

export interface Field {
    label: string;
    type: FieldType;
    inputType?: string;
    id: string;
    placeholder?: string;
    helpText?: string;
    required?: boolean;
    options?: Option[];
    why?: string;
}

export interface QuizRaw {
    id: string;
    label: string;
    type: StepType;
    placeholder?: string;
    inputType?: string;
    options?: Option[];
    why?: string;
    helpText?: string;
}

export interface QuizStep {
    id: string;
    index: number;
    question: string;
    type: StepType;
    inputType?: string;
    options?: Option[];
    placeholder?: string;
    fields?: Field[];
    why?: string;
    helpText?: string;
    label?: string;
}

export type SkiRecommendation = Prisma.$skisPayload['scalars'] & {
    specifications: Prisma.$specificationsPayload['scalars'] | null;
    brand: Prisma.$brandPayload['scalars'];
    skiLengths: Prisma.$SkisLengthsPayload['scalars'][];
    categories: (Prisma.$CategoriesOnSkisPayload['scalars'] & {
        category: Prisma.$categoriesPayload['scalars'];
    })[];
    finalScore: number;
}
