import React from 'react';
import { File, X } from 'lucide-react';

interface FileItemProps {
    file: File;
    onDelete: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onDelete }) => {
    return (
        <div className="flex items-center gap-2">
            <File size={16} />
            <p>{file.name}</p>
            <X size={18} onClick={onDelete} className='transition-all ease-in-out cursor-pointer hover:bg-gray-800 rounded' />
        </div>
    );
};

export default FileItem;