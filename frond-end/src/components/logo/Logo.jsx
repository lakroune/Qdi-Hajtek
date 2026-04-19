import React from "react";

const Logo = ({
    size = "md",
    className = "",
    showText = true,
}) => {
    const sizes = {
        sm: { box: "w-10 h-10", text: "text-sm" },
        md: { box: "w-14 h-14", text: "text-base" },
        lg: { box: "w-20 h-20", text: "text-xl" },
    };

    const current = sizes[size] || sizes.md;


    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div
                className={`relative ${current.box} rotate-45 rounded-xl overflow-hidden `}
            >
                <div className="absolute left-0 top-0 h-full w-1/2 bg-[#D35400]" />
                <div className="absolute right-0 top-0 h-full w-1/2 bg-[#1B4F72]" />

                <div className="absolute inset-0 flex items-center justify-center -rotate-45 font-serif font-bold text-white">
                    <span className="text-lg">Q</span>
                    <span className="text-lg ml-1">H</span>
                </div>
            </div>

            {showText && (
                <div className="flex flex-col leading-none">
                    <span className="font-bold tracking-tight text-gray-900">
                        QDI<span className="text-[#D35400]">HAJTEK</span>
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                        TROUVEZ VOTRE ARTISAN
                    </span>
                </div>
            )}
        </div>
    );

};

export default Logo;
