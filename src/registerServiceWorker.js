const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const serviceWorkerUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Checking of service worker still exists
        checkValidServiceWorker(serviceWorkerUrl);
      } else {
        registerValidServiceWorker(serviceWorkerUrl);
      }
    });
  }
}
function registerValidServiceWorker(serviceWorkerUrl) {
  navigator.serviceWorker
    .register(serviceWorkerUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content available try refreshing');
            } else {
              console.log('Content is cached');
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Service worker registration error: ', error);
    });
}

function checkValidServiceWorker(serviceWorkerUrl) {
  fetch(serviceWorkerUrl)
    .then(response => {
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidServiceWorker(serviceWorkerUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet found'
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
