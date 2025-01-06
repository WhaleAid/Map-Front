"use client"
import { BackgroundLines } from "@/components/ui/background-lines";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { ai, useInquireAiMutation } from "@/services/aiService";
import { notify } from "@/utils/notify";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Vortex } from "react-loader-spinner";

export default function prompt() {

    const [inquireAi, { data: aiData, isLoading: aiLoading, isError: aiError }] = useInquireAiMutation()
    const [request, setRequest] = useState<string>("")

    useEffect(() => {
        if (aiError) {
            notify('Erreur lors de la génération de votre réponse', { icon: '❌', style: { background: '#fff', color: '#000' } });
        }
    }, [aiError, aiData])

    const placeholders = [
        "I want to request...",
        "I need...",
        "I would like...",
        "I am looking for...",
    ]

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(e.target.value)
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("🚀 ~ onSubmit ~ e:", e)
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const requestValue = formData.get('request') as string;

        console.log("Request value:", requestValue);
        setRequest(requestValue);

        inquireAi({ request: requestValue });
        console.log("submitted");
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-white p-10">
            <AnimatePresence
                initial={true}
                mode="wait"
            >
                <h2 className="font-bold text-4xl self-start mt-20 font-libre">
                    Chat
                </h2>
                {
                    (aiLoading && !aiData) ? (
                        <div className="w-full m-auto flex justify-center flex-col items-center gap-4">
                            <Vortex
                                visible={true}
                                height="60"
                                width="60"
                                ariaLabel="vortex-loading"
                                wrapperStyle={{}}
                                wrapperClass="vortex-wrapper"
                                colors={['#7A63EB', '#5C9BEB', '#7A63EB', '#5C9BEB', '#7A63EB', '#5C9BEB']}
                            />
                            <span className='text-black font-bold text-xl drop-shadow-md'>
                                Chargement...
                            </span>
                        </div>
                    ) : (!aiLoading && !aiData) ? (
                        <motion.div
                            key="prompt"
                            initial={{ opacity: 0, scale: 0.9, y: -50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -50 }}
                            transition={{ duration: 0.5 }}
                            className="min-w-screen min-h-screen w-full h-full flex m-auto justify-center items-center">
                            <BackgroundLines className="flex flex-col justify-center items-center">
                                <div className="flex gap-4 justify-center items-center">
                                    <Image src="/assets/imgs/turnadon-logo.png" width={70} height={50} alt="Turnadon-logo" />
                                    <h1 className="text-6xl font-semibold text-gray-800 dark:text-gray-200">Turnadon AI</h1>
                                </div>
                                <p className="text-gray-600 text-lg dark:text-gray-400 mt-2 mb-4">Write down the client's request</p>
                                <PlaceholdersAndVanishInput
                                    placeholders={placeholders}
                                    onChange={handleChange}
                                    onSubmit={onSubmit}
                                    name="request"
                                />
                            </BackgroundLines>
                        </motion.div>
                    ) : (!aiLoading && aiData) ? (
                        <motion.div
                            key="response"
                            initial={{ opacity: 0, scale: 0.9, y: -50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -50 }}
                            transition={{ duration: 0.5 }}
                            className="min-w-screen min-h-screen w-full h-full flex flex-col m-auto justify-start items-start p-12"
                        >
                            <div className="flex flex-col w-full gap-4">
                                <AnimatePresence
                                    initial={true}
                                    mode="wait"
                                >
                                    <motion.div
                                        key="request"
                                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-gray-200 text-black rounded place-self-end px-2 py-1"
                                    >
                                        <p>
                                            {
                                                request
                                            }
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                                <AnimatePresence
                                    initial={true}
                                    mode="wait"
                                >
                                    <motion.div
                                        key="response"
                                        initial={{ opacity: 0, scale: 0.9, x: -50 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-purple-500 text-white rounded self-start px-2 py-1">
                                        <p>
                                            {
                                                aiData
                                            }
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ) : (
                        null
                    )
                }
            </AnimatePresence>
        </div>
    )
}