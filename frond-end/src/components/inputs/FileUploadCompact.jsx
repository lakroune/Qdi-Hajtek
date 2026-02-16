 const FileUploadCompact = ({
    onChange,
    value,
    accept = 'image/*,.pdf',
    className = ''
}) => {
    return (
        <div className={className}>
            {!value ? (
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Ajouter</span>
                    <input
                        type="file"
                        accept={accept}
                        onChange={(e) => onChange?.(e.target.files[0])}
                        className="hidden"
                    />
                </label>
            ) : (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 truncate max-w-[120px]">{value.name}</span>
                    <button
                        type="button"
                        onClick={() => onChange?.(null)}
                        className="p-1 hover:bg-green-100 rounded"
                    >
                        <X className="w-3 h-3 text-green-600" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUploadCompact;