import "./App.css";
import { useState } from "react";
import { aSismo, calcularEstadisticas, urlUsgs } from "./utils/sismos.js";
import { useFetch } from "./hooks/useFetch.js";
import Globo from "./components/Globo.jsx";
import PanelLateral from "./components/PanelLateral.jsx";

export default function App() {
    const { datos, cargando, error, reintentar } = useFetch(urlUsgs("day"));
    const [idSeleccionado, setIdSeleccionado] = useState(null);

    const sismos = datos?.features.map(aSismo) ?? [];
    const estadisticas = calcularEstadisticas(sismos);
    const seleccionado = sismos.find((sismo) => sismo.id === idSeleccionado) ?? null;

    return (
        <>
            <PanelLateral
                cargando={cargando}
                error={error}
                onReintentar={reintentar}
                estadisticas={estadisticas}
            />
            <main className="globo">
                <Globo sismos={sismos} seleccionado={seleccionado} onSeleccionar={setIdSeleccionado} />
            </main>
        </>
    );
}
