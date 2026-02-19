"use client";

import {QUIZ_QUESTIONS} from "@/data/quizDataRaw";
import {Select} from "@/components/quiz/Select";
import {Input} from "@/components/quiz/Input";
import {QuizRaw} from "@/types/quiz";
import {useState} from "react";
import {useRouter} from "next/navigation";

const initialState = QUIZ_QUESTIONS.reduce((acc, question) => {
    acc[question.id] = "";
    return acc;
}, {} as Record<string, string | number>);

export default function Quiz() {
    const data = QUIZ_QUESTIONS;
    const router = useRouter();

    const [answers, setAnswers] = useState<Record<string, string | number>>(initialState);
    const [resetKey, setResetKey] = useState(0);

    const handleChange = (id: string, value: number | string) => {
        setAnswers(prev => ({...prev, [id]: value}));
    };

    function buildType(data: QuizRaw) {
        const key = `${data.id}-${resetKey}`;
        switch (data.type) {
            case "select":
                return <Select key={key} data={data} onChange={(val) => handleChange(data.id, val)}/>;
            case "input":
                return <Input key={key} data={data} label={false} onChange={(val) => handleChange(data.id, val)}/>;
            default:
                return null;
        }
    }

    const submitForm = () => {
        if (Object.values(answers).some(value => value === "" || value === null)) {
            setAnswers(initialState);
            setResetKey(prev => prev + 1);
            alert("Il manque un champ. Veuillez recommencer.");
            return;
        }

        sessionStorage.setItem("quiz_answers_temp", JSON.stringify(answers));
        router.push("/v1/results");
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
                    data.map((item) => (
                        <div key={item.id} className={"flex flex-col gap-4"}>
                            <p>{item.label}</p>
                            {buildType(item)}
                        </div>
                    ))
                }
            </div>

            <div className={"h-[10vh] flex items-center justify-center"}>
                <button onClick={submitForm}
                        className={"bg-black-primary text-white h-[45px] min-h-[45px] flex-shrink-0 font-inter w-[225px] rounded-full cursor-pointer hover:bg-[#000000cc] hover:scale-98 transition-all duration-300 flex items-center justify-center"}>
                    Envoyer
                </button>
            </div>
        </div>
    )
}