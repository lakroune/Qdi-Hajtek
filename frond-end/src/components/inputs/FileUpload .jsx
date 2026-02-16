import React, { useState, useRef } from 'react';
import { Upload, X, File, Check, AlertCircle } from 'lucide-react';

const FileUpload = ({
    id,
    label,
    sublabel = '',
    icon: Icon = Upload,
    accept = 'image/*,.pdf',
    multiple = false,
    maxSize = 5, // MB
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

        // Vérifier nombre de fichiers
        if (multiple && files.length > maxFiles) {
            setLocalError(`Maximum ${maxFiles} fichiers autorisés`);
            return;
        }

        // Vérifier taille
        const oversizedFiles = files.filter(f => f.size > maxSize * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            setLocalError(`Fichier trop volumineux. Max: ${maxSize}MB`);
            return;
        }

        // Vérifier type
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
            setLocalError('Type de fichier non valide');
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
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {Icon && <Icon className="w-4 h-4 inline mr-1" />}
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Zone de drop */}
            {!hasFiles && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                        border-2 border-dashed rounded-xl p-6 text-center transition-all
                        ${isDragging 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-300 hover:border-orange-500 hover:bg-gray-50'
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
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 font-medium">
                            {isDragging ? 'Déposez les fichiers ici' : 'Cliquez pour télécharger'}
                        </p>
                        {sublabel && (
                            <p className="text-xs text-gray-400 mt-1">{sublabel}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                            {accept.includes('image') && 'Images '}
                            {accept.includes('pdf') && 'PDF '}
                            • Max {maxSize}MB
                            {multiple && ` • ${maxFiles} fichiers max`}
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
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <File className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemove(idx)}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    
                    {/* Bouton ajouter plus (si multiple) */}
                    {multiple && Array.isArray(value) && value.length < maxFiles && (
                        <label 
                            htmlFor={id} 
                            className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors"
                        >
                            <Upload className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Ajouter un fichier</span>
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
                <div className="flex items-center gap-1.5 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error || localError}
                </div>
            )}
        </div>
    );
};

 
export default FileUpload;