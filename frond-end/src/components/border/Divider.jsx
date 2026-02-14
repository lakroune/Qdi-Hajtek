
const Divider = ({text}) => {
    return (
        <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{text}</span>
            <div className="flex-1 h-px bg-gray-200"></div>
        </div>
    )
};
export default Divider;