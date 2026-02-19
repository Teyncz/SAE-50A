import {useEffect, useState, useMemo} from "react";
import {Check, Minus, Plus} from "lucide-react";

type OptionType = {
    value: string | number;
    label: string;
    hexaCode?: string;
}

type Props = {
    label: string;
    type: 'list' | 'color' | 'grid' | 'price';
    options: OptionType[];
    onChange: (selectedOptions: (string | number)[]) => void;
    initialSelected?: (string | number)[];
    closeOnSelect?: boolean;
}

export const FilterFieldCard = (props: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>(props.initialSelected || []);

    const initialSelectedKey = useMemo(() => JSON.stringify(props.initialSelected || []), [props.initialSelected]);

    useEffect(() => {
        const parsed = JSON.parse(initialSelectedKey) as (string | number)[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedOptions(parsed);
    }, [initialSelectedKey]);


    const handleChange = (clickedValue: string | number) => {
        const next = selectedOptions.includes(clickedValue)
            ? selectedOptions.filter((value) => value !== clickedValue)
            : [...selectedOptions, clickedValue];

        setSelectedOptions(next);
        props.onChange(next);

        if (props.closeOnSelect) {
            setIsOpen(false);
        }
    }


    const colors = () => {
        if (props.type === 'color') {
            return (
                <>
                    {props.options.map((color: OptionType) => (
                        <li key={color.label} className="flex items-center h-fit w-[33.33%] p-[4px]">
                            <button onClick={() => handleChange(color.value)}
                                    className={`w-full flex flex-col items-start p-[4px] rounded-[7px] cursor-pointer hover:scale-97 transition-all duration-100 group border-1 border-transparent hover:border-black-primary ${selectedOptions.includes(color.value) && '!border-black-primary'}`}>
                                <span
                                    className={`flex w-full h-[17px] rounded-[3px] group-hover:opacity-75 ${color.label.toLowerCase() === "blanc" ? 'border-1 border-black-primary' : ''}`}
                                    style={{backgroundColor: color.hexaCode}}></span>
                                <span
                                    className={"text-[12px] text-black-primary font-[300] pt-[2px] pb-[10px]"}>{color.label}</span>
                            </button>
                        </li>
                    ))}
                </>
            )
        }
    }

    const list = () => {
        if (props.type === 'list') {
            return (
                <>
                    {props.options.map((option: OptionType) => (
                        <li key={option.value} className="flex items-center h-fit w-full p-[4px]">
                            <button onClick={() => handleChange(option.value)} className={"w-full flex group cursor-pointer items-center gap-4"}>
                                <span
                                    className={`border-1 border-[#767676] h-[20px] w-[20px] rounded-[4px] flex flex-center items-center group-hover:bg-[#767676] ${selectedOptions.includes(option.value) && 'bg-black-primary border-black-primary hover:border-[#767676]'} transition-all duration-200`}>
                                    <Check height={16} stroke={"#FFFFFF"}/>
                                </span>
                                <span>{option.label}</span>
                            </button>
                        </li>
                    ))}
                </>
            )
        }
    }

    const grid = () => {
        if (props.type === 'grid') {
            return (
                <>
                    {props.options.map((option: OptionType) => (
                        <li key={option.value} className="flex items-center h-fit w-[33.33%] p-[4px]">
                            <button onClick={() => handleChange(option.value)} className={"w-full flex flex-col items-start p-[4px] rounded-[7px] cursor-pointer hover:scale-97 transition-all duration-100 group border-1 border-transparent hover:border-black-primary"}>
                                <span
                                    className={"text-[12px] text-black-primary font-[300] pt-[2px] pb-[10px]"}>{option.label}</span>
                            </button>
                        </li>
                    ))}
                </>
            )
        }
    }

    const price = () => {
        if (props.type === 'price') {
            return (
                <>
                    {props.options.map((option: OptionType) => (
                        <li key={option.value} className="flex items-center h-fit w-full p-[4px]">
                            <button onClick={() => {
                            }}
                                    className={"w-full flex flex-col items-start p-[4px] rounded-[7px] cursor-pointer hover:scale-97 transition-all duration-100 group border-1 border-transparent hover:border-black-primary"}>
                                <span
                                    className={"text-[12px] text-black-primary font-[300] pt-[2px] pb-[10px]"}>{option.label}</span>
                            </button>
                        </li>
                    ))}
                </>
            )
        }
    }

    return (
        <div className={"px-3 py-2 border-1 rounded-[8px] border-[#E5E5E5] w-full"}>
            <button onClick={() => setIsOpen(!isOpen)}
                    className={"flex items-center justify-between w-full cursor-pointer w-full"}>
                <p className={"text-black-primary font-[500] p-1"}>{props.label}</p>
                {!isOpen ? (
                    <Plus stroke={"var(--color-black-primary)"} height={20}/>
                ) : (
                    <Minus stroke={"var(--color-black-primary)"} height={20}/>
                )
                }
            </button>
            <div
                className={`grid w-full transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <ul className={"flex items-center w-full flex-wrap max-h-[250px] overflow-y-auto tiny-scrollbar"}>
                        {colors()}
                        {list()}
                        {grid()}
                    </ul>
                </div>
            </div>
        </div>
    )
}