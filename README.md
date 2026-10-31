# Sismo Radar

Aplicación web que muestra los terremotos recientes del mundo (M2.5+) a partir de los feeds públicos del USGS, con estadísticas, filtros y ordenación en el cliente. Los muestra en un globo terráqueo con imágenes de satélite, usando la librería `maplibre-gl` en react con `@vis.gl/react-maplibre`, y la fuente de mapas de la API ArcGIS de `server.arcgisonline.com`.


## Uso de IA

Todo el código ha sido generado por IA: Claude, modelo Sonnet 5.5 con esfuerzo medio. El prompt original incluía:
- La tarea y la rúbrica.
- Una lista de buenas prácticas a seguir, tanto de HTML-CSS-JS como de React, cogidas de la teoría.
- Una explicación de cómo hacerlo.
- Una descripción de cómo quería que quedase la aplicación

Así es cómo le pedí a la IA que trabaje:

>1. Diseño: diseñar la aplicación y su funcionalidad
>2. Arquitectura: definir cómo será la implementación, con prototipos y pseudo-código
>3. Planificación: no se va a implementar todo de golpe, así que hay que dividir la implementación en pasos. Cada uno será un commit.
>4. Implementación: escribir el código.
>
>Debes hacer los pasos uno a uno, para que yo pueda validar lo que has hecho, corregir cosas, pedir cambios, etc, antes de pasar al siguiente. Igual para...

Y la descripción de la aplicación era de este estilo

>La app, Sismo Radar, tendrá un panel lateral a la derecha con título, filtros, y estadísticas. El resto de la pantalla tendrá un globo terráqueo con un marcador por cada sismo.
Los filtros serán periodo...

## Autopsia

### 1. Un marcador DOM por sismo (`<Marker>`) en lugar de una capa del mapa

**Qué se hizo.** Cada sismo es un componente `MarcadorSismo` que renderiza un `<Marker>` con un `<button>` circular. Se pinta con `sismos.map(...)` y `key={sismo.id}`.

**Por qué.** El tamaño en píxeles es constante al hacer zoom sin configuración extra, los marcadores son botones accesibles (con `aria-label`), el click se maneja con eventos de React, y el color y el tamaño reutilizan las mismas funciones puras (`nivelDeMagnitud`, `tamanoMarcador`) que el resto de la app.

**Coste asumido.** Con el periodo de 30 días sin filtros hay unos 2000 elementos DOM que el mapa reposiciona al moverse. Se nota una ligera bajada de fps, pero va bien, se nota poco.

**Alternativas descartadas.**
- *Capa `circle` del mapa* (GeoJSON con `circle-radius` y `circle-color` según expresiones de MapLibre). Escala mucho mejor porque la dibuja la GPU. Se descartó porque obliga a duplicar la lógica de nivel y tamaño como expresiones del mapa, a recuperar el sismo a partir de la feature pulsada, y a perder los componentes con `key` y los botones accesibles. Se haría si el rendimiento llegara a ser un problema.
- *Agrupar marcadores.* Demasiado complejo, un marcador por sismo es más sencillo y funciona bien.

### 2. Guardar solo el id del sismo seleccionado

**Qué se hizo.** El estado es `idSeleccionado`, y el sismo seleccionado se calcula en cada render buscándolo en `sismosFiltrados`.

**Por qué.** El estado está en un solo sitio. Si un filtro o un cambio de periodo excluye el sismo, el popup desaparece sin código adicional, y nunca se muestra una copia obsoleta de los datos.

**Coste asumido.** Como el id sigue guardado, si un filtro excluye el sismo y después otro filtro lo vuelve a incluir, el popup reaparece. Es consecuencia directa del diseño y no se ha tratado como un fallo.

**Alternativas descartadas.**
- *Guardar el objeto completo del sismo.* El código del popup sería ligeramente más directo, pero duplicaría estado: el popup seguiría abierto aunque los filtros excluyan el sismo, y mostraría una copia que no se corresponde con los datos actuales.
- *Guardar el id y limpiarlo con un `useEffect` cuando el sismo desaparece.* Eliminaría la reaparición, pero es un efecto que solo sincroniza un estado con otro, justo el uso que React desaconseja. La otra variante, limpiar el id desde los manejadores de los filtros, acoplaría `Filtros` con la selección.
