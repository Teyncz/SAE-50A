"use client";

import React, {createContext, useState, useContext, ReactNode, useEffect, useCallback} from "react";
import {QuizAnswers, PhysiqueAnswers} from "@/types/quiz";


type QuizContextType = {
    answers: QuizAnswers;
    setAnswer: (id: string, value: string | number) => void;
    resetAnswers: () => void;
};

const STORAGE_KEY = "ski_quiz_data";

const defaultPhysique: PhysiqueAnswers = {
    height: 0,
    weight: 0,
    age: ""
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({children}: { children: ReactNode }) {
    const [answers, setAnswers] = useState<QuizAnswers>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {
                terrain: "", level: "", style: "", physique: defaultPhysique, skiDays: "", budget: ""
            };
        }
        return {terrain: "", level: "", style: "", physique: defaultPhysique, skiDays: "", budget: ""};
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }, [answers]);

    const setAnswer = (id: string, value: string | number) => {
        const physiqueFields = ['height', 'weight', 'age'];

        if (physiqueFields.includes(id)) {
            setAnswers(prev => ({
                ...prev,
                physique: {
                    ...(prev.physique ?? defaultPhysique),
                    [id]: value
                } as PhysiqueAnswers
            }));
        } else {
            setAnswers(prev => ({...prev, [id]: value}));
        }
    };

    const resetAnswers = useCallback(() => {
        const initial: QuizAnswers = {terrain: "", level: "", style: "", physique: defaultPhysique, skiDays: "", budget: ""};
        setAnswers(initial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    }, []);

    return (
        <QuizContext.Provider value={{answers, setAnswer, resetAnswers}}>
            {children}
        </QuizContext.Provider>
    );
}

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) throw new Error("useQuiz must be used within a QuizProvider");
    return context;
};