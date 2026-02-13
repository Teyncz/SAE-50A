"use client";
import {QUIZ_QUESTIONS} from "@/data/quizData";
import {Card} from "@/components/quiz/Card";
import {useSearchParams, useRouter} from 'next/navigation';
import {useEffect} from "react";
import {Select} from "@/components/quiz/Select";
import {MultipleFields} from "@/components/quiz/MultipleFields";
import { useQuiz } from "@/context/QuizContext";

export default function Quiz() {


    const router = useRouter();
    const params = useSearchParams();
    const stepRaw = params.get('step');
    const { answers, setAnswer } = useQuiz();

    const step = stepRaw ? parseInt(stepRaw, 10) : 1;
    let safeStep: number;

    if (isNaN(step) || step < 1 || step > QUIZ_QUESTIONS.length) {
        safeStep = 1;
    } else {
        safeStep = step;
    }

    const data = QUIZ_QUESTIONS[safeStep - 1];
    const progressPercent = (safeStep / QUIZ_QUESTIONS.length) * 100;

    const handleChange = (id: string, value: any) => {
        setAnswer(id, value);
    };

    useEffect(() => {
        console.log(answers)
    }, [answers]);

    function buildType(data: typeof QUIZ_QUESTIONS[number]) {
        const key = data.id;
        switch (data.type) {
            case "card":
                return <Card key={key} data={data} onChange={(val) => handleChange(data.id, val)}/>;
            case "select":
                return <Select key={key} data={data} onChange={(val) => handleChange(data.id, val)}/>;
            case "multipleFields":
                return <MultipleFields key={key} data={data} onChange={(dict) => handleChange(data.id, dict)}/>;
            default:
                return null;
        }
    }

    const goToNextStep = () => {
        if (safeStep < QUIZ_QUESTIONS.length) {
            router.push(`?step=${safeStep + 1}`);
        } else {
            router.push('/v2/results');
        }
    };

    return (
        <div className={"w-screen"}>
            <div className={"h-[10vh] flex items-center justify-center"}>
                <a href={"/"} className={"hover:scale-97 transition-all duration-200"}>
                    <h1 className={"font-kamerik text-[32px] font-[600]"}>Ski Picker</h1>
                </a>
            </div>
            <div className={"w-full bg-[#D9D9D9] h-[5px] mb-[10vh]"}>
                <div className={"bg-black-primary h-full"} style={{width: `${progressPercent}%`}}></div>
            </div>
            <div className={"px-[10vw] w-full mx-auto flex flex-col gap-[7vh] items-start"}>
                <div className={"flex flex-col"}>
                    <div className={""}>
                        <p className={"font-[400] text-[20px] text-black-primary first-letter:uppercase"}>étape {safeStep} sur {QUIZ_QUESTIONS.length}</p>
                    </div>
                    <h2 className={"font-kamerik text-[40px] font-[400] text-black-primary"}>{data.question}</h2>
                </div>
                {buildType(data)}
                <button onClick={() => goToNextStep()}
                        className={"bg-black-primary text-white h-[45px] font-inter w-[225px] rounded-full cursor-pointer hover:bg-[#000000cc] hover:scale-98 transition-all duration-300 flex items-center justify-center"}>
                    Continuer
                </button>
            </div>
        </div>
    )
}