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
      subtype: result.subtype,
      title: result.title,
      abstract: result.abstract,
      //thumbnail_url: result.thumbnail_url,
      //download_url: result.download_url
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
<section class="pagedetails">
	<h2 class="wb-inv">Page details</h2><div class="row"><div class="col-sm-8 col-md-9 col-lg-9">
				<div data-ajax-replace="/GCWeb/sites/feedback/ajax/report-problem-en.html" class="wb-init wb-data-ajax-replace-inited" id="wb-auto-4"><div class="row row-no-gutters">
	<div class="col-sm-9 col-md-6 col-lg-5">
		<details class="brdr-0">
			<summary class="btn btn-default text-center">Report a problem on this page</summary>
			<div class="well row">
				<div class="gc-rprt-prblm">
					<div class="gc-rprt-prblm-frm gc-rprt-prblm-tggl">
						<form action="https://wet-boew.github.io/sites/feedback/feedback-form-destination.html" id="gc-rprt-prblm-form" class="wb-postback" data-wb-postback="{
								&quot;success&quot;: &quot;.success-message&quot;,
								&quot;failure&quot;: &quot;.failure-message&quot;}" data-wb-jsonmanager="{
								&quot;name&quot;: &quot;rap&quot;,
								&quot;extractor&quot;: [
									{ &quot;interface&quot;: &quot;referer&quot;, &quot;path&quot;: &quot;externalReferer&quot; },
									{ &quot;selector&quot;: &quot;title&quot;, &quot;path&quot;: &quot;pageTitle&quot; },
									{ &quot;interface&quot;: &quot;locationHref&quot;, &quot;path&quot;: &quot;submissionPage&quot; },
									{ &quot;selector&quot;: &quot;html&quot;, &quot;attr&quot;: &quot;lang&quot;, &quot;path&quot;: &quot;lang&quot; },
									{ &quot;selector&quot;: &quot;meta[name=\&quot;dcterms.creator\&quot;]&quot;, &quot;attr&quot;: &quot;content&quot;, &quot;path&quot;: &quot;pageOwner&quot; },
									{ &quot;selector&quot;: &quot;meta[name=\&quot;dcterms.subject\&quot;]&quot;, &quot;attr&quot;: &quot;content&quot;, &quot;path&quot;: &quot;subject&quot; }
								]
							}">
							<div data-wb-json="{
								&quot;url&quot;: &quot;#[rap]&quot;,
								&quot;mapping&quot;: [
									{ &quot;selector&quot;: &quot;input&quot;, &quot;attr&quot;: &quot;name&quot;, &quot;value&quot;: &quot;/@id&quot; },
									{ &quot;selector&quot;: &quot;input&quot;, &quot;attr&quot;: &quot;value&quot;, &quot;value&quot;: &quot;/@value&quot; }
								]
							}">
								<template></template>
							</div>
							<fieldset>
								<legend>
									<span class="field-name">Please select all that apply:</span>
								</legend>
								<div class="checkbox">
									<label for="problem1">
										<input name="problem1" id="problem1" type="checkbox" value="Yes">A link, button or video is not working
									</label>
									<input name="problem1" type="hidden" value="">
								</div>
								<div class="checkbox">
									<label for="problem2">
										<input name="problem2" id="problem2" type="checkbox" value="Yes">It has a spelling mistake
									</label>
									<input name="problem2" type="hidden" value="">
								</div>
								<div class="checkbox">
									<label for="problem3">
										<input name="problem3" id="problem3" type="checkbox" value="Yes">Information is missing
									</label>
									<input name="problem3" type="hidden" value="">
								</div>
								<div class="checkbox">
									<label for="problem4">
										<input name="problem4" id="problem4" type="checkbox" value="Yes">Information is outdated or wrong
									</label>
									<input name="problem4" type="hidden" value="">
								</div>
								<div class="checkbox">
									<label for="problem5">
										<input name="problem5" id="problem5" type="checkbox" value="Yes">Login error when trying to access an account
									</label>
									<input name="problem5" type="hidden" value="">
								</div>
								<div class="checkbox">
									<label for="problem11">
										<input name="problem11" id="problem11" type="checkbox" value="Yes">I can't find what I'm looking for
									</label>
									<input name="problem11" type="hidden" value="">
								</div>
								<div class="checkbox">
									<label for="problem12">
										<input name="problem12" id="problem12" type="checkbox" value="Yes">Other issue not in this list
									</label>
									<input name="problem12" type="hidden" value="">
								</div>
							</fieldset>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
					<div class="success-message hide">
						<h3>Thank you for your help!</h3>
						<p>You will not receive a reply. For enquiries, please <a href="https://www.canada.ca/en/contact.html">contact us</a>.</p>
					</div>
					<p class="failure-message hide">Something went wrong. Please submit your information via an alternative method.</p>
				</div>
			</div>
		</details>
	</div>
