// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const staticCacheName = 'neighborhood-map-v1';

export function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      console.log(`The public URL: ${swUrl}`);

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      }
    });
    
    // Note that this won't currently do anything, but the React setup for customizing your service worker
    // is a bit involved. See here for some details: https://stackoverflow.com/a/47683539
    window.addEventListener('fetch', (event) => {
      console.log('fetching event here!');
      event.respondWith(
          caches.match(event.request)
              .then((response) => {
                  // If we have it in the cache then return it
                  if (response) {
                      return response;
                  }
  
  
                  // Below is mostly from: 
                  // https://developers.google.com/web/fundamentals/primers/service-workers/#cache_and_return_requests
                  // This will allowing caching of fetched requests that our review page is making. For example,
                  // map tiles, css, etc.
  
                  // IMPORTANT: Clone the request. A request is a stream and
                  // can only be consumed once. Since we are consuming this
                  // once by cache and once by the browser for fetch, we need
                  // to clone the response.
                  let fetchRequestClone = event.request.clone();
  
                  return fetch(fetchRequestClone).then(
                      (response) => {
                          // Check if we received a valid response
                          if (!response || response.status !== 200 || response.type !== 'basic') {
                              return response;
                          }
  
                          // IMPORTANT: Clone the response. A response is a stream
                          // and because we want the browser to consume the response
                          // as well as the cache consuming the response, we need
                          // to clone it so we have two streams.
                          let responseToCache = response.clone();
  
                          caches.open(staticCacheName)
                              .then((cache) => {
                                  cache.put(event.request, responseToCache);
                              });
  
                          return response;
                      }
                  );
              })
              .catch((err) => {
                  console.log('Fetch failed. Error: ' + err);
              })
      );
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              console.log('New content is available; please refresh.');
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
