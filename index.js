addEventListener("fetch", event => {
  event.respondWith(handleRequest(event));
});


async function handleRequest(event) {
  // Cache
  let cache = caches.default;
  /*
  Cache
  */
  let response = await cache.match(URL);
  if (!response) { 
    console.log(`Response for url: ${URL} not present in cache`);
    response = await fetch(URL, {
      cf: {
        cacheEverything: true,
        cacheKey: URL
      }
    });
    // Put into cache if it doesn't exist
    event.waitUntil(cache.put(URL, response.clone()))
  }
  const data = await response.json();
  const results = data.datasets.map(result => ({
      pk: result.pk,
      subtype: result.subtype,
      title: result.title,
      abstract: result.abstract
  }))
  //console.log(results);
  results_text = ''
  for (const index in results) {
      const title = results[index]['title']
      const pk = results[index]['pk']
      const subtype = results[index]['subtype']
      const abstract = results[index]['abstract']
      results_text+= `
	<section>
		<h3><a href="https://geonode.sisyphus.ca/catalogue/#/dataset/${pk}">${title}</a></h3>
		<ul class="context-labels">
			<li>${subtype}</li>
		</ul>
        ${abstract}
	</section>
      `
  }
  results_html = `
  <!DOCTYPE html>
<html class="js backgroundsize borderimage csstransitions fontface svg details progressbar meter mathml cors xlargeview wb-enable" lang="en" dir="ltr"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW) wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html -->
<title>GeoNode Sisyphus Datasets</title>
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="description" content=" ">
<meta name="author" content=" ">
<meta name="dcterms.title" content="Search results">
<meta name="dcterms.description" content=" ">
<meta name="dcterms.creator" content=" ">
<meta name="dcterms.language" content="eng">
<meta name="dcterms.subject" content="">
<meta name="dcterms.issued" content="">
<link rel="apple-touch-icon" sizes="57x57 72x72 114x114 144x144 150x150" class="wb-favicon" href="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/favicon-mobile.png"><link href="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/favicon.ico" rel="icon" type="image/x-icon" class="wb-init wb-favicon-inited">
<link rel="stylesheet" href="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/css/theme.min.css">
<noscript><link rel="stylesheet" href="https://wet-boew.github.io/themes-dist/GCWeb/wet-boew/css/noscript.min.css" /></noscript>
</head>
<body class="page-type-search" vocab="http://schema.org/" typeof="WebPage"><nav>
	<ul id="wb-tphp" class="wb-init wb-disable-inited">
		<li class="wb-slc"><a class="wb-sl" href="https://wet-boew.github.io/GCWeb/templates/search/results-en.html#wb-cont">Skip to main content</a></li>
		<li class="wb-slc visible-sm visible-md visible-lg"><a class="wb-sl" href="https://wet-boew.github.io/GCWeb/templates/search/results-en.html#wb-info">Skip to About this site</a></li><li class="wb-slc"><a class="wb-sl" href="https://wet-boew.github.io/GCWeb/templates/search/results-en.html?wbdisable=true" rel="alternate">Switch to basic HTML version</a></li></ul>
</nav>
<header>
	<div id="wb-bnr" class="container">
		<div class="row">
				<section id="wb-lng" class="col-xs-3 col-sm-12 pull-right text-right">
	<h2 class="wb-inv">Language selection</h2>
	<ul class="list-inline mrgn-bttm-0">
		<li>
			<a lang="fr" hreflang="fr" href="#">
				<span class="hidden-xs" translate="no">Français</span>
				<abbr title="Français" translate="no" class="visible-xs h3 mrgn-tp-sm mrgn-bttm-0 text-uppercase">fr</abbr>
			</a>
		</li>
	</ul>
</section>
			<div class="brand col-xs-9 col-sm-5 col-md-4" property="publisher" typeof="GovernmentOrganization">
	<a href="https://wet-boew.github.io/GCWeb/" property="url">
		<img src="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/sig-blk-en.svg" alt="Government of Canada" property="logo"><span class="wb-inv"> / <span lang="fr">Gouvernement du Canada</span></span>
	</a>
	<meta property="name" content="Government of Canada">
	<meta property="areaServed" typeof="Country" content="Canada">
	<link property="logo" href="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/wmms-blk.svg">
</div>		
		</div>
	</div>
	<hr>
</header>
<main class="container" property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
<h1 id="wb-cont" property="name">GeoNode Sisyphus Datasets</h1>
<section class="results">
	<h2 class="wb-inv">Search results</h2>
    ${results_text}
</section>
</main>
<footer id="wb-info">
	<h2 class="wb-inv">About this site</h2>
	<div class="gc-main-footer">
		<div class="container">
			<nav>
				<h3>Government of Canada</h3>
				<ul class="list-col-xs-1 list-col-sm-2 list-col-md-3"><li><a href="https://www.canada.ca/en/contact.html">All contacts</a></li>
					<li><a href="https://www.canada.ca/en/government/dept.html">Departments and agencies</a></li>
					<li><a href="https://www.canada.ca/en/government/system.html">About government</a></li></ul>
				<h4><span class="wb-inv">Themes and topics</span></h4>
				<ul class="list-unstyled colcount-sm-2 colcount-md-3"><li><a href="https://www.canada.ca/en/services/jobs.html">Jobs</a></li>
					<li><a href="https://www.canada.ca/en/services/immigration-citizenship.html">Immigration and citizenship</a></li>
					<li><a href="https://travel.gc.ca/">Travel and tourism</a></li>
					<li><a href="https://www.canada.ca/en/services/business.html">Business</a></li>
					<li><a href="https://www.canada.ca/en/services/benefits.html">Benefits</a></li>
					<li><a href="https://www.canada.ca/en/services/health.html">Health</a></li>
					<li><a href="https://www.canada.ca/en/services/taxes.html">Taxes</a></li>
					<li><a href="https://www.canada.ca/en/services/environment.html">Environment and natural resources</a></li>
					<li><a href="https://www.canada.ca/en/services/defence.html">National security and defence</a></li>
					<li><a href="https://www.canada.ca/en/services/culture.html">Culture, history and sport</a></li>
					<li><a href="https://www.canada.ca/en/services/policing.html">Policing, justice and emergencies</a></li>
					<li><a href="https://www.canada.ca/en/services/transport.html">Transport and infrastructure</a></li>
					<li><a href="https://international.gc.ca/world-monde/index.aspx?lang=eng">Canada and the world</a></li>
					<li><a href="https://www.canada.ca/en/services/finance.html">Money and finance</a></li>
					<li><a href="https://www.canada.ca/en/services/science.html">Science and innovation</a></li>
					<li><a href="https://www.canada.ca/en/services/indigenous-peoples.html">Indigenous peoples</a></li>
					<li><a href="https://www.canada.ca/en/services/veterans-military.html">Veterans and military</a></li>
					<li><a href="https://www.canada.ca/en/services/youth.html">Youth</a></li></ul>
			</nav>
		</div>
	</div>
	<div class="gc-sub-footer">
		<div class="container d-flex align-items-center">
			<nav>
				<h3 class="wb-inv">Government of Canada Corporate</h3>
				<ul>
					<li><a href="https://www.canada.ca/en/social.html">Social media</a></li>
					<li><a href="https://www.canada.ca/en/mobile.html">Mobile applications</a></li>
					<li><a href="https://www.canada.ca/en/government/about.html">About Canada.ca</a></li><li><a href="https://www.canada.ca/en/transparency/terms.html">Terms and conditions</a></li>
					<li><a href="https://www.canada.ca/en/transparency/privacy.html">Privacy</a></li></ul>
			</nav>
			<div class="wtrmrk align-self-end">
				<img src="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/wmms-blk.svg" alt="Symbol of the Government of Canada">
			</div>
		</div>
	</div>
</footer>
</body></html>
  `
  return new Response(results_html, {
      headers: {
          'Content-type': 'text/html'
      }
  })
}
