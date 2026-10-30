import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const URL_ARCGIS = "https://server.arcgisonline.com/ArcGIS/rest/services";

// Fuera del componente: si se creara en cada render, el mapa recargaría el estilo
const ESTILO_MAPA = {
    version: 8,
    projection: { type: "globe" },
    sources: {
        satelite: {
            type: "raster",
            tiles: [`${URL_ARCGIS}/World_Imagery/MapServer/tile/{z}/{y}/{x}`],
            tileSize: 256,
            maxzoom: 19,
            attribution: "Esri, Maxar, Earthstar Geographics",
        },
        etiquetas: {
            type: "raster",
            tiles: [`${URL_ARCGIS}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`],
            tileSize: 256,
            maxzoom: 19,
        },
    },
    // El orden importa: la última capa se dibuja encima
    layers: [
        { id: "satelite", type: "raster", source: "satelite" },
        { id: "etiquetas", type: "raster", source: "etiquetas" },
    ],
};

const VISTA_INICIAL = { longitude: 0, latitude: 20, zoom: 2 };

export default function Globo() {
    return (
        <Map
            mapStyle={ESTILO_MAPA}
            initialViewState={VISTA_INICIAL}
            style={{ width: "100%", height: "100%" }}
        />
    );
}
