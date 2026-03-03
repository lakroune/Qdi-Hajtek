import React from 'react';

const Input = ({ 
    label, 
    type = 'text', 
    name, 
    value, 
    onChange, 
    placeholder, 
    Icon, 
    required = false,
    className = ''
}) => {
    return (
        <div className={`w-full ${className}`}>
            <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                {label}
                {required && <span className="text-[#D35400] ml-1">*</span>}
            </label>
            
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`
                        w-full 
                        ${Icon ? 'pl-9' : 'pl-3'} 
                        pr-3 
                        py-2 
                        text-[12px] 
                        border 
                        border-gray-200 
                        text-[#1B4F72]
                        placeholder-gray-400 
                        focus:outline-none 
                        focus:border-[#D35400]
                        transition-colors
                    `}
                />
            </div>
        </div>
    );
};

export default Input;