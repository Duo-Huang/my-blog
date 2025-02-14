const cdnBaseUrl = 'https://jsd.012700.xyz';
const localCdnPathPattern = 'https://huangduo.me/mycdn';

async function cdnProxyMiddleware({ request, next }) {
    console.log(`[LOGGING FROM cdn-proxy-middleware] original request.url: ${request.url}`);
  
    if (request.url.startsWith(localCdnPathPattern)) {
        console.log(`[LOGGING FROM cdn-proxy-middleware] matched cdn request, url: ${request.url}`);
        const rewriteUrl = request.url.replace(localCdnPathPattern, cdnBaseUrl);
        const newRequest = new Request(rewriteUrl, {
            headers: {
            }
        });

        console.log(`[LOGGING FROM cdn-proxy-middleware] proxied request.url: ${newRequest.url}`);
    
        return fetch(newRequest);
    }
  
    return next();
}

export const onRequest = [cdnProxyMiddleware];
