"use client"

import dynamic from "next/dynamic"

const DynamicMap = dynamic(() => import("../../components/Map/index"), { ssr: false })

export default function Map() {
    return (
        <DynamicMap />
    )
}