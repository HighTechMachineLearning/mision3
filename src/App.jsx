import { useState } from "react";
import {
    aSismo,
    calcularEstadisticas,
    FILTROS_INICIALES,
    filtrarSismos,
    urlUsgs,
} from "./utils/sismos.js";
import { useFetch } from "./hooks/useFetch.js";
import Globo from "./components/Globo.jsx";
import PanelLateral from "./components/PanelLateral.jsx";
import "./App.css";

export default function App() {
    const [filtros, setFiltros] = useState(FILTROS_INICIALES);
    const [idSeleccionado, setIdSeleccionado] = useState(null);

    const { datos, cargando, error, reintentar } = useFetch(urlUsgs(filtros.periodo));
    const sismos = datos?.features.map(aSismo) ?? [];
    const sismosFiltrados = filtrarSismos(sismos, filtros);
    const estadisticas = calcularEstadisticas(sismosFiltrados);
    const seleccionado = sismosFiltrados.find((sismo) => sismo.id === idSeleccionado) ?? null;

    return (
        <div className="app">
            <PanelLateral
                filtros={filtros}
                onCambiarFiltros={setFiltros}
                cargando={cargando}
                error={error}
                onReintentar={reintentar}
                estadisticas={estadisticas}
            />
            <main className="globo">
                <Globo
                    sismos={sismosFiltrados}
                    seleccionado={seleccionado}
                    onSeleccionar={setIdSeleccionado}
                />
            </main>
        </div>
    );
}
