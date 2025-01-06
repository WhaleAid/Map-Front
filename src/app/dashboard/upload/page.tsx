"use client"

import { Panel } from "@/app/types/Panel"
import { IconCircleArrowUpFilled, IconDots, IconFile, IconFileUpload, IconUpload, IconX } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export default function settings() {

    const [file, setFile] = useState<File>()
    const [fileData, setFileData] = useState<Array<Panel | null>>()
    const [showAll, setShowAll] = useState(false)

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
        <div className="w-full h-full flex flex-col justify-center items-center bg-white overflow-y-auto">
            <div className="flex flex-col justify-start items-start h-full w-full p-10">
                <h1 className="text-4xl font-bold mb-10 font-libre">Upload panels</h1>
                <div className="flex flex-col w-full gap-12 items-start">
                    <div className="flex flex-col gap-4 justify-between items-start w-full">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-bold text-md font-roboto">
                                Upload des écrans
                            </h2>
                            <p className="text-gray-500 text-md font-roboto">
                                Utilisez ce champ pour importer les écrans à l'aide d'un fichier CSV.
                            </p>
                        </div>
                        <div {...getRootProps()} className={`flex flex-col w-full h-56 gap-4 justify-center items-center py-8 px-16 
                        ${isDragActive || file ? 'bg-purple-100' : 'bg-white'}
                            border border-dashed 
                            ${isDragActive || file ? 'border-purple-600' : 'border-purple-300'} 
                            rounded-xl cursor-pointer`}>
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
                                mode="wait"
                            >
                                <motion.div
                                    key="preview"
                                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col gap-4 justify-start items-start w-full overflow-auto"
                                >
                                    <span
                                        className="cursor-pointer p-2 rounded-full bg-slate-100 hover:bg-purple-600 transition-all z-50 flex gap-2 text-purple-600 hover:text-white font-bold"
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
                                        />
                                    </span>
                                    <h2 className="font-bold mb-4">Aperçu</h2>

                                    <motion.div
                                        initial={{ height: showAll ? 'auto' : '150px' }}
                                        animate={{ height: showAll ? 'auto' : '150px' }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="overflow-hidden w-full"
                                    >
                                        <table className="table-auto rounded-md overflow-y w-full">
                                            <thead>
                                                <tr>
                                                    <th className="text-purple-600 bg-purple-100 rounded-tl-xl mx-2 py-2 px-4">ID</th>
                                                    <th className="text-purple-600 bg-purple-100 mx-2 py-2 px-4">Name</th>
                                                    <th className="text-purple-600 bg-purple-100 mx-2 py-2 px-4">Address</th>
                                                    <th className="text-purple-600 bg-purple-100 mx-2 py-2 px-4">Status</th>
                                                    <th className="text-purple-600 bg-purple-100 mx-2 py-2 px-4">Longitude</th>
                                                    <th className="text-purple-600 bg-purple-100 mx-2 py-2 px-4">Latitude</th>
                                                    <th className="text-purple-600 bg-purple-100 rounded-tr-xl mx-2 py-2 px-4">Size</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <AnimatePresence>
                                                    {(showAll ? fileData : fileData?.slice(0, 5)).map((panel, index) => (
                                                        <motion.tr
                                                            key={index}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -20 }}
                                                            transition={{ duration: 0.1 }}
                                                        >
                                                            <td className="bg-white py-2 text-center font-roboto">{panel?.id}</td>
                                                            <td className="bg-white py-2 text-center font-roboto">{panel?.name}</td>
                                                            <td className="bg-white py-2 text-center font-roboto">{panel?.address}</td>
                                                            <td className="bg-white py-2 text-center font-roboto">{panel?.status}</td>
                                                            <td className="bg-white py-2 text-center font-roboto">{panel?.longitude}</td>
                                                            <td className="bg-white py-2 text-center font-roboto">{panel?.latitude}</td>
                                                            <td className="bg-white py-2 text-center font-roboto">{panel?.size}</td>
                                                        </motion.tr>
                                                    ))}
                                                </AnimatePresence>
                                            </tbody>
                                        </table>
                                    </motion.div>

                                    <span className={`${showAll ? 'bg-white' : 'bg-purple-600'} 
                                        rounded-full cursor-pointer px-1 shadow-sm hover:shadow-none transition-all z-50 flex gap-2 self-center`}
                                        onClick={() => setShowAll(!showAll)}>
                                        {
                                            showAll ?
                                                <IconCircleArrowUpFilled size={28} stroke={2} color="#9333ea" /> :
                                                <IconDots size={24} stroke={2} color="#fff" />
                                        }
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        ) : null
                    }
                </div>
            </div>
        </div >
    )
}