import {
    COLORES_NIVEL,
    MAGNITUD_MAXIMA,
    MAGNITUD_MINIMA,
    RANGOS_NIVEL,
} from "../utils/sismos.js";

const NIVELES = ["leve", "moderado", "fuerte"];

const formatear = (valor, decimales) => (valor === null ? "—" : valor.toFixed(decimales));

export default function Estadisticas({ estadisticas, onFiltrarMagnitud }) {
    const { total, maxima, media, mediana, porNivel } = estadisticas;

    return (
        <section className="estadisticas">
            <h2>Estadísticas</h2>
            <dl>
                <div>
                    <dt>
                        <button
                            type="button"
                            onClick={() => onFiltrarMagnitud(MAGNITUD_MINIMA, MAGNITUD_MAXIMA)}
                        >
                            Terremotos
                        </button>
                    </dt>
                    <dd>{total}</dd>
                </div>
                {NIVELES.map((nivel) => {
                    const [minimo, maximo] = RANGOS_NIVEL[nivel];
                    return (
                        <div key={nivel}>
                            <dt>
                                <button type="button" onClick={() => onFiltrarMagnitud(minimo, maximo)}>
                                    <span
                                        className="punto"
                                        aria-hidden="true"
                                        style={{ backgroundColor: COLORES_NIVEL[nivel] }}
                                    />
                                    {nivel}
                                </button>
                            </dt>
                            <dd>{porNivel[nivel]}</dd>
                        </div>
                    );
                })}
                <div>
                    <dt>Magnitud máxima</dt>
                    <dd>{maxima ?? "—"}</dd>
                </div>
                <div>
                    <dt>Magnitud media</dt>
                    <dd>{formatear(media, 2)}</dd>
                </div>
                <div>
                    <dt>Magnitud mediana</dt>
                    <dd>{formatear(mediana, 2)}</dd>
                </div>
            </dl>
        </section>
    );
}
