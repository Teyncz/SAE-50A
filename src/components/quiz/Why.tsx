import {Info} from 'lucide-react'

export const Why: React.FC<{ text: string }> = ({text}) => {
    return (
        <div className="relative flex gap-[10px] items-center mt-[20px]">

            <div className="flex items-center gap-[5px] text-[#737373] text-[14px] cursor-pointer group">
                <Info height={15}/>
                <p className={"group-hover:underline"}>Pourquoi cette question ?</p>
                <div
                    className="absolute group-hover:flex hidden top-full left-0 mt-[5px] w-full bg-white border-1 rounded-[8px] border-[#E5E5E5] p-3 text-[14px] text-[#737373] shadow-lg z-50">
                    {text}
                </div>
            </div>
        </div>
    );
}