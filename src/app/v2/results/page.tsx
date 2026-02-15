'use client';

import {useQuiz} from "@/context/QuizContext";
import type {SkiRecommendation} from "@/types/quiz";
import {useEffect, useState} from "react";
import axios from "axios";
import {ItemCard} from "@/components/ItemCard";
import {PodiumCards} from "@/components/PodiumCards";
import {FilterAside} from "@/components/FilterAside";

export default function Page() {

    const {answers} = useQuiz();
    const [skis, setSkis] = useState<SkiRecommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        axios.post<SkiRecommendation[]>("/api/recommend", {answers})
            .then((response) => {
                if (!mounted) return;
                if (Array.isArray(response.data)) {
                    setSkis(response.data);
                } else {
                    setSkis([]);
                }
                setError(null);
            })
            .catch((err) => {
                console.log(err);
                setSkis([]);
                setError("Impossible de récupérer les recommandations");
            })
            .finally(() => setLoading(false));

        return () => {
            mounted = false
        };
    }, []);

    const top3Skis = skis.slice(0, 3);

    return (
        <div className={""}>
            <div className={"h-[10vh] flex items-center justify-center"}>
                <a href={"/"} className={"hover:scale-97 transition-all duration-200"}>
                    <h1 className={"font-kamerik text-[32px] font-[600]"}>Ski Picker</h1>
                </a>
            </div>
            <PodiumCards skis={top3Skis}/>
            <div className={"flex gap-[30px] px-[10vw] mx-auto mt-[7vh]"}>
                <FilterAside/>
                <div className={"flex flex-col items-start"}>
                    <h1 className={"font-kamerik text-[20px] font-[400]"}><span className={"text-blue-light"}>{skis.length}</span> modèle{skis.length > 1 && 's'} fait{skis.length > 1 && 's'} pour vous</h1>
                    {loading ? (
                        <p className="text-gray-500 text-sm">Calcul en cours...</p>
                    ) : skis.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                            {skis.map((ski) => (
                                <ItemCard key={ski.id} ski={ski}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">Aucun ski ne correspond à vos critères.</p>
                    )}
                </div>
            </div>
        </div>
    )
}