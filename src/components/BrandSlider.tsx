"use client";
import React, {useEffect, useState} from "react";
import Image from 'next/image';
import axios from 'axios';

export default function BrandSlider() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        axios.get('/api/brands')
            .then(function (response) {
                if (!mounted) return;
                if (Array.isArray(response.data)) {
                    setImages(response.data.map((f: string) => `/images/brands/${f}`));
                } else {
                    setImages([]);
                }
            })
            .catch(function (error) {
                console.log(error);
                setImages([]);
            })
            .finally(() => setLoading(false));

        return () => {
            mounted = false
        };
    }, []);

    if (loading) return <div>Loading brands...</div>;
    if (images.length === 0) return <div>...</div>;

    return (
        <div className="brand-slider">
            <div className="brand-track">
                {images.map((src, idx) => (
                    <div className="brand-item" key={idx}>
                        <Image src={src} alt="logo" height={40} width={160} priority={true} loading="eager"
                               className="object-contain"/>
                    </div>
                ))}
            </div>
            <div className="brand-track" aria-hidden="true">
                {images.map((src, idx) => (
                    <div className="brand-item" key={`copy-${idx}`}>
                        <Image src={src} alt="logo" height={40} width={160} priority={true} loading="eager"
                               className="object-contain"/>
                    </div>
                ))}
            </div>
        </div>
    );
}
