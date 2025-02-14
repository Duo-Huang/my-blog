export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  console.log("Request URL:", request.url);

  // 如果请求目标是特定外部域名，去掉 Referer 头
  if (url.hostname === "jsd.012700.xyz") { // 替换为你需要处理的域名
    const newRequest = new Request(request, {
      headers: {
        ...Object.fromEntries(request.headers),
        Referer: undefined, // 移除 Referer
      }
    });

    return fetch(newRequest);
  }

  // 其他请求正常处理
  return next();
}