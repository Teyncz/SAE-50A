import {Plus, Minus} from "lucide-react"
import {useEffect, useState} from "react";
import axios from "axios";

type Color = {
    name: string;
    hexaCode: string;
};

export const FilterAside = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [colors, setColors] = useState<Color[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        axios.get<Color[]>('/api/filters/get_options/colors')
            .then(function (response) {
                if (!mounted) return;
                if (Array.isArray(response.data)) {
                    setColors(response.data);
                } else {
                    setColors([]);
                }
            })
            .catch(function (error) {
                console.log(error);
                setColors([]);
            })
            .finally(() => setLoading(false));

        return () => {
            mounted = false
        };
    }, []);

    if (loading) {
        return <div>Loading colors...</div>;
    }

    return (
        <div className={"w-[270px] flex flex-col"}>
            <div className={"px-3 py-2 border-1 rounded-[8px] border-[#E5E5E5] w-full"}>
                <button onClick={() => setIsOpen(!isOpen)}
                        className={"flex items-center justify-between w-full cursor-pointer w-full"}>
                    <p className={"text-black-primary font-[500] p-1"}>Couleurs</p>
                    {!isOpen ? (
                        <Plus stroke={"var(--color-black-primary)"} height={20}/>
                    ) : (
                        <Minus stroke={"var(--color-black-primary)"} height={20}/>
                    )
                    }
                </button>
                <div className={`grid w-full transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <ul className={"flex items-center w-full flex-wrap"}>
                            {colors && colors.map((color) => (
                                <li key={color.name} className="flex items-center h-fit w-[33.33%] p-[4px]">
                                    <button onClick={() => {} } className={"w-full flex flex-col items-start p-[4px] rounded-[7px] cursor-pointer hover:scale-97 transition-all duration-100 group border-1 border-transparent hover:border-black-primary"}>
                                        <span className={`flex w-full h-[17px] rounded-[3px] group-hover:opacity-75 ${color.name.toLowerCase() === "blanc" ? 'border-1 border-black-primary' : ''}`} style={{backgroundColor: color.hexaCode}}></span>
                                        <span className={"text-[12px] text-black-primary font-[300] pt-[2px] pb-[10px]"}>{color.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}