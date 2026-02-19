import {useState} from "react";
import {Check, ChevronDown} from "lucide-react";

type OptionType = {
    label: string;
    value: string | number;
}

export const SortSelect = ({options, onChange}: { options: OptionType[], onChange: (value: string) => void }) => {


    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<string>("compatibility-desc");

    const handleChange = (clickedValue: string | number) => {
        const next = String(clickedValue);
        setSelectedOptions(next);

        onChange(next);
    }

    return (
        <div className={"px-3 py-2 border-1 rounded-[8px] border-[#E5E5E5] relative"}>
            <button onClick={() => {
                setIsOpen(!isOpen)
            }}
                    className={"flex items-center justify-between w-full cursor-pointer gap-1 px-1"}>
                <p>Trier</p>
                <ChevronDown className={`${isOpen && 'rotate-[-180deg]'} transition-all duration-200`}
                             height={20}/>

            </button>
            <div
                className={`absolute bg-white border-1 rounded-[8px] border-[#E5E5E5] px-2 py-2 w-fit left-0 top-[42px] z-50 ${!isOpen ? "hidden" : ""}`}>
                <ul>

                    {options.map(
                        (option) => (
                            <li key={option.value}>
                                <button onClick={() => {
                                    handleChange(option.value)
                                }} type="button"
                                        className={" w-full text-left rounded-[4px] cursor-pointer px-1 py-2 flex items-center justify-start gap-3 overflow-hidden group"}>
                                    <span
                                        className="border-1 border-[#767676] h-[20px] w-[20px] rounded-full flex justify-center items-center transition-all duration-200 relative">
                                            <span
                                                className={`bg-black-primary h-[14px] w-[14px] rounded-full transition-all duration-200 opacity-0 group-hover:opacity-50 ${selectedOptions === option.value && ('!opacity-100')}`}></span>

                                    </span>
                                    <p className={"pointer-events-none text-ellipsis truncate pr-3 text-[15px]"}>
                                        {option.label}
                                    </p>
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    )
}