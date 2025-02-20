import React from 'react'
import Dropzone from 'react-dropzone'

interface FilePickerProps {
  onChange: (files: any) => void
}



const FilePicker: React.FC<FilePickerProps> = ({ onChange }) => {
    return (
        <Dropzone onDrop={acceptedFiles => onChange(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div className='p-12 text-center transition-all ease-in-out bg-transparent text-black dark:text-slate-100 border-2 border-dashed rounded-xl dark:border-slate-50 border-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-950' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className='font-sans'>drop files here or select</p>
                </div>
                </section>
            )}
        </Dropzone>
    )
}

export default FilePicker;