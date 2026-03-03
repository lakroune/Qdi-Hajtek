import  { useState, useRef } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';

const FileUpload = ({
    id,
    label,
    sublabel = '',
    icon: Icon = Upload,
    accept = 'image/*,.pdf',
    multiple = false,
    maxSize = 5,
    maxFiles = 5,
    required = false,
    value,
    onChange,
    error,
    className = ''
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState('');
    const inputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        validateAndUpload(files);
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        validateAndUpload(files);
    };

    const validateAndUpload = (files) => {
        setLocalError('');

        if (multiple && files.length > maxFiles) {
            setLocalError(`Maximum ${maxFiles} fichiers`);
            return;
        }

        const oversizedFiles = files.filter(f => f.size > maxSize * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            setLocalError(`Max: ${maxSize}MB`);
            return;
        }

        const validTypes = accept.split(',').map(t => t.trim());
        const invalidFiles = files.filter(f => {
            const ext = `.${f.name.split('.').pop().toLowerCase()}`;
            return !validTypes.some(type => 
                type === 'image/*' ? f.type.startsWith('image/') :
                type === '.pdf' ? ext === '.pdf' :
                f.type === type || ext === type
            );
        });

        if (invalidFiles.length > 0) {
            setLocalError('Format non valide');
            return;
        }

        onChange?.(multiple ? files : files[0]);
    };

    const handleRemove = (indexToRemove) => {
        if (multiple && Array.isArray(value)) {
            const newFiles = value.filter((_, idx) => idx !== indexToRemove);
            onChange?.(newFiles);
        } else {
            onChange?.(null);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const hasFiles = multiple 
        ? Array.isArray(value) && value.length > 0 
        : value !== null && value !== undefined;

    return (
        <div className={className}>
            <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                {label}
                {required && <span className="text-[#D35400] ml-1">*</span>}
            </label>

            {!hasFiles && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                        border border-dashed p-4 text-center transition-all
                        ${isDragging 
                            ? 'border-[#D35400] bg-[#D35400]/5' 
                            : 'border-gray-200 hover:border-[#1B4F72] hover:bg-gray-50'
                        }
                    `}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        id={id}
                        accept={accept}
                        multiple={multiple}
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <label htmlFor={id} className="cursor-pointer block">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-[11px] text-gray-600 font-medium">
                            {isDragging ? 'Déposer ici' : 'Cliquer ou glisser'}
                        </p>
                        {sublabel && (
                            <p className="text-[9px] text-gray-400 mt-1">{sublabel}</p>
                        )}
                        <p className="text-[9px] text-gray-400 mt-1">
                            {accept.includes('image') && 'JPG, PNG '}
                            {accept.includes('pdf') && 'PDF '}
                            • Max {maxSize}MB
                            {multiple && ` • ${maxFiles} max`}
                        </p>
                    </label>
                </div>
            )}

            {/* Liste des fichiers */}
            {hasFiles && (
                <div className="space-y-2">
                    {(multiple ? value : [value]).map((file, idx) => (
                        <div 
                            key={idx} 
                            className="flex items-center gap-3 p-3 border border-gray-200"
                        >
                            <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center flex-shrink-0">
                                <File className="w-5 h-5 text-[#1B4F72]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium text-[#1B4F72] truncate">
                                    {file.name}
                                </p>
                                <p className="text-[9px] text-gray-500">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemove(idx)}
                                className="p-1.5 text-gray-400 hover:text-[#D35400] hover:bg-[#D35400]/10 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    
                    {multiple && Array.isArray(value) && value.length < maxFiles && (
                        <label 
                            htmlFor={id} 
                            className="flex items-center justify-center gap-2 p-3 border border-dashed border-gray-200 cursor-pointer hover:border-[#D35400] hover:bg-[#D35400]/5 transition-colors"
                        >
                            <Upload className="w-4 h-4 text-gray-400" />
                            <span className="text-[11px] text-gray-600">Ajouter</span>
                            <input
                                ref={inputRef}
                                type="file"
                                id={id}
                                accept={accept}
                                multiple
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            )}

            {/* Erreurs */}
            {(error || localError) && (
                <div className="flex items-center gap-1.5 mt-2 text-[#D35400] text-[10px]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {error || localError}
                </div>
            )}
        </div>
    );
};

export default FileUpload;