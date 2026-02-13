'use client';

import {useQuiz} from "@/context/QuizContext";
import type {SkiRecommendation} from "@/types/quiz";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Page() {

    const { answers } = useQuiz();
    const [skis, setSkis] = useState<SkiRecommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        axios.post<SkiRecommendation[]>("/api/recommend", { answers })
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

    return (
        <div className={"flex flex-col gap-[20px]"}>
            <h1 className={"font-kamerik text-[32px] font-[600]"}>Résultats</h1>
            {!loading && error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}
            <p className={"text-[18px] text-black-primary font-[400]"}>Merci d'avoir répondu à notre quiz ! Nous sommes en train de calculer les meilleurs skis pour vous en fonction de vos réponses. Nous vous enverrons les résultats par email dès que possible.</p>

        </div>
    )
}