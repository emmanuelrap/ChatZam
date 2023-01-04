
// Guardar el Cache Dinamico
function actualizaCacheDinamico (dynamicCache, req, res){

    if (res.ok) {
        return caches.open ( dynamicCache ).then ( cache => {
            cache.put (req, res.clone());
            //Limpiar cache aqui <<<<
            return res.clone();
        });

    } else {
        return res ;
    }

}