"use client";

import React, {useState, useRef, useEffect} from "react";
import {QuizStep, Field, QuizRaw} from "@/types/quiz";
import {Check, ChevronDown} from "lucide-react";
import {Why} from "@/components/quiz/Why";

interface Props {
    data: QuizStep | Field | QuizRaw;
    onChange?: (value: string | number) => void;
}

export const Select: React.FC<Props> = ({data, onChange}) => {
    const [selectedValue, setSelectedValue] = useState<string | number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        function handleMouseDown(e: MouseEvent) {
            const target = e.target;
            if (containerRef.current && target instanceof Node && !containerRef.current.contains(target)) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') setIsOpen(false);
        }

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (!data) return null;
    const options = data.options ?? [];

    return (
        <div className={"relative"} ref={containerRef}>

            <button
                className={`flex cursor-pointer text-[15px] text-[#737373] items-center min-w-[400px] justify-between px-3 py-2 border-1 rounded-[8px] border-[#E5E5E5] ${options.some(opt => opt.value === selectedValue) ? "text-black-primary" : ""}`}
                onClick={() => setIsOpen(!isOpen)}>
                {selectedValue !== null ? options.find(opt => opt.value === selectedValue)?.label : data.placeholder}
                <ChevronDown width={20} stroke={"#737373"}/>
            </button>

            { data.why && <Why text={data.why}/>}

            <div className={`absolute bg-white border-1 rounded-[8px] border-[#E5E5E5] px-2 py-2 w-full top-0 z-50 ${!isOpen ? "hidden" : ""}`}>
                <ul>
                    {options.map((opt) => (
                        <li key={opt.value}>
                            <button
                                type="button"
                                className={"hover:bg-gray-light w-full text-left rounded-[4px] cursor-pointer px-1 py-2 flex items-center justify-between overflow-hidden"}
                                aria-pressed={selectedValue === opt.value}
                                onClick={() => {
                                    setSelectedValue(opt.value);
                                    setIsOpen(false);
                                    if (onChange) {
                                        onChange(opt.value);
                                    }
                                }}
                            >
                                <p className={"pointer-events-none text-ellipsis truncate pr-3 text-[15px]"}>{opt.label}</p>
                                <div className={"pointer-events-none relative flex items-center min-w-[fit-content]"}>
                                    {selectedValue === opt.value && (
                                        <Check height={20}/>
                                    )}
                                </div>
                            </button>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </div>

    );
};
