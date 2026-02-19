'use client';

import React, {useEffect, useMemo, useState} from "react";
import type {SkiRecommendation} from "@/types/quiz";
import {useSearchParams, useRouter} from 'next/navigation';
import {PodiumCards} from "@/components/PodiumCards";
import {FilterAside} from "@/components/FilterAside";
import {SortSelect} from "@/components/SortSelect";
import {ItemCard} from "@/components/ItemCard";
import {useQuiz} from "@/context/QuizContext";
import {QUIZ_QUESTIONS} from "@/data/quizData";
import axios from "axios";
import {Footer} from "@/components/Footer";

type FilterFieldOption = {
    label: string;
    value: string | number;
    hexaCode: string;
};

export default function Page() {

    const router = useRouter();
    const {answers} = useQuiz();
    const [skis, setSkis] = useState<SkiRecommendation[]>([]);
    const [filteredSkis, setFilteredSkis] = useState<SkiRecommendation[]>([]);
    const [loading, setLoading] = useState(true);

    const missingRequiredFields = useMemo(() => {
        const missing: string[] = [];

        QUIZ_QUESTIONS.forEach(question => {
            if (question.required) {
                const value = answers[question.id as keyof typeof answers];
                if (value === "" || value === null || value === undefined) {
                    missing.push(question.question || question.id);
                }
            }

            if (question.type === "multipleFields" && question.fields) {
                question.fields.forEach(field => {
                    if (field.required) {
                        const physique = answers.physique;
                        const fieldValue = physique?.[field.id as keyof typeof physique];
                        if (fieldValue === "" || fieldValue === null || fieldValue === 0) {
                            missing.push(field.label || field.id);
                        }
                    }
                });
            }
        });

        return missing;
    }, [answers]);

    const hasIncompleteQuiz = missingRequiredFields.length > 0;

    const searchParams = useSearchParams();
    const colorsRaw = searchParams.get('colors');
    const brandsRaw = searchParams.get('brands');
    const [colors, setColors] = useState<FilterFieldOption[]>([]);
    const [brands, setBrands] = useState<FilterFieldOption[]>([]);

    useEffect(() => {
        axios.post<SkiRecommendation[]>("/api/recommend", {answers})
            .then((res) => {
                setSkis(Array.isArray(res.data) ? res.data : []);
            });
    }, [answers]);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const [colorsRes, brandsRes] = await Promise.all([
                    axios.get<FilterFieldOption[]>('/api/filters/get_options/colors'),
                    axios.get<FilterFieldOption[]>('/api/filters/get_options/brands')
                ]);

                if (!mounted) return;

                setColors(Array.isArray(colorsRes.data) ? colorsRes.data : []);
                setBrands(Array.isArray(brandsRes.data) ? brandsRes.data : []);

            } catch (error) {
                console.error("Erreur de chargement des filtres :", error);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        const colors = colorsRaw ? colorsRaw.split(',').map(Number) : [];
        const brands = brandsRaw ? brandsRaw.split(',').map(Number) : [];

        axios.post<SkiRecommendation[]>("/api/recommend", {
            answers,
            colors,
            brands
        })
            .then((response) => {
                if (!mounted) return;
                setFilteredSkis(Array.isArray(response.data) ? response.data : []);
            })
            .catch(() => {
                if (mounted) setSkis([]);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };

    }, [answers, colorsRaw, brandsRaw]);

    const handleSortChange = (optionValue: string) => {
        const sortedSkis = [...filteredSkis];
        switch (optionValue) {
            case "price-asc":
                sortedSkis.sort((a, b) => (a.retailPrice || 0) - (b.retailPrice || 0));
                break;
            case "price-desc":
                sortedSkis.sort((a, b) => (b.retailPrice || 0) - (a.retailPrice || 0));
                break;
            case "compatibility-asc":
                sortedSkis.sort((a, b) => a.finalScore - b.finalScore);
                break;
            case "compatibility-desc":
                sortedSkis.sort((a, b) => b.finalScore - a.finalScore);
                break;
        }
        setFilteredSkis(sortedSkis);
    }

    const sortOptions = [
        {label: "Prix (bas-haut)", value: "price-asc"},
        {label: "Prix (haut-bas)", value: "price-desc"},
        {label: "Note de compatibilité (bas-haut)", value: "compatibility-asc"},
        {label: "Note de compatibilité (haut-bas)", value: "compatibility-desc"},
    ];

    const availableBrandIds = new Set(skis.map(ski => ski.brandId));
    const filteredBrandOptions = brands.filter(brand =>
        availableBrandIds.has(brand.value as number)
    );

    const availableColorIds = new Set(skis.flatMap(ski =>
        ski.colors ? ski.colors.map(c => c.color.id) : []
    ));

    const filteredColorOptions = colors.filter(color =>
        availableColorIds.has(color.value as number)
    );

    const top3Skis = filteredSkis.slice(0, 3);

    if (hasIncompleteQuiz) {
        return (
            <div className={"min-h-screen flex flex-col"}>
                <div className={"h-[10vh] flex items-center justify-center"}>
                    <a href={"/"} className={"hover:scale-97 transition-all duration-200"}>
                        <h1 className={"font-kamerik text-[32px] font-[600]"}>Ski Picker</h1>
                    </a>
                </div>
                <div className={"flex-1 flex items-center justify-center"}>
                    <div className={"flex flex-col items-center gap-6 max-w-[500px] text-center"}>
                        <div className={"bg-gray-light border border-gray-border rounded-lg p-6"}>
                            <h1 className={"font-kamerik text-[40px] font-[400] text-black-primary"}>Formulaire
                                incomplet</h1>
                            <p className={"text-black-primary mb-4"}>
                                Pour vous recommander les meilleurs skis, veuillez compléter les champs suivants :
                            </p>
                            <ul className={"text-[#] text-left list-disc list-inside mb-4"}>
                                {missingRequiredFields.map((field, index) => (
                                    <li key={index}>{field}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => router.push('/v2?step=1')}
                            className={"bg-black-primary text-white h-[45px] font-inter px-8 rounded-full cursor-pointer hover:bg-[#000000cc] hover:scale-98 transition-all duration-300 flex items-center justify-center"}
                        >
                            Compléter le questionnaire
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <main className={""}>
                <div className={"h-[10vh] flex items-center justify-center"}>
                    <a href={"/"} className={"hover:scale-97 transition-all duration-200"}>
                        <h1 className={"font-kamerik text-[32px] font-[600]"}>Ski Picker</h1>
                    </a>
                </div>
                <PodiumCards skis={top3Skis}/>
                <div className={"flex gap-[30px] px-[10vw] mx-auto mt-[7vh]"}>
                    <FilterAside colors={filteredColorOptions} brands={filteredBrandOptions}/>
                    <div className={"flex flex-col items-start w-full gap-3"}>
                        <div className={"flex w-full items-center gap-4 h-[50px]"}>
                            <h1 className={"font-kamerik text-[20px] font-[400]"}><span
                                className={"text-blue-light"}>{filteredSkis.length}</span> modèle{filteredSkis.length > 1 && 's'} fait{filteredSkis.length > 1 && 's'} pour
                                vous
                            </h1>
                            <SortSelect onChange={handleSortChange} options={sortOptions}/>
                        </div>
                        {loading ? (
                            <p className="text-gray-500 text-sm">Calcul en cours...</p>
                        ) : filteredSkis.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                                {filteredSkis.map((ski) => (
                                    <ItemCard key={ski.id} ski={ski}/>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">Aucun ski ne correspond à vos critères.</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}