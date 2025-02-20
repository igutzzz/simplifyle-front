import { useState } from "react";
import React from 'react'
import { Button } from "../atoms/button";
import FilePicker from "../atoms/FilePicker";
import FileItem from "../atoms/FileItem";

interface UploadTabProps {
    onSend: (files: File[]) => void;
}

const UploadTab:React.FC<UploadTabProps> = ({onSend}) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
        <div className="lg:w-[720px] w-[320px] mt-4 space-y-4">
            <FilePicker onChange={(files) => setFiles(files)} />
            <div className="flex items-center overflow-auto gap-4">
                {files.map((file) => (
                    <FileItem file={file} onDelete={() => setFiles(files.filter((f) => f !== file))} key={file.name}  />
                ))}
            </div>
            <div className="flex items-center justify-center">
                <Button className="cursor-pointer transition-all ease-in-out w-40" onClick={() => onSend(files)}>send</Button>
            </div>
        </div>
    );
};

export default UploadTab;   