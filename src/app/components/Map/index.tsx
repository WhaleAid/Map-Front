import { FC, useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps { }

const INITIAL_CENTER: [number, number] = [2.333333, 48.866667];
const INITIAL_ZOOM = 10.12;

const Map: FC<MapProps> = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER);
    const [zoom, setZoom] = useState(INITIAL_ZOOM);

    useEffect(() => {
        if (!mapContainerRef.current) return;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/walidkh/cm5l7omhw005b01s74l0j2okx",
            center: center,
            zoom: zoom,
        });

        mapRef.current.on("move", () => {
            if (!mapRef.current) return;
            const mapCenter = mapRef.current.getCenter();
            const mapZoom = mapRef.current.getZoom();
            setCenter([mapCenter.lng, mapCenter.lat]);
            setZoom(mapZoom);
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    return (
        <>
            <div className="absolute top-2 right-3 bg-white bg-opacity-90 p-2 rounded-lg shadow-lg z-50 h-[95vh] px-5 py-4">
                <h2 className="font-libre text-xl font-bold">Map Filters</h2>
            </div>
            <div id="map-container" ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
        </>
    );
};

export default Map;