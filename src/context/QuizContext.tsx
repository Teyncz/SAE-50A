"use client";

import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";
import {QuizAnswers} from "@/types/quiz";


type QuizContextType = {
    answers: QuizAnswers;
    setAnswer: (id: string, value: any) => void;
};

const STORAGE_KEY = "ski_quiz_data";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({children}: { children: ReactNode }) {
    const [answers, setAnswers] = useState<QuizAnswers>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {
                terrain: "", level: "", style: "", physique: undefined, skiDays: "", budget: 0
            };
        }
        return {terrain: "", level: "", style: "", physique: undefined, skiDays: "", budget: 0};
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }, [answers]);

    const setAnswer = (id: string, value: any) => {
        setAnswers(prev => ({...prev, [id]: value}));
    };

    return (
        <QuizContext.Provider value={{answers, setAnswer}}>
            {children}
        </QuizContext.Provider>
    );
}

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) throw new Error("useQuiz must be used within a QuizProvider");
    return context;
};