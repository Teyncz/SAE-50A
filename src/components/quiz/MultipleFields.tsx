"use client";

import React, {useState, useRef, useEffect} from "react";
import {QuizStep, Field, DynamicAnswers} from "@/types/quiz";
import {Select} from "@/components/quiz/Select";
import {Input} from "@/components/quiz/Input";

interface Props {
    data: QuizStep;
    onChange?: (value: DynamicAnswers) => void;
    providedValues?: Record<string, string | number> | null;
}

export const MultipleFields: React.FC<Props> = ({data, onChange, providedValues}) => {
        const containerRef = useRef<HTMLDivElement | null>(null);

        const [answers, setAnswers] = useState<DynamicAnswers>(() => {
            const initial: DynamicAnswers = {};
            data.fields?.forEach(field => {
                // Utiliser providedValues si disponible, sinon valeur par défaut
                if (providedValues && providedValues[field.id] !== undefined) {
                    initial[field.id] = providedValues[field.id];
                } else {
                    initial[field.id] = field.inputType === "number" ? 0 : "";
                }
            });
            return initial;
        });

        useEffect(() => {
            if (providedValues) {
                queueMicrotask(() => {
                    setAnswers(prev => ({
                        ...prev,
                        ...providedValues
                    }));
                });
            }
        }, [providedValues]);

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
                    const providedValue = providedValues && providedValues[field.id] ? providedValues[field.id] : null;
                    return <Select key={field.id ?? `field-${field.id}`} data={field} providedValue={providedValue}
                                   onChange={(val) => handleChange(field.id, val)}/>;
                case "input":
                    const inputProvidedValue = providedValues ? providedValues[field.id] : null;
                    return <Input key={field.id ?? `field-${field.id}`} data={field} providedValue={inputProvidedValue}
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
