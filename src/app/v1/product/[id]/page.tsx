"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import type {SkiRecommendation} from "@/types/quiz";
import {Footer} from "@/components/Footer";

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;

    const [ski, setSki] = useState<SkiRecommendation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        axios.get<SkiRecommendation>(`/api/skis/${id}`)
            .then((response) => {
                setSki(response.data);
                if (response.data.images && response.data.images.length > 0) {
                    setSelectedImage(response.data.images[0].fileName);
                } else if (response.data.tumbnailUrl) {
                    setSelectedImage(response.data.tumbnailUrl);
                }
            })
            .catch((err) => {
                setError("Impossible de charger le produit");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Chargement...</p>
            </div>
        );
    }

    if (error || !ski) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error || "Produit non trouvé"}</p>
            </div>
        );
    }

    const price = ski.retailPrice ? `${Number(ski.retailPrice).toFixed(2)}€` : "Prix non disponible";

    return (
        <div className={""}>
            <div className="min-h-screen">
                <div className="h-[10vh] flex items-center justify-center">
                    <Link href="/" className={"hover:scale-97 transition-all duration-200"}>
                        <h1 className="font-kamerik text-[32px] font-[600]">Ski Picker</h1>
                    </Link>
                </div>

                <div className="max-w-[1200px] mx-auto px-[5vw] py-10">
                    <Link href="/v2/results" className="text-black-primary underline mb-6 inline-block">
                        Retour aux résultats
                    </Link>

                    <div className="flex flex-col md:flex-row gap-10 mt-6">

                        <div className="flex flex-col gap-4">
                            <div
                                className="flex-shrink-0 bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[400px]">
                                {selectedImage ? (
                                    <Image
                                        src={`/images/products/${selectedImage}`}
                                        alt={ski.model}
                                        width={200}
                                        height={400}
                                        className="object-contain max-h-[350px]"
                                    />
                                ) : (
                                    <div
                                        className="w-[300px] h-[400px] bg-gray-200 rounded flex items-center justify-center">
                                        <span className="text-gray-400">Pas d&#39;image</span>
                                    </div>
                                )}
                            </div>

                            {ski.images && ski.images.length > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                    {ski.tumbnailUrl && (
                                        <button
                                            onClick={() => setSelectedImage(ski.tumbnailUrl)}
                                            className={`w-16 h-20 cursor-pointer rounded border-2 overflow-hidden flex items-center justify-center bg-gray-50 transition-all ${
                                                selectedImage === ski.tumbnailUrl ? 'border-blue-light' : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                        >
                                            <Image
                                                src={`/images/products/${ski.tumbnailUrl}`}
                                                alt="Thumbnail"
                                                width={50}
                                                height={70}
                                                className="object-contain"
                                            />
                                        </button>
                                    )}
                                    {ski.images.map((image) => (
                                        <button
                                            key={image.id}
                                            onClick={() => setSelectedImage(image.fileName)}
                                            className={`w-16 h-20 cursor-pointer rounded border-2 overflow-hidden flex items-center justify-center bg-gray-50 transition-all ${
                                                selectedImage === image.fileName ? 'border-blue-light' : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                        >
                                            <Image
                                                src={`/images/products/${image.fileName}`}
                                                alt={image.alt}
                                                width={50}
                                                height={70}
                                                className="object-contain"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-gray-500 text-sm uppercase">{ski.brand?.name}</p>
                            <h1 className="text-3xl font-bold text-black-primary">{ski.model}</h1>
                            <p className="text-2xl font-semibold text-blue-light">{price}</p>

                            {ski.categories && ski.categories.length > 0 && (
                                <div className="flex gap-2 flex-wrap mt-2">
                                    {ski.categories.map((cat) => (
                                        <span
                                            key={cat.categoryId}
                                            className="bg-gray-100 px-3 py-1 rounded-full text-sm text-black-primary"
                                        >
                                        {cat.category?.name}
                                    </span>
                                    ))}
                                </div>
                            )}

                            {ski.skiLengths && ski.skiLengths.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium mb-2">Longueurs disponibles</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {ski.skiLengths.map((length) => (
                                            <span
                                                key={length.id}
                                                className="border border-gray-300 px-3 py-1 rounded text-sm"
                                            >
                                            {length.length}cm
                                        </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {ski.description && ski.description.length > 0 && (
                                <div className="mt-6">
                                    <p className="text-sm font-medium mb-2">Description</p>
                                    <p className="text-black-primary">{ski.description}</p>
                                </div>
                            )}

                            {ski.specifications && (
                                <div className="mt-6">
                                    <p className="text-sm font-medium mb-4">Spécifications</p>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between text-sm">
                                                <span>Maniabilité</span>
                                                <span>{ski.specifications.handling}/10</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-light h-2 rounded-full transition-all duration-300"
                                                    style={{width: `${ski.specifications.handling * 10}%`}}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between text-sm">
                                                <span>Stabilité</span>
                                                <span>{ski.specifications.stability}/10</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-light h-2 rounded-full transition-all duration-300"
                                                    style={{width: `${ski.specifications.stability * 10}%`}}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between text-sm">
                                                <span>Pop</span>
                                                <span>{ski.specifications.pop}/10</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-light h-2 rounded-full transition-all duration-300"
                                                    style={{width: `${ski.specifications.pop * 10}%`}}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between text-sm">
                                                <span>Flottaison</span>
                                                <span>{ski.specifications.float}/10</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-light h-2 rounded-full transition-all duration-300"
                                                    style={{width: `${ski.specifications.float * 10}%`}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

