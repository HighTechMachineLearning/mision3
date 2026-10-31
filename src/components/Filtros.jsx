import { MAGNITUD_MAXIMA, MAGNITUD_MINIMA } from "../utils/sismos.js";

const PERIODOS = [
    { valor: "hour", etiqueta: "Última hora" },
    { valor: "day", etiqueta: "24 horas" },
    { valor: "week", etiqueta: "7 días" },
    { valor: "month", etiqueta: "30 días" },
];

export default function Filtros({ filtros, onChange }) {
    const { periodo, magnitudMinima, magnitudMaxima, lugar, soloTsunami } = filtros;

    return (
        <section className="filtros">
            <h2>Filtros</h2>

            <label>
                Periodo
                <select
                    value={periodo}
                    onChange={(evento) => onChange({ ...filtros, periodo: evento.target.value })}
                >
                    {PERIODOS.map(({ valor, etiqueta }) => (
                        <option key={valor} value={valor}>
                            {etiqueta}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Magnitud mínima: {magnitudMinima.toFixed(2)}
                <input
                    type="range"
                    min={MAGNITUD_MINIMA}
                    max={MAGNITUD_MAXIMA}
                    step="0.1"
                    value={magnitudMinima}
                    onChange={(evento) =>
                        onChange({
                            ...filtros,
                            magnitudMinima: Math.min(Number(evento.target.value), magnitudMaxima),
                        })
                    }
                />
            </label>

            <label>
                Magnitud máxima: {magnitudMaxima.toFixed(2)}
                <input
                    type="range"
                    min={MAGNITUD_MINIMA}
                    max={MAGNITUD_MAXIMA}
                    step="0.1"
                    value={magnitudMaxima}
                    onChange={(evento) =>
                        onChange({
                            ...filtros,
                            magnitudMaxima: Math.max(Number(evento.target.value), magnitudMinima),
                        })
                    }
                />
            </label>

            <label>
                Lugar
                <input
                    type="search"
                    value={lugar}
                    onChange={(evento) => onChange({ ...filtros, lugar: evento.target.value })}
                />
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={soloTsunami}
                    onChange={(evento) => onChange({ ...filtros, soloTsunami: evento.target.checked })}
                />
                Solo con aviso de tsunami
            </label>
        </section>
    );
}
