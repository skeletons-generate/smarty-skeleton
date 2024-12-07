 

self.addEventListener('push', function(event) {

    event.waitUntil(self.registration.showNotification('Hello World!', {
        body: 'This is a notification message.',
        icon: 'https://example.com/icon.png'
    }));
});


// 拦截请求
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // 如果缓存中存在请求的响应，则直接返回缓存的响应
          if (cachedResponse) {
            console.log('Response from cache:', event.request.url);
            return cachedResponse;
          }
  
          // 如果缓存中不存在请求的响应，则继续向网络发出请求
          return fetch(event.request)
            .then(networkResponse => {
                console.error('Fetch:', networkResponse);
              // 将从网络获取到的响应添加到缓存中
              return caches.open('dynamic-cache')
                .then(cache => {
                  cache.put(event.request, networkResponse.clone());
                  return networkResponse;
                });
            })
            .catch(error => {
              console.error('Fetch error:', error);
              // 如果网络请求失败，可以返回一个自定义的响应
              return new Response('Network request failed!', {
                status: 500,
                statusText: 'Internal Server Error'
              });
            });
        })
    );
  });
 

