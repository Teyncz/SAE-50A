import Image from "next/image";
import type {SkiRecommendation} from "@/types/quiz";
import {ItemCard} from "@/components/ItemCard";

export const PodiumCards = ({skis}: { skis: SkiRecommendation[] }) => {

    console.log(skis)


    return (
        <div className={"mx-auto flex flex-col bg-[#F9F9F9] items-center text-black-primary text-[24px] py-[40px]"}>
            <h3 className={"font-kamerik"}>Notre top 3</h3>
            <div className={"flex w-fit gap-[30px] "}>
                <ItemCard ski={skis[1]}/>
                <ItemCard ski={skis[0]} isFirst={true}/>
                <ItemCard ski={skis[2]}/>
            </div>
        </div>
    )
}