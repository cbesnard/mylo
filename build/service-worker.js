"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","79a6eb08be2716f6aaada274698bb209"],["static/css/main.1950c98e.css","79df7e076d881bfac2abe4f369371944"],["static/js/main.21d109f2.js","689519af3c151ebc6fe0dfda75fdab98"],["static/media/Roboto-Black.2a82f89b.eot","2a82f89b0a35ee7f9d45ec2ec862f7b2"],["static/media/Roboto-Black.2b8d6922.woff2","2b8d6922c2c9957356bc50f475de4e79"],["static/media/Roboto-Black.44236ad5.ttf","44236ad507eddcbfd986333f38bd13d5"],["static/media/Roboto-Black.4c3b6229.woff","4c3b6229efe63a13dbb4c3c32e292e61"],["static/media/Roboto-Black.ab04c761.svg","ab04c7611d94b690aee3c08a18ae8748"],["static/media/Roboto-BlackItalic.1f37c754.svg","1f37c7545ae9f63d2279f99875678396"],["static/media/Roboto-BlackItalic.38d14dd4.woff2","38d14dd4ff163c34e45b9701668652d4"],["static/media/Roboto-BlackItalic.3a99796b.woff","3a99796b2d8592471fcf278df4334d5d"],["static/media/Roboto-BlackItalic.4b7407c6.eot","4b7407c6740b8294d97a7bf88995c44d"],["static/media/Roboto-BlackItalic.ad0f284c.ttf","ad0f284c7113fd0aaf39b0e59b6afb09"],["static/media/Roboto-Bold.56a76a22.ttf","56a76a220d9c9765946d0802d4d661c4"],["static/media/Roboto-Bold.ab96cca2.woff2","ab96cca26751239828b8e9c524cca5bb"],["static/media/Roboto-Bold.ad140ff0.woff","ad140ff02a7091257e2b31619106194e"],["static/media/Roboto-Bold.c7f4667b.svg","c7f4667b59b9bc95130e697009d3829c"],["static/media/Roboto-Bold.c8bcb1cb.eot","c8bcb1cb78f9e45e2bcbf626bae19f0b"],["static/media/Roboto-BoldItalic.355e3887.woff2","355e388740673054493ce5fe32e37596"],["static/media/Roboto-BoldItalic.4b2cc52b.eot","4b2cc52b05e2a960c4f11f15490d8a47"],["static/media/Roboto-BoldItalic.a7dce23c.woff","a7dce23c0dd99a4afa5cdb4925f0358a"],["static/media/Roboto-BoldItalic.c2e0f75d.svg","c2e0f75da3677f645034d61c0445c9ba"],["static/media/Roboto-BoldItalic.d23d5bda.ttf","d23d5bdadc495f12ef69192243e95e4d"],["static/media/Roboto-Light.054fa50b.svg","054fa50baa6598a7bf0c6deec135d3a4"],["static/media/Roboto-Light.18307918.eot","183079184d96a491f16e3cc70414975d"],["static/media/Roboto-Light.37fbbbad.woff","37fbbbad5577a95bdf058307c717c882"],["static/media/Roboto-Light.8e0860f3.woff2","8e0860f3581b197e9fa4713a706c7bcc"],["static/media/Roboto-Light.a2b8c641.ttf","a2b8c641546c0e5a95e22e5a262f0357"],["static/media/Roboto-LightItalic.056caeab.ttf","056caeabe95749fe2b973bb9a0cd0776"],["static/media/Roboto-LightItalic.1a9e39e5.svg","1a9e39e536aed26b863b243e68f97e3a"],["static/media/Roboto-LightItalic.879d940b.woff2","879d940bccbb25f6096ec4361154d469"],["static/media/Roboto-LightItalic.c7b4e746.woff","c7b4e746cf8ecbf412fc944146154d24"],["static/media/Roboto-LightItalic.cdd1c486.eot","cdd1c486770034a6122e28a1aa165373"],["static/media/Roboto-Medium.2741a14e.woff2","2741a14e49524efa6059c735010239d0"],["static/media/Roboto-Medium.2b4f394c.svg","2b4f394ce87ea4e7a68bd9d0cbba7c16"],["static/media/Roboto-Medium.303ded64.woff","303ded6436dcf7ea75157e2aeff876ce"],["static/media/Roboto-Medium.76cad5ba.eot","76cad5ba6b8a38a77fe037807d2bc8e5"],["static/media/Roboto-Medium.c54f2a3e.ttf","c54f2a3ee42d2a58d82f1da293995d20"],["static/media/Roboto-MediumItalic.7a49ce79.eot","7a49ce79b6089d4d37bf47225c7e5e32"],["static/media/Roboto-MediumItalic.da059a73.woff","da059a7386fea889c55cce11253df175"],["static/media/Roboto-MediumItalic.eb65fb18.svg","eb65fb18d4446e4ac27d6e27c25fc224"],["static/media/Roboto-MediumItalic.f10d1f42.woff2","f10d1f42838680a70ac2b66e62887106"],["static/media/Roboto-MediumItalic.fa183350.ttf","fa183350bf6b814ae5523c8d49de7c73"],["static/media/Roboto-Regular.081b11eb.woff","081b11ebaca8ad30fd092e01451015dc"],["static/media/Roboto-Regular.6a561d68.eot","6a561d68369fd1fb9768cbc8641e5d95"],["static/media/Roboto-Regular.766c8926.svg","766c8926f6d9061fef24cd7269a341d0"],["static/media/Roboto-Regular.99b14f0d.ttf","99b14f0da0591e0d71678dc163eaff8b"],["static/media/Roboto-Regular.b2a6341a.woff2","b2a6341ae7440130ec4b4b186aff8413"],["static/media/Roboto-RegularItalic.527502d7.svg","527502d7927a41ca0b6a194f9cb34656"],["static/media/Roboto-RegularItalic.8add1ba3.woff","8add1ba317c27e39b7781c95fa174671"],["static/media/Roboto-RegularItalic.90dbf902.ttf","90dbf902b8d0592e1beb7c8829bcc1cb"],["static/media/Roboto-RegularItalic.df8e3a9b.woff2","df8e3a9b9aed943417973988732b928f"],["static/media/Roboto-RegularItalic.f3660f49.eot","f3660f493ea5e520648477d2b273db32"],["static/media/Roboto-Thin.790ebf41.woff2","790ebf41d0214f5eda4ef61263ed75f8"],["static/media/Roboto-Thin.90d3804f.woff","90d3804f0231704c15ccc5861245e8ce"],["static/media/Roboto-Thin.ba422f71.svg","ba422f71e799f3d29cbf99e6abded2bd"],["static/media/Roboto-Thin.c25fd8d0.eot","c25fd8d00fd9f570545d6240f6ec459a"],["static/media/Roboto-Thin.cc85ce37.ttf","cc85ce37b4256966e6f3a3559239c5c0"],["static/media/Roboto-ThinItalic.11b5cc95.ttf","11b5cc9584f2c007a22966a031ead20e"],["static/media/Roboto-ThinItalic.21e9a2e5.svg","21e9a2e5ed0b0d8d1bb7fd1e1f71104d"],["static/media/Roboto-ThinItalic.58829329.woff","588293290e86dad97fcf33ed1719c083"],["static/media/Roboto-ThinItalic.64ca718f.eot","64ca718f48db91b27e8c134ad25d0066"],["static/media/Roboto-ThinItalic.8a2c1a5d.woff2","8a2c1a5de09de8bb2c45390a10f90c2b"],["static/media/login.bf7bca90.png","bf7bca90dd8e0709c10211ef10d47ae8"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,o){var r=new URL(e);return o&&r.pathname.match(o)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],o=new URL(t,self.location),r=createCacheKey(o,hashParamName,n,/\.\w{8}\./);return[o.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var o=new Request(n,{credentials:"same-origin"});return fetch(o).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);t=urlsToCacheKeys.has(n);t||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(n=new URL("/index.html",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,o){function r(c,i){if(!n[c]){if(!t[c]){var s="function"==typeof require&&require;if(!i&&s)return s(c,!0);if(a)return a(c,!0);var f=new Error("Cannot find module '"+c+"'");throw f.code="MODULE_NOT_FOUND",f}var u=n[c]={exports:{}};t[c][0].call(u.exports,function(e){var n=t[c][1][e];return r(n||e)},u,u.exports,e,t,n,o)}return n[c].exports}for(var a="function"==typeof require&&require,c=0;c<o.length;c++)r(o[c]);return r}({1:[function(e,t,n){function o(e,t){t=t||{},(t.debug||b.debug)&&console.log("[sw-toolbox] "+e)}function r(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||b.cache.name,caches.open(t)}function a(e,t){t=t||{};var n=t.successResponses||b.successResponses;return fetch(e.clone()).then(function(o){return"GET"===e.method&&n.test(o.status)&&r(t).then(function(n){n.put(e,o).then(function(){var o=t.cache||b.cache;(o.maxEntries||o.maxAgeSeconds)&&o.name&&c(e,n,o)})}),o.clone()})}function c(e,t,n){var o=i.bind(null,e,t,n);p=p?p.then(o):o()}function i(e,t,n){var r=e.url,a=n.maxAgeSeconds,c=n.maxEntries,i=n.name,s=Date.now();return o("Updating LRU order for "+r+". Max entries is "+c+", max age is "+a),m.getDb(i).then(function(e){return m.setTimestampForUrl(e,r,s)}).then(function(e){return m.expireEntries(e,c,a,s)}).then(function(e){o("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){o("Done with cache cleanup.")})}).catch(function(e){o(e)})}function s(e,t,n){return o("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],o=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return o.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function f(e,t){return r(t).then(function(t){return t.add(e)})}function u(e,t){return r(t).then(function(t){return t.delete(e)})}function d(e){e instanceof Promise||h(e),b.preCacheItems=b.preCacheItems.concat(e)}function h(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var o=e.headers.get("date");if(o){if(new Date(o).getTime()+1e3*t<n)return!1}}return!0}var p,b=e("./options"),m=e("./idb-cache-expiration");t.exports={debug:o,fetchAndCache:a,openCache:r,renameCache:s,cache:f,uncache:u,precache:d,validatePrecacheInput:h,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){function o(e){return new Promise(function(t,n){var o=indexedDB.open(f+e,u);o.onupgradeneeded=function(){o.result.createObjectStore(d,{keyPath:h}).createIndex(l,l,{unique:!1})},o.onsuccess=function(){t(o.result)},o.onerror=function(){n(o.error)}})}function r(e){return e in p||(p[e]=o(e)),p[e]}function a(e,t,n){return new Promise(function(o,r){var a=e.transaction(d,"readwrite");a.objectStore(d).put({url:t,timestamp:n}),a.oncomplete=function(){o(e)},a.onabort=function(){r(a.error)}})}function c(e,t,n){return t?new Promise(function(o,r){var a=1e3*t,c=[],i=e.transaction(d,"readwrite"),s=i.objectStore(d);s.index(l).openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-a>t.value[l]){var o=t.value[h];c.push(o),s.delete(o),t.continue()}},i.oncomplete=function(){o(c)},i.onabort=r}):Promise.resolve([])}function i(e,t){return t?new Promise(function(n,o){var r=[],a=e.transaction(d,"readwrite"),c=a.objectStore(d),i=c.index(l),s=i.count();i.count().onsuccess=function(){var e=s.result;e>t&&(i.openCursor().onsuccess=function(n){var o=n.target.result;if(o){var a=o.value[h];r.push(a),c.delete(a),e-r.length>t&&o.continue()}})},a.oncomplete=function(){n(r)},a.onabort=o}):Promise.resolve([])}function s(e,t,n,o){return c(e,n,o).then(function(n){return i(e,t).then(function(e){return n.concat(e)})})}var f="sw-toolbox-",u=1,d="store",h="url",l="timestamp",p={};t.exports={getDb:r,setTimestampForUrl:a,expireEntries:s}},{}],3:[function(e,t,n){function o(e){var t=s.match(e.request);t?e.respondWith(t(e.request)):s.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(s.default(e.request))}function r(e){i.debug("activate event fired");var t=f.cache.name+"$$$inactive$$$";e.waitUntil(i.renameCache(t,f.cache.name))}function a(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=f.cache.name+"$$$inactive$$$";i.debug("install event fired"),i.debug("creating cache ["+t+"]"),e.waitUntil(i.openCache({cache:{name:t}}).then(function(e){return Promise.all(f.preCacheItems).then(a).then(i.validatePrecacheInput).then(function(t){return i.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var i=e("./helpers"),s=e("./router"),f=e("./options");t.exports={fetchListener:o,activateListener:r,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){var o;o=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+o+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){var o=new URL("./",self.location),r=o.pathname,a=e("path-to-regexp"),c=function(e,t,n,o){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=r+t),this.keys=[],this.regexp=a(t,this.keys)),this.method=e,this.options=o,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,o){t[e.name]=n[o+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){function o(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var r=e("./route"),a=e("./helpers"),c=function(e,t){for(var n=e.entries(),o=n.next(),r=[];!o.done;){new RegExp(o.value[0]).test(t)&&r.push(o.value[1]),o=n.next()}return r},i=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){i.prototype[e]=function(t,n,o){return this.add(e,t,n,o)}}),i.prototype.add=function(e,t,n,c){c=c||{};var i;t instanceof RegExp?i=RegExp:(i=c.origin||self.location.origin,i=i instanceof RegExp?i.source:o(i)),e=e.toLowerCase();var s=new r(e,t,n,c);this.routes.has(i)||this.routes.set(i,new Map);var f=this.routes.get(i);f.has(e)||f.set(e,new Map);var u=f.get(e),d=s.regexp||s.fullUrlRegExp;u.has(d.source)&&a.debug('"'+t+'" resolves to same regex as existing route.'),u.set(d.source,s)},i.prototype.matchMethod=function(e,t){var n=new URL(t),o=n.origin,r=n.pathname;return this._match(e,c(this.routes,o),r)||this._match(e,[this.routes.get(RegExp)],t)},i.prototype._match=function(e,t,n){if(0===t.length)return null;for(var o=0;o<t.length;o++){var r=t[o],a=r&&r.get(e.toLowerCase());if(a){var i=c(a,n);if(i.length>0)return i[0].makeHandler(n)}}return null},i.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new i},{"./helpers":1,"./route":5}],7:[function(e,t,n){function o(e,t,n){return n=n||{},a.debug("Strategy: cache first ["+e.url+"]",n),a.openCache(n).then(function(t){return t.match(e).then(function(t){var o=n.cache||r.cache,c=Date.now();return a.isResponseFresh(t,o.maxAgeSeconds,c)?t:a.fetchAndCache(e,n)})})}var r=e("../options"),a=e("../helpers");t.exports=o},{"../helpers":1,"../options":4}],8:[function(e,t,n){function o(e,t,n){return n=n||{},a.debug("Strategy: cache only ["+e.url+"]",n),a.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||r.cache,o=Date.now();if(a.isResponseFresh(e,t.maxAgeSeconds,o))return e})})}var r=e("../options"),a=e("../helpers");t.exports=o},{"../helpers":1,"../options":4}],9:[function(e,t,n){function o(e,t,n){return r.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(o,c){var i=!1,s=[],f=function(e){s.push(e.toString()),i?c(new Error('Both cache and network failed: "'+s.join('", "')+'"')):i=!0},u=function(e){e instanceof Response?o(e):f("No result returned")};r.fetchAndCache(e.clone(),n).then(u,f),a(e,t,n).then(u,f)})}var r=e("../helpers"),a=e("./cacheOnly");t.exports=o},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){function o(e,t,n){n=n||{};var o=n.successResponses||r.successResponses,c=n.networkTimeoutSeconds||r.networkTimeoutSeconds;return a.debug("Strategy: network first ["+e.url+"]",n),a.openCache(n).then(function(t){var i,s,f=[];if(c){var u=new Promise(function(o){i=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||r.cache,c=Date.now(),i=t.maxAgeSeconds;a.isResponseFresh(e,i,c)&&o(e)})},1e3*c)});f.push(u)}var d=a.fetchAndCache(e,n).then(function(e){if(i&&clearTimeout(i),o.test(e.status))return e;throw a.debug("Response was an HTTP error: "+e.statusText,n),s=e,new Error("Bad response")}).catch(function(o){return a.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(s)return s;throw o})});return f.push(d),Promise.race(f)})}var r=e("../options"),a=e("../helpers");t.exports=o},{"../helpers":1,"../options":4}],12:[function(e,t,n){function o(e,t,n){return r.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var r=e("../helpers");t.exports=o},{"../helpers":1}],13:[function(e,t,n){var o=e("./options"),r=e("./router"),a=e("./helpers"),c=e("./strategies"),i=e("./listeners");a.debug("Service Worker Toolbox is loading"),self.addEventListener("install",i.installListener),self.addEventListener("activate",i.activateListener),self.addEventListener("fetch",i.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:r,options:o,cache:a.cache,uncache:a.uncache,precache:a.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function o(e,t){for(var n,o=[],r=0,a=0,c="",i=t&&t.delimiter||"/";null!=(n=v.exec(e));){var u=n[0],d=n[1],h=n.index;if(c+=e.slice(a,h),a=h+u.length,d)c+=d[1];else{var l=e[a],p=n[2],b=n[3],m=n[4],g=n[5],w=n[6],R=n[7];c&&(o.push(c),c="");var x=null!=p&&null!=l&&l!==p,y="+"===w||"*"===w,E="?"===w||"*"===w,k=n[2]||i,I=m||g;o.push({name:b||r++,prefix:p||"",delimiter:k,optional:E,repeat:y,partial:x,asterisk:!!R,pattern:I?f(I):R?".*":"[^"+s(k)+"]+?"})}}return a<e.length&&(c+=e.substr(a)),c&&o.push(c),o}function r(e,t){return i(o(e,t))}function a(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function i(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,o){for(var r="",i=n||{},s=o||{},f=s.pretty?a:encodeURIComponent,u=0;u<e.length;u++){var d=e[u];if("string"!=typeof d){var h,l=i[d.name];if(null==l){if(d.optional){d.partial&&(r+=d.prefix);continue}throw new TypeError('Expected "'+d.name+'" to be defined')}if(g(l)){if(!d.repeat)throw new TypeError('Expected "'+d.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(d.optional)continue;throw new TypeError('Expected "'+d.name+'" to not be empty')}for(var p=0;p<l.length;p++){if(h=f(l[p]),!t[u].test(h))throw new TypeError('Expected all "'+d.name+'" to match "'+d.pattern+'", but received `'+JSON.stringify(h)+"`");r+=(0===p?d.prefix:d.delimiter)+h}}else{if(h=d.asterisk?c(l):f(l),!t[u].test(h))throw new TypeError('Expected "'+d.name+'" to match "'+d.pattern+'", but received "'+h+'"');r+=d.prefix+h}}else r+=d}return r}}function s(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function f(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function u(e,t){return e.keys=t,e}function d(e){return e.sensitive?"":"i"}function h(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var o=0;o<n.length;o++)t.push({name:o,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return u(e,t)}function l(e,t,n){for(var o=[],r=0;r<e.length;r++)o.push(m(e[r],t,n).source);return u(new RegExp("(?:"+o.join("|")+")",d(n)),t)}function p(e,t,n){return b(o(e,n),t,n)}function b(e,t,n){g(t)||(n=t||n,t=[]),n=n||{};for(var o=n.strict,r=!1!==n.end,a="",c=0;c<e.length;c++){var i=e[c];if("string"==typeof i)a+=s(i);else{var f=s(i.prefix),h="(?:"+i.pattern+")";t.push(i),i.repeat&&(h+="(?:"+f+h+")*"),h=i.optional?i.partial?f+"("+h+")?":"(?:"+f+"("+h+"))?":f+"("+h+")",a+=h}}var l=s(n.delimiter||"/"),p=a.slice(-l.length)===l;return o||(a=(p?a.slice(0,-l.length):a)+"(?:"+l+"(?=$))?"),a+=r?"$":o&&p?"":"(?="+l+"|$)",u(new RegExp("^"+a,d(n)),t)}function m(e,t,n){return g(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?h(e,t):g(e)?l(e,t,n):p(e,t,n)}var g=e("isarray");t.exports=m,t.exports.parse=o,t.exports.compile=r,t.exports.tokensToFunction=i,t.exports.tokensToRegExp=b;var v=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],o=parseInt(t[2]);e&&(!t||"Firefox"===n&&o>=46||"Chrome"===n&&o>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(o){if(o.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(o.map(function(t,o){return n.put(e[o],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)}),toolbox.router.get(/^https:\/\/lh3.googleusercontent.com/,toolbox.cacheFirst,{});