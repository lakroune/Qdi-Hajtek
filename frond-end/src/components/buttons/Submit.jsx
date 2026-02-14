const Submit = ({ onClick, text, type }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:scale-[0.98] mt-6"
        >
            {text}
            <ArrowRight className="w-5 h-5" />
        </button>
    );
};

export default Submit;