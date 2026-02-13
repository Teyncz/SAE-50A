"use client";

import React, {useState, useRef} from "react";
import {QuizStep, Field, DynamicAnswers} from "@/types/quiz";
import {Select} from "@/components/quiz/Select";
import {Input} from "@/components/quiz/Input";

interface Props {
    data: QuizStep;
    onChange?: (value: DynamicAnswers) => void;
}

export const MultipleFields: React.FC<Props> = ({data, onChange}) => {
        const containerRef = useRef<HTMLDivElement | null>(null);

        const [answers, setAnswers] = useState<DynamicAnswers>(() => {
            const initial: DynamicAnswers = {};
            data.fields?.forEach(field => {
                initial[field.id] = field.inputType === "number" ? 0 : "";
            });
            return initial;
        });

        if (!data) return null;
        const fields = data.fields ?? [];

        const handleChange = (id: string, value: string | number) => {
            const newAnswers = {...answers, [id]: value};
            setAnswers(newAnswers);

            if (onChange) {
                onChange(newAnswers);
            }
        };

        function buildType(field: Field) {
            switch (field.type) {
                case "select":
                    return <Select key={field.id ?? `field-${field.id}`} data={field}
                                   onChange={(val) => handleChange(field.id, val)}/>;
                case "input":
                    return <Input key={field.id ?? `field-${field.id}`} data={field}
                                  onChange={(val) => handleChange(field.id, val)}/>;
                default:
                    return null;
            }
        }

        return (
            <div className={"relative flex flex-col gap-[30px]"} ref={containerRef}>
                {fields.map((field) => (
                    buildType(field)
                ))
                }
            </div>

        );
    }
;
