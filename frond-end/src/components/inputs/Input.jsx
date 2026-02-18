// src/components/inputs/Input.jsx
const Input = ({ label, type, name, value, onChange, placeholder, Icon, required = true }) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange} 
          placeholder={placeholder}
          required={required}
          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200   text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
        />
      </div>
    </div>
  );
};
export default Input;