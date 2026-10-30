import "./App.css";
import { useState } from "react";
import Globo from "./components/Globo.jsx";
import { useFetch } from "./hooks/useFetch.js";
import { aSismo, urlUsgs } from "./utils/sismos.js";

export default function App() {
    const { datos } = useFetch(urlUsgs("day"));
    const sismos = datos?.features.map(aSismo) ?? [];
    const [idSeleccionado, setIdSeleccionado] = useState(null);
    const seleccionado = sismos.find((sismo) => sismo.id === idSeleccionado) ?? null;
    return (
        <main className="globo">
            <Globo sismos={sismos} seleccionado={seleccionado} onSeleccionar={setIdSeleccionado} />
        </main>
    );
}
