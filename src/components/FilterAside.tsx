import {Plus, Minus} from "lucide-react"
import {useEffect, useState} from "react";
import axios from "axios";
import {FilterFieldCard} from "@/components/FilterFieldCard";

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
            <FilterFieldCard label={'Couleurs'} type={'color'} options={[]}/>

        </div>
    )
}