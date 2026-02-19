"use client";

import React, {useEffect, useState} from "react";
import {QuizStep, Field, QuizRaw} from "@/types/quiz";

interface Props {
    data: QuizStep | Field | QuizRaw;
    onChange?: (value: string | number) => void;
    label?: boolean;
    providedValue?: string | number | null;
}

export const Input: React.FC<Props> = ({data, onChange, label = true, providedValue}) => {
    const [value, setValue] = useState<string | number | null>(providedValue ?? null);

    useEffect(() => {
        queueMicrotask(() => {
            setValue(providedValue ?? null);
        });
    }, [providedValue]);

    return (
        <div key={data.id} className={"relative flex flex-col gap-[5px]"}>
            {label && (
                <label className={"text-black-primary text-[15px] font-[500]"}>{data.label} {data.required && ('*')}</label>
            )}
            <input
                type={data.inputType || "text"}
                placeholder={data.placeholder}
                value={value !== 0 && value ? value : ""}
                className={`flex cursor-pointer text-[15px] text-[#737373] items-center min-w-[400px] justify-between px-3 py-2 border-1 rounded-[8px] border-[#E5E5E5] ${value ? "text-black-primary" : ""}`}
                onChange={(e) => {
                    setValue(e.target.value);
                    if (onChange) {
                        onChange(e.target.value);
                    }
                }}>
            </input>
            <p className={"text-[#737373] font-[300]"}>{data.helpText}</p>
        </div>

    );
};
