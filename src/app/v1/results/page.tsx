"use client";

import {useRouter} from "next/navigation";
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {PodiumCards} from "@/components/PodiumCards";
import {FilterAside} from "@/components/FilterAside";
import {SortSelect} from "@/components/SortSelect";
import {ItemCard} from "@/components/ItemCard";
import type {SkiRecommendation} from "@/types/quiz";
import axios from "axios";
import {Footer} from "@/components/Footer";

type FilterFieldOption = {
    label: string;
    value: string | number;
    hexaCode: string;
};

export default function Results() {
    const router = useRouter();
    const [answers, setAnswers] = useState<Record<string, string> | null>(null);
    const [skis, setSkis] = useState<SkiRecommendation[]>([]);
    const [colors, setColors] = useState<FilterFieldOption[]>([]);
    const [brands, setBrands] = useState<FilterFieldOption[]>([]);
    const hasLoaded = useRef(false);
    const [filters, setFilters] = useState<Record<string, (string | number)[]>>({
        colors: [],
        brands: [],
        waist_width: []
    });
    const [filteredSkis, setFilteredSkis] = useState<SkiRecommendation[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Gérer le changement de filtre
    const handleFilterChange = (key: string, val: (string | number)[]) => {
        setFilters(prev => ({
            ...prev,
            [key]: val
        }));
    };

    // Filtrer les skis quand les filtres changent
    useEffect(() => {
        let result = [...skis];

        if (filters.colors.length > 0) {
            result = result.filter(ski =>
                ski.colors?.some(color => filters.colors.includes(color.colorId))
            );
        }

        if (filters.brands.length > 0) {
            result = result.filter(ski =>
                filters.brands.includes(ski.brand?.id)
            );
        }

        setFilteredSkis(result);
    }, [skis, filters]);

    useEffect(() => {
        if (loading) return;
        setLoading(true);

        const data = sessionStorage.getItem("quiz_answers_temp");

        if (!data) {
            router.push("/v1");
            return;
        }

        setTimeout(() => setAnswers(JSON.parse(data)), 0);

        const handleBeforeUnload = () => {
            sessionStorage.removeItem("quiz_answers_temp");
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [router]);

    useEffect(() => {
        let mounted = true;

        axios.post<SkiRecommendation[]>("/api/recommend", {
            answers,
        })
            .then((response) => {
                if (!mounted) return;
                setSkis(Array.isArray(response.data) ? response.data : []);
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

    if (!answers) {
        return <div className="h-screen flex items-center justify-center">Chargement...</div>;
    }

    const top3Skis = filteredSkis.slice(0, 3);

    return (
        <div className={""}>
            <div className={""}>
                <div className={"h-[10vh] flex items-center justify-center"}>
                    <a href={"/"} className={"hover:scale-97 transition-all duration-200"}>
                        <h1 className={"font-kamerik text-[32px] font-[600]"}>Ski Picker</h1>
                    </a>
                </div>
                <PodiumCards skis={top3Skis}/>
                <div className={"flex gap-[30px] px-[10vw] mx-auto mt-[7vh]"}>
                    <FilterAside isV1={true} colors={colors} brands={brands} onFilterChange={handleFilterChange}/>
                    <div className={"flex flex-col items-start w-full gap-3"}>
                        <div className={"flex w-full items-center gap-4 h-[50px]"}>
                            <h1 className={"font-kamerik text-[20px] font-[400]"}><span
                                className={"text-blue-light"}>{filteredSkis.length}</span> modèle{filteredSkis.length > 1 && 's'} fait{filteredSkis.length > 1 && 's'} pour
                                vous
                            </h1>
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
            </div>
            <Footer/>
        </div>
    );
}
