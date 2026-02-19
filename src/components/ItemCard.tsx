"use client";

import Image from "next/image";
import {usePathname} from "next/navigation";
import type {SkiRecommendation} from "@/types/quiz";

export const ItemCard = ({ski, isFirst = false}: { ski: SkiRecommendation | undefined, isFirst?: boolean }) => {

    const pathname = usePathname();
    const isV2 = pathname.includes('/v2');

    if (!ski) {
        return (
            <div className={`bg-gray-100 w-[186px] flex flex-col overflow-hidden rounded-[10px] border-1 border-gray-border`}>
                <div className="w-full h-[230px] bg-gray-200 animate-pulse"></div>
                <div className={"p-[10px] flex flex-col gap-2"}>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                </div>
            </div>
        );
    }

    const price = ski.retailPrice ? `${Number(ski.retailPrice).toFixed(2)}€` : "Prix non disponible";
    return (
        <a href={`${isV2 ? '/v2' : '/v1'}/product/${ski.id}`}
           className={`${isFirst ? 'border-blue-light scale-105' : 'border-gray-border'} bg-white w-[186px] flex flex-col overflow-hidden rounded-[10px] border-1  hover:border-black-primary transition-colors duration-200`}>
            <div className="w-full h-[230px]">
                <Image
                    src={`/images/products/${ski.tumbnailUrl}`}
                    alt={`${ski.brand.name} ${ski.model}`}
                    width={186}
                    height={230}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className={"p-[10px]"}>
                <p className={"text-gray-dark font-[500] text-[16px]"}>{ski.model}</p>
                <p className={"text-blue-light font-[300] text-[15px]"}>{ski.brand.name}</p>
                <p className={"text-black-primary font-[400] text-[17px]"}>{price}</p>
            </div>
        </a>
    )
}