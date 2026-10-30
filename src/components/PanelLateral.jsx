import Estadisticas from "./Estadisticas.jsx";

export default function PanelLateral({ cargando, error, onReintentar, estadisticas }) {
    return (
        <aside className="panel">
            <h1>Sismo Radar</h1>
            {cargando && <p role="status">Cargando…</p>}
            {error && (
                <div role="alert">
                    <p>No se pudieron cargar los sismos.</p>
                    <button type="button" onClick={onReintentar}>
                        Reintentar
                    </button>
                </div>
            )}
            {!cargando && !error && <Estadisticas estadisticas={estadisticas} />}
        </aside>
    );
}
