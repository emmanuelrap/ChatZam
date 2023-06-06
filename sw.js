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
  "img/avatars/1.png",
  "img/avatars/2.png",
  "img/avatars/3.png",
  "img/avatars/4.png",
  "img/avatars/5.png",
  "img/avatars/6.png",
  "img/avatars/7.png",
  "img/avatars/8.png",
  "img/avatars/9.png",
  "img/avatars/10.png",
  "img/avatars/11.png",
  "img/avatars/12.png",
  "img/avatars/13.png",
  "img/avatars/14.png",
  "img/avatars/15.png",
  "img/avatars/16.png",
  "img/avatars/17.png",
  "img/avatars/18.png",
  "img/avatars/19.png",
  "img/avatars/20.png",
  "img/avatars/21.png",
  "img/avatars/22.png",
  "img/avatars/23.png",
  "img/avatars/24.png",
  "img/avatars/25.png",
  "img/avatars/starlord.jpg",
  "img/avatars/27.png",
  "img/avatars/28.png",
  "img/avatars/29.png",
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
