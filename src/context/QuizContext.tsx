"use client";

import React, {createContext, useState, useContext, ReactNode} from "react";
import {QuizAnswers} from "@/types/quiz";


type QuizContextType = {
    answers: QuizAnswers;
    setAnswer: (id: string, value: any) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({children}: { children: ReactNode }) {
    const [answers, setAnswers] = useState<QuizAnswers>({
        terrain: "", level: "", style: "", physique: undefined, skiDays: "", budget: 0
    });

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