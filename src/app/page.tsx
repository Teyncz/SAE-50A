"use client";
import {useEffect, useState} from "react";
import BrandSlider from "../components/BrandSlider";


export default function Home() {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

    const [isV1, setIsV1] = useState<boolean | null>(() => {
        try {
            if (typeof window === 'undefined') return null;
            const savedVersion = localStorage.getItem("app_version");
            return savedVersion !== null ? savedVersion === "true" : false;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (isV1 === null) return;
        localStorage.setItem("app_version", isV1.toString());
    }, [isV1]);

    if (isV1 === null) {
        return null;
    }

    const terrains = [
        {id: 0, img: '/images/terrain/slope.jpg', label: 'Piste', x: 'center', y: '33%'},
        {id: 1, img: '/images/terrain/park.jpg', label: 'Park', x: 'center', y: 'top'},
        {id: 2, img: '/images/terrain/freeride.jpg', label: 'Freeride', x: 'center', y: 'top'},
    ];

    return (
        <div>
            <div className={"h-[calc(100vh-100px)] m-[50px] relative rounded-[30px] flex flex-col items-center"}
                 style={{
                     backgroundImage: `url('/images/hero_bg.png')`,
                     backgroundPositionX: 'center',
                     backgroundPositionY: 'top',
                     backgroundSize: 'auto',
                 }}>
                <div
                    className={`bg-black-brown w-[380px] h-[50px] rounded-full p-[5px] flex items-center switch-toggle ${!isV1 && "right"}`}>
                    <button onClick={() => setIsV1(true)}
                            className={`flex cursor-pointer flex-1/2 rounded-full items-center justify-center h-full font-[500] z-50 ${isV1 ? "text-black-brown " : "text-white hover:bg-[#FFFFFF33]"}`}>
                        V1
                    </button>
                    <button onClick={() => setIsV1(false)}
                            className={`flex cursor-pointer flex-1/2 rounded-full items-center justify-center h-full font-[500] z-50 ${!isV1 ? "text-black-brown " : "text-white hover:bg-[#FFFFFF33]"}`}>
                        V2
                    </button>
                </div>
                <div className={"flex flex-col items-center mt-[30vh]"}>
                    <div className={"flex flex-col items-center mb-8 leading-none"}>
                        <h1 className={"text-[128px] font-[700] text-white font-kamerik"}>Ski Picker</h1>
                        <h3 className={"text-blue-light font-[400] text-[40px] font-kamerik"}>Saison 2026</h3>
                    </div>
                    <a href={isV1 ? "/v1" : "/v2"}
                       className={"bg-white hover:bg-[#FFFFFFBB] transition-all duration-300 text-black-brown rounded-full px-[70px] py-[10px] text-[16px] font-[500] cursor-pointer hover:scale-98"}>Trouver
                        mon ski
                    </a>
                </div>
            </div>
            <section className={"flex flex-col items-center mt-[125px]"}>
                <div className={"flex flex-col items-center mb-8"}>
                    <h2 className={"font-kamerik text-[48px] text-black-primary"}>Plus de 15 marques</h2>
                    <p className={"font-kamerik text-gray-clear text-[24px]"}>Le meilleur du ski, réuni</p>
                </div>

                <div className={"w-full mt-8"}>
                    <BrandSlider/>
                </div>

            </section>

            <section className={"flex flex-col items-center mt-[125px]"}>
                <div className={"flex flex-col items-center mb-8"}>
                    <h2 className={"font-kamerik text-[48px] text-black-primary"}>Pour tous les terrains</h2>
                    <p className={"font-kamerik text-gray-clear text-[24px]"}>Le meilleur du ski, réuni</p>
                </div>

                <div className="max-w-[calc(100vw-100px)] flex w-full gap-[30px] h-[275px]">
                    {terrains.map((terrain, idx) => (
                        <div
                            key={terrain.id}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            className={`relative rounded-[25px] transition-all duration-500 ease-in-out cursor-pointer hover:scale-97
                                ${hoveredIndex === idx ? "flex-[2.5]" : "flex-1 brightness-100"} 
                              `}
                            style={{
                                backgroundImage: `url('${terrain.img}')`,
                                backgroundSize: 'cover',
                                backgroundPositionY: terrain.y,
                                backgroundPositionX: terrain.x,
                            }}
                        >
                            <div
                                className={`absolute inset-0 bg-black/20 rounded-[25px] flex items-end p-6 transition-opacity ${hoveredIndex === idx ? "opacity-100" : "opacity-0"}`}>
                                <span className="text-white font-ski text-2xl font-kamerik">{terrain.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </div>
    );
}