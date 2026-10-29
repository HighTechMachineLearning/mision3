export const urlUsgs = (periodo) =>
    `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_${periodo}.geojson`;

export const COLORES_NIVEL = {
    leve: "#2ecc71",
    moderado: "#f39c12",
    fuerte: "#e74c3c",
};

export function nivelDeMagnitud(magnitud) {
    if (magnitud < 4) return "leve";
    if (magnitud < 6) return "moderado";
    return "fuerte";
}

export function aSismo({ id, properties, geometry }) {
    const [longitud, latitud, profundidad] = geometry.coordinates;
    return {
        id,
        lugar: properties.place,
        magnitud: properties.mag,
        tiempo: properties.time,
        profundidad,
        tsunami: properties.tsunami === 1,
        url: properties.url,
        longitud,
        latitud,
    };
}

export function filtrarSismos(sismos, { magnitud, profundidad, lugar, soloTsunami }) {
    const [magnitudMinima, magnitudMaxima] = magnitud;
    const [profundidadMinima, profundidadMaxima] = profundidad;
    const textoLugar = lugar.trim().toLowerCase();

    return sismos.filter((sismo) => {
        // Las profundidades negativas se tratan como 0 solo para filtrar
        const profundidadParaFiltro = Math.max(0, sismo.profundidad);

        return (
            sismo.magnitud >= magnitudMinima &&
            sismo.magnitud <= magnitudMaxima &&
            profundidadParaFiltro >= profundidadMinima &&
            profundidadParaFiltro <= profundidadMaxima &&
            sismo.lugar.toLowerCase().includes(textoLugar) &&
            (!soloTsunami || sismo.tsunami)
        );
    });
}

export function calcularEstadisticas(sismos) {
    const porNivel = { leve: 0, moderado: 0, fuerte: 0 };
    for (const { magnitud } of sismos) {
        porNivel[nivelDeMagnitud(magnitud)]++;
    }

    if (sismos.length === 0) {
        return { total: 0, maxima: null, media: null, mediana: null, porNivel };
    }

    const magnitudes = sismos.map(({ magnitud }) => magnitud).toSorted((a, b) => a - b);
    const mitad = Math.floor(magnitudes.length / 2);
    const mediana =
        magnitudes.length % 2 === 0
            ? (magnitudes[mitad - 1] + magnitudes[mitad]) / 2
            : magnitudes[mitad];

    return {
        total: magnitudes.length,
        maxima: magnitudes.at(-1),
        media: magnitudes.reduce((suma, magnitud) => suma + magnitud, 0) / magnitudes.length,
        mediana,
        porNivel,
    };
}

export const tamanoMarcador = (magnitud) => 6 + (magnitud - 2.5) * 3;
