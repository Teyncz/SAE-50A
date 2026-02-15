import Image from "next/image";
import type {SkiRecommendation} from "@/types/quiz";

export const ItemCard = ({ski, isFirst = false}: { ski: SkiRecommendation | undefined, isFirst?: boolean }) => {

    if (!ski) return null;

    console.log(ski)

    const price = ski.retailPrice ? `${Number(ski.retailPrice).toFixed(2)}€` : "Prix non disponible";
    return (
        <a href={`/product/${ski.id}`}
           className={`${isFirst ? 'border-blue-light scale-105' : 'border-gray-border'} bg-white my-[30px] w-[186px] flex flex-col overflow-hidden rounded-[10px] border-1  hover:border-black-primary transition-colors duration-200`}>
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