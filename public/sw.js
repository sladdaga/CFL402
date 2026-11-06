// Service worker del CFL 402.
// - Navegación y archivos fijos: red primero (con tiempo límite) y respaldo en caché.
// - Archivos con hash de /assets/: caché primero, con tope de entradas.
// Al cambiar la lógica, subir VERSION para invalidar las cachés anteriores.
// --- Constantes ---
// VERSION forma parte del nombre de las cachés; al cambiarla se borran las viejas (ver "activate").
const VERSION = 'v2'
// SHELL: caché de la página y archivos fijos (index, manifiesto, íconos).
const SHELL = `cfl402-shell-${VERSION}`
// ASSETS: caché de los archivos de /assets/ (JS, CSS e imágenes con hash en el nombre).
const ASSETS = `cfl402-assets-${VERSION}`
// Máximo de archivos guardados en la caché ASSETS (ver recortar).
const MAX_ASSETS = 80
// Milisegundos de espera a la red antes de usar la copia guardada.
const TIMEOUT_MS = 4000
const BASE = self.registration.scope // funciona también si el sitio está en una subcarpeta

// --- install: se ejecuta al instalarse una versión nueva del service worker ---
// Guarda por adelantado la página principal, la de emergencias (con su logo) y el manifiesto para que abran sin conexión
// desde la primera visita: los teléfonos de emergencia tienen que poder consultarse aunque no haya internet.
// Cada archivo se guarda por separado y si uno falla (por ejemplo, no existe) los demás igual se guardan;
// con addAll, un solo error cancelaría toda la instalación.
// skipWaiting() hace que esta versión se active enseguida, sin esperar a cerrar las pestañas.
const PRECACHE = ['', 'emergencias.html', 'logo-cfl402.png', 'icon-192.png', 'manifest.webmanifest']

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SHELL).then((c) => Promise.allSettled(PRECACHE.map((ruta) => c.add(`${BASE}${ruta}`)))),
  )
  self.skipWaiting()
})

// --- activate: se ejecuta cuando esta versión toma el control ---
// Borra todas las cachés que no sean las de la versión actual y, con clients.claim(), controla las pestañas ya abiertas.
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== SHELL && k !== ASSETS).map((k) => caches.delete(k)))),
  )
  self.clients.claim()
})

// Pide el recurso a la red, pero lo rechaza si tarda más de TIMEOUT_MS (así se pasa al respaldo en caché).
function redConLimite(req) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS)
    fetch(req).then(
      (res) => { clearTimeout(t); resolve(res) },
      (err) => { clearTimeout(t); reject(err) },
    )
  })
}

// Solo se guardan respuestas correctas (ok) y del mismo sitio (type "basic"); se evitan errores y recursos de terceros.
const guardable = (res) => res && res.ok && res.type === 'basic'

// Mantiene la caché con un tope: borra las entradas más antiguas (las primeras de la lista) y deja las últimas MAX_ASSETS.
async function recortar(cache) {
  const claves = await cache.keys()
  await Promise.all(claves.slice(0, Math.max(0, claves.length - MAX_ASSETS)).map((k) => cache.delete(k)))
}

// Estrategia "red primero": para la página y archivos fijos. Intenta la red (con límite de tiempo) y guarda una copia fresca;
// si falla (sin conexión o lento), usa la copia guardada, o la página principal, o un error de red como último recurso.
async function redPrimero(req) {
  try {
    const res = await redConLimite(req)
    if (guardable(res)) {
      const copia = res.clone()
      caches.open(SHELL).then((c) => c.put(req, copia))
    }
    return res
  } catch (err) {
    const guardada = await caches.match(req)
    return guardada || (await caches.match(BASE)) || Response.error()
  }
}

// Estrategia "caché primero": para /assets/. Esos archivos llevan un hash en el nombre (cambia si cambia el contenido);
// si ya están guardados se devuelven directo y si no, se piden a la red, se guardan y se recorta la caché.
async function cachePrimero(req) {
  const guardada = await caches.match(req)
  if (guardada) return guardada
  const res = await fetch(req)
  if (guardable(res)) {
    const copia = res.clone()
    caches.open(ASSETS).then(async (c) => { await c.put(req, copia); await recortar(c) })
  }
  return res
}

// --- fetch: intercepta cada pedido de la página ---
// Solo maneja pedidos GET del mismo origen; el resto (otros sitios como el mapa, POST, etc.) sigue su camino normal.
// Si la ruta empieza con <base>assets/ usa caché primero; para todo lo demás, red primero.
self.addEventListener('fetch', (e) => {
  const req = e.request
  const url = new URL(req.url)
  if (req.method !== 'GET' || url.origin !== location.origin) return
  const esAsset = url.pathname.startsWith(new URL(BASE).pathname + 'assets/')
  e.respondWith(esAsset ? cachePrimero(req) : redPrimero(req))
})
