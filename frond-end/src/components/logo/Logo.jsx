import React from "react";

const Logo = ({
    size = "md",
    className = "",
    showText = true,
    variant = "light"
}) => {
    const sizes = {
        sm: { box: "w-10 h-10", text: "text-sm" },
        md: { box: "w-14 h-14", text: "text-base" },
        lg: { box: "w-20 h-20", text: "text-xl" },
    };

    const current = sizes[size] || sizes.md;

    if (variant === "light") {
        return (
            <div className={`flex items-center gap-4 ${className}`}>
                {/* LOGO ICON */}
                <div
                    className={`relative ${current.box} rotate-45 rounded-xl overflow-hidden`}
                >
                    {/* Left */}
                    <div className="absolute left-0 top-0 h-full w-1/2 bg-[#D35400]" />
                    {/* Right */}
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-[#1B4F72]" />

                    {/* Letters */}
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45 font-serif font-bold text-white">
                        <span className="text-lg">Q</span>
                        <span className="text-lg ml-1">H</span>
                    </div>
                </div>

                {/* TEXT */}
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
    }
    else if (variant === "dark") {
        return (
            <div className={`flex items-center gap-4 ${className}`}>
                {/* LOGO ICON */}
                <div
                    className={`relative ${current.box} rotate-45 rounded-xl overflow-hidden`}
                >
                    {/* Left */}
                    <div className="absolute left-0 top-0 h-full w-1/2 bg-[#D35400]" />
                    {/* Right */}
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-[#1B4F72]" />

                    {/* Letters */}
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45 font-serif font-bold text-white">
                        <span className="text-lg">Q</span>
                        <span className="text-lg ml-1">H</span>
                    </div>
                </div>

                {/* TEXT */}
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
    }
    else
        return null;
};

export default Logo;
