"use client";

import React, {useState, useEffect} from "react";
import type {QuizStep} from "@/types/quiz";
import {Why} from "@/components/quiz/Why";

interface Props {
    data: QuizStep;
    onChange?: (value: string | number) => void;
    providedValue?: string | number | null;
}

export const Card: React.FC<Props> = ({data, onChange, providedValue}) => {
    const [selectedValue, setSelectedValue] = useState<string | null | number>(providedValue ?? null);

    useEffect(() => {
        queueMicrotask(() => {
            setSelectedValue(providedValue ?? null);
        });
    }, [providedValue]);

    if (!data) return null;
    const options = data.options ?? [];

    return (
        <div className={"flex flex-col"}>
            <div className="flex gap-[40px]">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        type="button"
                        aria-pressed={selectedValue === opt.value}
                        onClick={() => {
                            setSelectedValue(opt.value);
                            if (onChange) {
                                onChange(opt.value);
                            }
                        }}
                        className={`flex flex-col w-[200px] overflow-hidden rounded-[10px] border-1 cursor-pointer hover:scale-99 group hover:border-black-brown transition-all duration-300 ${
                            selectedValue === opt.value ? "border-black-brown" : "border-gray-primary"
                        }`}
                    >
                        {opt.img ? (
                            <div className="h-[115px] w-full overflow-hidden">
                                <div
                                    className="h-full w-full bg-center bg-cover transition-transform duration-300 ease-out transform group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(/images/quiz/${opt.img})`,
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="w-[40px] h-[40px] mb-2"/>
                        )}
                        <span
                            className="text-left w-full text-[16px] font-kamerik px-[22px] py-[18px]">{opt.label}</span>
                    </button>
                ))}
            </div>
            {data.why && <Why text={data.why}/>}
        </div>
    );
};
