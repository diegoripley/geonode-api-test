# geonode-api-test
This Cloudflare worker fetches datasets via the GeoNode dataset API and renders the results with the [GCWeb theme](https://wet-boew.github.io/GCWeb/index-en.html).

Rename `wrangler.toml.example` to `wrangler.toml`, modify the values in `wrangler.toml`, and set the API url secret (`wrangler secret put URL https://yoururl/api/v2/datasets?page_size=200`)

# Demo

The demo may take 10-15 seconds while it fetches the API json data. 

https://geonode-api-test.sisyphus.ca/

![preview](https://user-images.githubusercontent.com/6893641/236891822-0fe2f0d2-f535-47b3-b133-715ec8e28df5.jpg)


