"use client";
import {CldImage} from 'next-cloudinary';
import {useState} from "react";


export default function Home() {

    const [isV1, setIsV1] = useState<boolean>(true);

    return (
        <div className={"h-[calc(100vh-100px)] m-[50px] relative rounded-[30px] flex flex-col items-center"} style={{
            backgroundImage: `url('/images/hero_bg.png')`,
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            backgroundPositionY: 'top'
        }}>
            <div className={"bg-black-brown w-[380px] h-[50px] rounded-full p-[5px] flex items-center switch-toggle"}>
                <button onClick={() => setIsV1(true)}
                        className={`flex  hover:bg-[#FFFFFF33] cursor-pointer flex-1/2 rounded-full items-center justify-center h-full font-[500] z-50 ${isV1 ? "text-black-brown " : "text-white"}`}>
                    V1
                </button>
                <button onClick={() => setIsV1(false)}
                        className={`flex hover:bg-[#FFFFFF33] cursor-pointer flex-1/2 rounded-full items-center justify-center h-full font-[500] z-50 ${!isV1 ? "text-black-brown " : "text-white"}`}>
                    V2
                </button>
            </div>
        </div>
    );
}