</div></div>

			</div><div class="wb-share col-sm-4 col-md-3 wb-init wb-share-inited" data-wb-share="{&quot;lnkClass&quot;: &quot;btn btn-default btn-block&quot;}" id="wb-auto-5"><section id="shr-pg0" class="shr-pg mfp-hide modal-dialog modal-content overlay-def"><header class="modal-header"><h2 class="modal-title">Share this page</h2></header><div class="modal-body"><ul class="list-unstyled colcount-xs-2"><li><a href="https://www.blogger.com/blog_this.pyra?t=&amp;u=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html&amp;n=Search%20results%20-%20Canada.ca" class="shr-lnk blogger btn btn-default" rel="noreferrer noopener">Blogger</a></li><li><a href="https://www.diigo.com/post?url=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html&amp;title=Search%20results%20-%20Canada.ca" class="shr-lnk diigo btn btn-default" rel="noreferrer noopener">Diigo</a></li><li><a href="mailto:?to=&amp;subject=Search%20results%20-%20Canada.ca&amp;body=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html%0A" class="shr-lnk email btn btn-default" rel="noreferrer noopener">Email</a></li><li><a href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html&amp;t=Search%20results%20-%20Canada.ca" class="shr-lnk facebook btn btn-default" rel="noreferrer noopener">Facebook</a></li><li><a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=&amp;su=Search%20results%20-%20Canada.ca&amp;body=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html%0A" class="shr-lnk gmail btn btn-default" rel="noreferrer noopener">Gmail</a></li><li><a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html&amp;title=Search%20results%20-%20Canada.ca&amp;ro=false&amp;summary=&amp;source=" class="shr-lnk linkedin btn btn-default" rel="noreferrer noopener">LinkedIn®</a></li><li><a href="https://www.myspace.com/Modules/PostTo/Pages/?u=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html&amp;t=Search%20results%20-%20Canada.ca" class="shr-lnk myspace btn btn-default" rel="noreferrer noopener">MySpace</a></li><li><a href="https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html&amp;media=&amp;description=Search%20results%20-%20Canada.ca" class="shr-lnk pinterest btn btn-default" rel="noreferrer noopener">Pinterest</a></li><li><a href="https://reddit.com/submit?url=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html&amp;title=Search%20results%20-%20Canada.ca" class="shr-lnk reddit btn btn-default" rel="noreferrer noopener">reddit</a></li><li><a href="https://tinyurl.com/create.php?url=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html" class="shr-lnk tinyurl btn btn-default" rel="noreferrer noopener">TinyURL</a></li><li><a href="https://www.tumblr.com/share/link?url=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html&amp;name=Search%20results%20-%20Canada.ca&amp;description=" class="shr-lnk tumblr btn btn-default" rel="noreferrer noopener">tumblr</a></li><li><a href="https://twitter.com/intent/tweet?text=Search%20results%20-%20Canada.ca&amp;url=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html" class="shr-lnk twitter btn btn-default" rel="noreferrer noopener">Twitter</a></li><li><a href="https://api.whatsapp.com/send?text=Search%20results%20-%20Canada.ca%0A%0Ahttps%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html" class="shr-lnk whatsapp btn btn-default" rel="noreferrer noopener">Whatsapp</a></li><li><a href="https://compose.mail.yahoo.com/?to=&amp;subject=Search%20results%20-%20Canada.ca&amp;body=https%3A%2F%2Fwet-boew.github.io%2FGCWeb%2Ftemplates%2Fsearch%2Fresults-en.html%0A" class="shr-lnk yahoomail btn btn-default" rel="noreferrer noopener">Yahoo! Mail</a></li></ul><p class="col-sm-12 shr-dscl">No endorsement of any products or services is expressed or implied.</p><div class="clearfix"></div></div></section><a href="#" aria-controls="shr-pg0" class="shr-opn wb-lbx btn btn-default btn-block wb-lbx-inited wb-init" id="wb-auto-6"><span class="glyphicon glyphicon-share"></span>Share this page</a></div><div class="col-xs-12">
		</div>
	</div>
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js" integrity="sha384-rY/jv8mMhqDabXSo+UCggqKtdmBfd3qC2/KvyTDNQ6PcUJXaxK1tMepoQda4g5vB" crossorigin="anonymous"></script>
<script src="https://wet-boew.github.io/themes-dist/GCWeb/wet-boew/js/wet-boew.min.js"></script>
<script src="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/js/theme.min.js"></script>
</body></html>
  `
  return new Response(results_html, {
      headers: {
          'Content-type': 'text/html'
      }
  })
}
