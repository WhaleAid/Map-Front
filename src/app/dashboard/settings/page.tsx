"use client"

import { Panel } from "@/app/types/Panel"
import { IconFile, IconFileUpload, IconUpload, IconX } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export default function settings() {

    const [file, setFile] = useState<File>()
    const [fileData, setFileData] = useState<Array<Panel | null>>()

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        setFile(acceptedFiles[0]);

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            const data = result
                .split('\n')
                .filter((line) => line.trim() !== "")
                .map((line, index) => {
                    if (index === 0) return null;
                    const [id, name, address, status, longitude, latitude, size] = line.split(',').map(value => value.trim());
                    return { id, name, address, status, longitude, latitude, size } as Panel;
                })
                .filter(Boolean);
            setFileData(data);
        };
        reader.onerror = () => {
            console.error("Error reading the file");
            setFile(undefined);
        };
        reader.readAsText(acceptedFiles[0]);
    }, []);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv']
        },
        maxFiles: 1
    })

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-white">
            <div className="flex flex-col justify-start items-start h-full w-full p-10">
                <h1 className="text-4xl font-bold mb-10 font-libre">Settings</h1>
                <div className="flex md:flex-row flex-col w-full gap-12 items-start">
                    <div className="flex flex-col gap-4 justify-between items-start">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-bold text-md font-roboto">
                                Upload des écrans
                            </h2>
                            <p className="text-gray-500 text-md font-roboto">
                                Utilisez ce champ pour importer les écrans à l'aide d'un fichier CSV.
                            </p>
                        </div>
                        <div {...getRootProps()} className="flex flex-col w-[250px] md:w-[500px] h-56 gap-4 justify-center items-center py-8 px-16 bg-purple-100 border border-dashed border-purple-600 rounded-xl cursor-pointer">
                            <input {...getInputProps()} />
                            {
                                file ?
                                    <div className="flex flex-col gap-4 justify-center items-center">
                                        <IconFile size={48} stroke={2} color="#9333ea" />
                                        <div className="flex flex-row gap-4 justify-center items-center w-fit">
                                            <p className="text-purple-600 font-bold font-roboto">File:{' '}
                                                {
                                                    file?.name.length > 40 ? file?.name.slice(0, 40) + "..." : file?.name
                                                }
                                            </p>
                                        </div>
                                    </div> :
                                    !file && isDragActive ?
                                        <>
                                            <IconFileUpload size={48} stroke={2} color="#9333ea" />
                                            <p className="text-purple-600 font-bold font-roboto text-center">Drop the CSV file here</p>
                                        </> :
                                        <>
                                            <IconFileUpload size={48} stroke={2} color="#9333ea" />
                                            <p className="text-purple-600 font-bold font-roboto text-center">Drag and drop some files here, or click to select files</p>
                                        </>
                            }
                            <span className="italic text-gray-500 text-sm">
                                Supported file types: CSV
                            </span>
                        </div>
                    </div>
                    {
                        (fileData && fileData?.length > 0) ? (
                            <AnimatePresence
                                initial={true}
                                mode="wait">
                                <motion.div
                                    key="preview"
                                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col gap-4 justify-start items-start"
                                >
                                    <h2 className="font-bold mb-4">Aperçu</h2>
                                    <span
                                        className="cursor-pointer p-2 rounded-full bg-purple-200 hover:bg-purple-600 shadow-sm hover:shadow-none transition-all z-50 flex gap-2 text-purple-600 hover:text-purple-200 font-bold"
                                        onClick={() => {
                                            setFile(undefined)
                                            setFileData(undefined)
                                        }}
                                    >
                                        Unload{' '}
                                        <IconX
                                            size={24}
                                            stroke={2}
                                            color="currentColor"
                                            className="transform hover:scale-125"
                                        />
                                    </span>

                                    <table className="table-auto rounded-md overflow-y">
                                        <thead>
                                            <tr>
                                                <th className="text-purple-600 bg-purple-100 py-2 px-4">ID</th>
                                                <th className="text-purple-600 bg-purple-100 py-2 px-4">Name</th>
                                                <th className="text-purple-600 bg-purple-100 py-2 px-4">Address</th>
                                                <th className="text-purple-600 bg-purple-100 py-2 px-4">Status</th>
                                                <th className="text-purple-600 bg-purple-100 py-2 px-4">Longitude</th>
                                                <th className="text-purple-600 bg-purple-100 py-2 px-4">Latitude</th>
                                                <th className="text-purple-600 bg-purple-100 py-2 px-4">Size</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                fileData?.map((panel, index) => (
                                                    <tr key={index}>
                                                        <td className="bg-white py-2 text-center font-roboto">{panel?.id}</td>
                                                        <td className="bg-white py-2 text-center font-roboto">{panel?.name}</td>
                                                        <td className="bg-white py-2 text-center font-roboto">{panel?.address}</td>
                                                        <td className="bg-white py-2 text-center font-roboto">{panel?.status}</td>
                                                        <td className="bg-white py-2 text-center font-roboto">{panel?.longitude}</td>
                                                        <td className="bg-white py-2 text-center font-roboto">{panel?.latitude}</td>
                                                        <td className="bg-white py-2 text-center font-roboto">{panel?.size}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </motion.div>
                            </AnimatePresence>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}