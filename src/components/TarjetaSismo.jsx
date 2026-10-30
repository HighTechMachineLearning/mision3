export default function TarjetaSismo({ sismo }) {
    const { lugar, magnitud, tiempo, profundidad, tsunami, url } = sismo;

    return (
        <article className="tarjeta">
            <h2>{lugar}</h2>
            <dl>
                <dt>Magnitud</dt>
                <dd>{magnitud}</dd>
                <dt>Fecha y hora</dt>
                <dd>{new Date(tiempo).toISOString()}</dd>
                <dt>Profundidad</dt>
                <dd>{profundidad} km</dd>
            </dl>
            {tsunami && <p>⚠ Aviso de tsunami</p>}
            <a href={url} target="_blank" rel="noreferrer">Ver en USGS</a>
        </article>
    );
}
