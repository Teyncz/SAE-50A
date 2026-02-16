"use client";
import {QUIZ_QUESTIONS} from "@/data/quizDataRaw";
import {Card} from "@/components/quiz/Card";
import {useSearchParams, useRouter} from 'next/navigation';
import {useEffect} from "react";
import {Select} from "@/components/quiz/Select";
import {MultipleFields} from "@/components/quiz/MultipleFields";
import {useQuiz} from "@/context/QuizContext";

import {QuizRaw} from "@/types/quiz";
import {Input} from "@/components/quiz/Input";

export default function Quiz() {


    const router = useRouter();
    const params = useSearchParams();
    const stepRaw = params.get('step');
    const {answers, setAnswer} = useQuiz();

    const step = stepRaw ? parseInt(stepRaw, 10) : 1;
    let safeStep: number;

    if (isNaN(step) || step < 1 || step > QUIZ_QUESTIONS.length) {
        safeStep = 1;
    } else {
        safeStep = step;
    }

    const data = QUIZ_QUESTIONS;
    const progressPercent = (safeStep / QUIZ_QUESTIONS.length) * 100;

    const handleChange = (id: string, value: any) => {
        setAnswer(id, value);
    };

    useEffect(() => {
        console.log(answers)
    }, [answers]);

    function buildType(data: QuizRaw) {
        const key = data.id;
        switch (data.type) {
            case "select":
                return <Select key={key} data={data} onChange={(val) => handleChange(data.id, val)}/>;
            case "input":
                return <Input key={key} data={data} label={false} onChange={(val) => handleChange(data.id, val)}/>;
            default:
                return null;
        }
    }

    return (
        <div className={"h-screen flex flex-col"}>
            <div className={"h-[10vh] flex items-center justify-center"}>
                <a href={"/"} className={"hover:scale-97 transition-all duration-200"}>
                    <h1 className={"font-kamerik text-[32px] font-[600]"}>Ski Picker</h1>
                </a>
            </div>
            <div
                className={"px-[10vw] w-full mx-auto flex flex-col gap-7 items-center h-[80vh] overflow-y-auto py-10 no-scrollbar"}>
                {
                    data.map((item, index) => (
                        <div key={item.id} className={"flex flex-col gap-4"}>
                            <p>{item.label}</p>
                            {buildType(item)}
                        </div>
                    ))
                }
            </div>

            <div className={"h-[10vh] flex items-center justify-center"}>
                <button
                    className={"bg-black-primary text-white h-[45px] min-h-[45px] flex-shrink-0 font-inter w-[225px] rounded-full cursor-pointer hover:bg-[#000000cc] hover:scale-98 transition-all duration-300 flex items-center justify-center"}>
                    Envoyer
                </button>
            </div>
        </div>
    )
}