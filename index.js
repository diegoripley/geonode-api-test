addEventListener("fetch", event => {
  event.respondWith(handleRequest(event));
});


async function handleRequest(event) {
  // Cache
  let cache = caches.default;
  const request = event.request;
  const url = 'https://geonode.sisyphus.ca/api/v2/datasets?page_size=200'

  /*
  Cache
  */
  let response = await cache.match(url);
  if (!response) { 
    //console.log(`Response for url: ${url} not present in cache`);
    response = await fetch(url, {
      cf: {
        cacheEverything: true,
        cacheKey: url,
        apps: false
      }
    });
    // Put into cache if it doesn't exist
    event.waitUntil(cache.put(url, response.clone()))
  }
  const data = await response.json();
  const results = data.datasets.map(result => ({
      pk: result.pk,
      //subtype: result.subtype,
      title: result.title,
      //abstract: result.abstract,
      //thumbnail_url: result.thumbnail_url,
      //download_url: result.download_url
  }))
  //console.log(results);
  results_text = ''
  for (const index in results) {
      const title = results[index]['title']
      const pk = results[index]['pk']
      results_text+= `<li><a href="https://geonode.sisyphus.ca/catalogue/#/dataset/${pk}">${title}</a></li>`
  }
  results_html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <title>GeoNode Sisyphus Datasets</title>
  </head>
  <body>
      <h1>GeoNode Datasets</h1>
      <ol>
      ${results_text}
      </ol>
  </body>
  </html>
  `
  return new Response(results_html, {
      headers: {
          'Content-type': 'text/html'
      }
  })
}
