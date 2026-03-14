const Select = ({ label, name, value, disabled, onChange, options, Icon }) => {
    return (
        <div>
            <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider m-2">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                )}

                <select
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(name, e.target.value)}
                    className="w-full border border-gray-300 text-[11px] py-2 px-4  border-orange-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500]   focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>{label}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>


            </div>
        </div>
    );
};

export default Select;