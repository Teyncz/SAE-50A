import {Plus, Minus, RotateCcw} from "lucide-react"
import {useEffect, useState} from "react";
import axios from "axios";
import {FilterFieldCard} from "@/components/FilterFieldCard";
import {useSearchParams, usePathname, useRouter} from 'next/navigation';

type FilterFieldOption = {
    label: string;
    value: string | number;
    hexaCode: string;
};

type FilterOption = {
    label: string;
    value: string | number;
    isDisabled?: boolean;
};

interface FilterAsideProps {
    colors: FilterOption[];
    brands: FilterOption[];
    isV1?: boolean;
    onFilterChange?: (key: string, val: (string | number)[]) => void;
}

export const FilterAside = ({ colors, brands, isV1, onFilterChange }: FilterAsideProps) => {


    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    console.log("colors", colors);


    const handleChange = (key: string, val: (string | number)[]) => {

        if (isV1 && onFilterChange) {
            onFilterChange(key, val);
            return;
        }
        const params = new URLSearchParams(searchParams);

        if (val.length > 0) {
            params.set(key, val.join(','));
        } else {
            params.delete(key);
        }

        replace(`${pathname}?${params.toString()}`, {scroll: false});
    }

    const getSelectedFromUrl = (key: string) => {
        const param = searchParams.get(key);
        if (!param) return [];

        return param.split(',').map(val => {
            const num = Number(val);
            return isNaN(num) ? val : num;
        });
    };


    const hasFilters = searchParams.toString().length > 0;

    const resetFilters = () => {
        replace(pathname, {scroll: false});
    };

    return (
        <div className={"max-w-[270px] w-full flex flex-col gap-3"}>
            {hasFilters && (
                <button onClick={resetFilters}
                        className={"flex items-center justify-center gap-1 border-1 border-[#E5E5E5] h-[50px] rounded-full w-fit px-[20px] group hover:bg-[#E5E5E555] cursor-pointer transition-all duration-200"}>
                    <RotateCcw className={"group-hover:rotate-[-250deg] transition-all duration-400"} height={18}/>
                    <span className={"text-[16px] font-[400]"}>Réinitialiser</span>
                </button>
            )}
            <FilterFieldCard
                label={'Couleurs'}
                type={'color'}
                initialSelected={getSelectedFromUrl('colors')}
                options={colors}
                onChange={(val) => handleChange('colors', val)}
                closeOnSelect={isV1}
            />
            <FilterFieldCard
                label={'Marques'}
                type={'list'}
                initialSelected={getSelectedFromUrl('brands')}
                options={brands}
                onChange={(val) => handleChange('brands', val)}
                closeOnSelect={isV1}
            />
            <FilterFieldCard
                label={'Largeurs au patin'}
                type={'list'}
                initialSelected={getSelectedFromUrl('')}
                options={[
                    {label: "80-90mm", value: "80-90mm", hexaCode: ""},
                    {label: "90-100mm", value: "90-100mm", hexaCode: ""},
                    {label: "100-110mm", value: "100-110mm", hexaCode: ""},
                    {label: "110-120mm", value: "110-120mm", hexaCode: ""},
                    {label: "120mm et +", value: "120mm+", hexaCode: ""},
                ]}
                onChange={(val) => handleChange('waist_width', val)}
                closeOnSelect={isV1}
            />
        </div>
    )
}