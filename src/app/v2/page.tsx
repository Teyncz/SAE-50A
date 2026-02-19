"use client";
import {QUIZ_QUESTIONS} from "@/data/quizData";
import {Card} from "@/components/quiz/Card";
import {useSearchParams, useRouter} from 'next/navigation';
import {useEffect, useState} from "react";
import {Select} from "@/components/quiz/Select";
import {MultipleFields} from "@/components/quiz/MultipleFields";
import {useQuiz} from "@/context/QuizContext";
import {PhysiqueAnswers} from "@/types/quiz";

export default function Quiz() {

    const router = useRouter();
    const params = useSearchParams();
    const stepRaw = params.get('step');
    const {answers, setAnswer, resetAnswers} = useQuiz();
    const [requiredFields, setRequiredField] = useState([] as string[]);
    const [curentStepValue, setCurrentStepValue] = useState<string | number | Record<string, string | number> | null>(null);

    const hasAnswers = Object.entries(answers).some(([key, value]) => {
        if (key === 'physique' && typeof value === 'object' && value !== null) {
            return Object.values(value).some(v => v !== "" && v !== 0 && v !== null);
        }
        return value !== "" && value !== null && typeof value !== 'object';
    });

    const step = stepRaw ? parseInt(stepRaw, 10) : 1;
    let safeStep: number;

    if (isNaN(step) || step < 1 || step > QUIZ_QUESTIONS.length) {
        safeStep = 1;
    } else {
        safeStep = step;
    }

    const data = QUIZ_QUESTIONS[safeStep - 1];
    const progressPercent = (safeStep / QUIZ_QUESTIONS.length) * 100;

    const handleChange = (id: string, value: string | number | Record<string, string | number>) => {
        if (typeof value === 'object') {
            Object.entries(value).forEach(([key, val]) => {
                setAnswer(key, val);
            });
        } else {
            setAnswer(id, value);
        }
    };

    useEffect(() => {
        console.log(answers)
    }, [answers]);

    useEffect(() => {
        queueMicrotask(() => {
            setCurrentStepValue(null);
        });
        const beforeAnswers = QUIZ_QUESTIONS.slice(0, safeStep - 1).map(q => q);

        const currentStepValue = answers[data.id as keyof typeof answers];

        console.log("currentStepValue", currentStepValue);

        if (currentStepValue) {
            queueMicrotask(() => {
                setCurrentStepValue(currentStepValue);
            });
        }

        for (const q of beforeAnswers) {
            const field = q.id;
            const value = answers[field as keyof typeof answers];
            const required = q.required;
            const multipleFields = q.fields;

            if (multipleFields && multipleFields?.length > 0) {
                for (const f in multipleFields) {
                    const req = multipleFields[f].required;
                    const id = multipleFields[f].id;
                    const val = (value as PhysiqueAnswers)[id as keyof PhysiqueAnswers];
                    if (req && (val === "" || val === 0 || val === null || (typeof val === "object" && Object.values(val).some(v => v === "" || v === null)))) {
                        router.push(`?step=${beforeAnswers.indexOf(q) + 1}`);
                        return
                    }
                }
            }

            if (required && (value === "" || value === null || (typeof value === "object" && Object.values(value).some(v => v === "" || v === null)))) {
                router.push(`?step=${beforeAnswers.indexOf(q) + 1}`);
                return;
            }
        }
    }, [safeStep, answers, router, data.id]);

    function buildType(data: typeof QUIZ_QUESTIONS[number]) {
        const key = data.id;
        switch (data.type) {
            case "card":
                const cardValue = curentStepValue !== null && typeof curentStepValue !== 'object' ? curentStepValue : null;
                return <Card key={key} data={data} providedValue={cardValue} onChange={(val) => handleChange(data.id, val)}/>;
            case "select":
                const selectValue = curentStepValue !== null && typeof curentStepValue !== 'object' ? curentStepValue : null;
                return <Select key={key} data={data} providedValue={selectValue} onChange={(val) => handleChange(data.id, val)}/>;
            case "multipleFields":
                const multipleFieldsValue = curentStepValue !== null && typeof curentStepValue === 'object' && !Array.isArray(curentStepValue) ? curentStepValue : null;
                return <MultipleFields key={key} data={data} providedValues={multipleFieldsValue} onChange={(dict) => handleChange(data.id, dict)}/>;
            default:
                return null;
        }
    }

    const goToNextStep = () => {
        if (safeStep < QUIZ_QUESTIONS.length) {
            const field = data?.id;
            const isRequired = data.required;
            const multipleFields = data.fields;
            const value = answers[field as keyof typeof answers];

            if (multipleFields && multipleFields?.length > 0) {
                const errors = [];

                for (const f in multipleFields) {
                    const req = multipleFields[f].required;
                    const id = multipleFields[f].id;
                    const val = (value as PhysiqueAnswers)[id as keyof PhysiqueAnswers];
                    console.log(val)
                    if (req && (val === "" || val === 0 || val === null || (typeof val === "object" && Object.values(val).some(v => v === "" || v === null)))) {
                        errors.push(multipleFields[f].label);
                    }
                }
                setRequiredField(errors);
                if (errors.length > 0) {
                    return
                }
            }

            if (isRequired && (value === "" || value === null || (typeof value === "object" && Object.values(value).some(v => v === "" || v === null)))) {
                setRequiredField([data?.question])
                return;
            }

            router.push(`?step=${safeStep + 1}`);
            setRequiredField([]);
        } else {
            router.push('/v2/results');
            setRequiredField([]);
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
                <div className={"bg-black-primary h-full transition-all duration-800"} style={{
                    width: `${progressPercent}%`,
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}></div>
            </div>
            <div className={"px-[10vw] w-full mx-auto flex flex-col gap-[7vh] items-start"}>
                <div className={"flex flex-col"}>
                    <div className={""}>
                        <p className={"font-[400] text-[20px] text-black-primary first-letter:uppercase"}>étape {safeStep} sur {QUIZ_QUESTIONS.length}</p>
                    </div>
                    <h2 className={"font-kamerik text-[40px] font-[400] text-black-primary"}>{data.question} {data.required && ('*')}</h2>
                </div>
                {buildType(data)}
                <div className={"flex flex-col gap-4"}>
                    {requiredFields.length > 0 && (
                        <p className="text-red-400 font-[400] text-[15px] bg-[#FF000044] px-3 py-2 rounded-md">
                            {requiredFields.length === 1 ? (
                                <>
                                    Veuillez répondre à la question : <span
                                    className="font-medium text-red-450">{requiredFields[0]}</span>
                                </>
                            ) : (
                                <>
                                    Veuillez répondre aux questions suivantes : <span
                                    className="font-medium text-red-450">{requiredFields.join(', ')}</span>
                                </>
                            )}
                        </p>
                    )}
                    <div className={"flex gap-3 items-center"}>
                        <button onClick={() => goToNextStep()}
                                className={"bg-black-primary text-white h-[45px] font-inter w-[225px] rounded-full cursor-pointer hover:bg-[#000000cc] hover:scale-98 transition-all duration-300 flex items-center justify-center"}>
                            Continuer
                        </button>
                        {hasAnswers && (
                            <button onClick={() => {
                                resetAnswers();
                                router.push('?step=1');
                            }}
                                    className={"text-[#737373] h-[45px] font-inter px-4 rounded-full cursor-pointer hover:text-black-primary hover:scale-98 transition-all duration-300 flex items-center justify-center border border-[#E5E5E5] hover:border-[#737373]"}>
                                Réinitialiser
                            </button>
                        )}
                    </div>
                    <p className={"text-[14px]"}>* Indique les questions obligatoires</p>
                </div>
            </div>
        </div>
    )
}