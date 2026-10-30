import { useEffect, useState } from "react";

async function cargar(url, signal, setResultado) {
    setResultado({ cargando: true, datos: null, error: null });
    try {
        const respuesta = await fetch(url, { signal });
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status} al pedir ${url}`);
        }
        const datos = await respuesta.json();
        setResultado({ cargando: false, datos, error: null });
    } catch (error) {
        if (error.name === "AbortError") return;
        setResultado({ cargando: false, datos: null, error });
    }
}

export function useFetch(url) {
    const [intento, setIntento] = useState(0);
    const [resultado, setResultado] = useState({ cargando: true, datos: null, error: null });

    useEffect(() => {
        const controlador = new AbortController();
        cargar(url, controlador.signal, setResultado);
        return () => controlador.abort();
    }, [url, intento]);

    return {
        ...resultado,
        reintentar: () => setIntento((intentoActual) => intentoActual + 1),
    };
}
