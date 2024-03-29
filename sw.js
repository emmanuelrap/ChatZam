//Importacion
importScripts("js/sw-utils.js");

const STATIC_CACHE = "static-v3";
const DYNAMIC_CACHE = "dinamic-v2";
const INMUTABLE_CACHE = "inmutable-v1";

//Lo que debe estar cargado de manera instantanea --------------
const APP_SHELL = [
  // '/',
  "index.html",
  "css/style.css",
  "img/favicon.ico",
  "img/avatars/hulk.jpg",
  "img/avatars/ironman.jpg",
  "img/avatars/spiderman.jpg",
  "img/avatars/thor.jpg",
  "img/avatars/wolverine.jpg",
  "img/avatars/drStrange.jpg",
  "img/avatars/moonligth.jpg",
  "img/avatars/blackpanter.jpg",
  "img/avatars/blackwidow.jpg",
  "img/avatars/capitanamarvel.jpg",
  "img/avatars/msmarvel.jpg",
  "img/avatars/moonligth.jpg",
  "img/avatars/womenarc.jpg",
  "img/avatars/capitanamerica.jpg",
  "img/avatars/girlwoman.jpg",
  "img/avatars/vision.jpg",
  "img/avatars/dr_octavio.jpg",
  "img/avatars/thorsister.jpg",
  "img/avatars/zeus.jpg",
  "img/avatars/hulk2.jpg",
  "img/avatars/new_captain.jpg",
  "img/avatars/agente.jpg",
  "img/avatars/pepper.jpg",
  "img/avatars/quick_silver.jpg",
  "img/avatars/locky2.jpg",
  "img/avatars/locky3.jpg",
  "img/avatars/agente2.jpg",
  "img/avatars/drax.jpg",
  "img/avatars/antman.jpg",
  "img/avatars/falcon.jpg",
  "img/avatars/starlord.jpg",
  "img/avatars/groot.jpg",
  "img/avatars/thanos.jpg",
  "img/avatars/rocket.jpg",
  "js/app.js",
  "js/sw-utils.js",
];

const APP_SHELL_INMUTABLE = [
  "https://fonts.googleapis.com/css?family=Quicksand:300,400",
  "https://fonts.googleapis.com/css?family=Lato:400,300",
  // 'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
  "css/animate.css",
  "js/libs/jquery.js",
];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  const cacheInmutable = caches
    .open(INMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

  //self.skipWaiting();

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

//Borrar Caches Diferentes al Actual --------------------------
self.addEventListener("activate", (e) => {
  const respuesta = caches.keys().then((keys) => {
    //barrida de keys para eliminar los que son diferentes al actual cache_static_name
    keys.forEach((key) => {
      if (key !== STATIC_CACHE && key.includes("static")) {
        return caches.delete(key);
      }

      if (key !== DYNAMIC_CACHE && key.includes("dynamic")) {
        return caches.delete(key);
      }
    });
  });

  e.waitUntil(respuesta);
});

//Cache with Network FallBack (busca en el cache, si no esta, hace el FETCH)
self.addEventListener("fetch", (e) => {
  const respuesta = caches.match(e.request).then((res) => {
    if (res) return res;
    else
      return fetch(e.request).then((newRes) => {
        return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
      });
  });
  e.respondWith(respuesta);
});
