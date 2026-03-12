import { useState, useRef } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';

const FileUpload = ({
    id,
    label,
    accept = 'image/*,.pdf',
    multiple = false,
    maxSize = 5,
    maxFiles = 5,
    required = false,
    disabledFiles = true,
    value,
    onChange,
    error,
    className = ''
}) => {
    const [erreurLocale, setErreurLocale] = useState('');
    const inputRef = useRef(null);

    const formaterTaille = (bytes) => {
        if (bytes === 0) return '0 Octets';
        const k = 1024;
        const tailles = ['Octets', 'Ko', 'Mo'];
        const i = Math.floor(Math.log(bytes) / Math.log(k)); // hadi pour trouver l'index
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + tailles[i];
    };

    const validerEtEnvoyer = (nouveauxFichiers) => {
        setErreurLocale('');

        if (multiple && (value?.length || 0) + nouveauxFichiers.length > maxFiles) {
            setErreurLocale(`Maximum ${maxFiles} fichiers autorisés`);
            return;
        }

        const tropGros = nouveauxFichiers.filter(f => f.size > maxSize * 1024 * 1024);
        if (tropGros.length > 0) {
            setErreurLocale(`Taille max : ${maxSize} Mo`);
            return;
        }

        if (multiple) {
            const cumul = Array.isArray(value) ? [...value, ...nouveauxFichiers] : nouveauxFichiers;
            onChange?.(cumul);
        } else {
            onChange?.(nouveauxFichiers[0]);
        }
    };

    const handleFileSelect = (e) => {
        const fichiers = Array.from(e.target.files);
        if (fichiers.length > 0) {
            validerEtEnvoyer(fichiers);
        }
        e.target.value = '';
    };

    const supprimerFichier = (index) => {
        if (multiple) {
            const nouveauTableau = value.filter((_, i) => i !== index);
            onChange?.(nouveauTableau);
        } else {
            onChange?.(null);
        }
    };

    const hasFichiers = multiple ? (Array.isArray(value) && value.length > 0) : !!value;

    return (
        <div className={className}>
            <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                {label} {required && <span className="text-[#D35400]">*</span>}
            </label>

            {(!hasFichiers || multiple) && (
                <div className={`border border-dashed p-4 text-center transition-all 
                    ${(error || erreurLocale) ? 'border-[#D35400] bg-[#D35400]/5' : 'border-gray-300 hover:border-[#1B4F72]'}`}>
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
                        <span className="text-[11px] text-gray-500">
                            {multiple ? 'Ajouter des fichiers' : 'Choisir un fichier'}
                        </span>
                    </label>
                </div>
            )}

            {hasFichiers && disabledFiles && (
                <div className="mt-3 space-y-2">
                    {(multiple ? value : [value]).map((fichier, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 border border-gray-200 bg-white">
                            <div className="w-8 h-8 bg-[#1B4F72]/10 flex items-center justify-center">
                                <File className="w-4 h-4 text-[#1B4F72]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium text-[#1B4F72] truncate">{fichier.name}</p>
                                <p className="text-[9px] text-gray-500">{formaterTaille(fichier.size)}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => supprimerFichier(idx)}
                                className="p-1 text-gray-400 hover:text-[#D35400]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {(error || erreurLocale) && (
                <div className="flex items-center gap-1.5 mt-2 text-[#D35400] text-[10px]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {erreurLocale || error}
                </div>
            )}
        </div>
    );
};

export default FileUpload;