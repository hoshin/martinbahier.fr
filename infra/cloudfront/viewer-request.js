/**
 * CloudFront Function — viewer-request stage.
 *
 * Three jobs, in order:
 *
 * 1. If the request arrives on the `www.` host, 301-redirect to the apex
 *    domain, preserving the path and query string. The apex is the canonical
 *    host (matches astro.config.mjs `site:`). The redirect is cached for an
 *    hour so browsers don't re-hit CloudFront on every navigation, but the
 *    cache is short enough that we can back out if needed.
 *
 * 2. At the root path ("/" or ""), perform a 302 redirect to /fr or /en based
 *    on the visitor's Accept-Language header. This shortcuts S3 entirely so
 *    visitors never see the fallback meta-refresh page emitted by Astro at
 *    dist/index.html. That fallback still ships as a safety net for any
 *    request that bypasses CloudFront (direct S3 access via the console,
 *    misconfigured DNS, etc.).
 *
 * 3. For every other request, rewrite "pretty" URLs to the underlying S3 key.
 *    Astro builds /fr/cv/index.html on disk but emits links to /fr/cv (no
 *    trailing slash, no .html). The S3 REST origin used by OAC does not
 *    auto-resolve "directory" URLs, so any request without a file extension
 *    is rewritten to <uri>/index.html. A single trailing slash is stripped
 *    first so /fr/cv/ behaves the same as /fr/cv.
 *
 * Runtime: cloudfront-js-2.0 (sync, no fetch, ~1ms budget).
 *
 * Tests to run after deploying:
 *   curl -I https://www.martinbahier.fr/fr/cv?x=1 -> 301, Location preserves path+query
 *   curl -I https://<dist>/                 -> 302, Location: /fr (or /en)
 *   curl -I -H 'Accept-Language: en-US' \
 *        https://<dist>/                    -> 302, Location: /en
 *   curl -I https://<dist>/fr               -> 200
 *   curl -I https://<dist>/fr/cv            -> 200
 *   curl -I https://<dist>/fr/cv/           -> 200 (normalized)
 *   curl -I https://<dist>/_astro/x.css     -> 200, passes through unchanged
 *   curl -I https://<dist>/does-not-exist   -> 404 (via custom error response)
 */

// Apex (canonical) host. Requests arriving on the `www.` variant are 301'd
// to this host. Keep in sync with astro.config.mjs `site:`.
var CANONICAL_HOST = 'martinbahier.fr';
var WWW_HOST = 'www.martinbahier.fr';

// Locales supported by the Astro app. Keep in sync with astro.config.mjs.
var SUPPORTED = ['fr', 'en'];
var DEFAULT_LOCALE = 'fr';

function pickLocaleFromAcceptLanguage(headerValue) {
    if (!headerValue) return DEFAULT_LOCALE;
    // Parse "en-US,en;q=0.9,fr;q=0.8" into an ordered list of (tag, q).
    var parts = headerValue.split(',');
    var ranked = [];
    for (var i = 0; i < parts.length; i++) {
        var raw = parts[i].trim();
        if (!raw) continue;
        var semi = raw.indexOf(';');
        var tag = (semi === -1 ? raw : raw.slice(0, semi)).toLowerCase();
        var q = 1.0;
        if (semi !== -1) {
            var qPart = raw.slice(semi + 1).trim();
            if (qPart.indexOf('q=') === 0) {
                var parsed = parseFloat(qPart.slice(2));
                if (!isNaN(parsed)) q = parsed;
            }
        }
        ranked.push({ tag: tag, q: q, order: i });
    }
    // Stable sort: higher q first, then declaration order.
    ranked.sort(function (a, b) {
        if (b.q !== a.q) return b.q - a.q;
        return a.order - b.order;
    });
    for (var j = 0; j < ranked.length; j++) {
        var primary = ranked[j].tag.split('-')[0];
        if (SUPPORTED.indexOf(primary) !== -1) return primary;
    }
    return DEFAULT_LOCALE;
}

// Reconstruct the request's query string as `?k=v&k=v` (or empty if there
// were no parameters). CloudFront Functions expose `request.querystring` as
// an object keyed by parameter name, with each value carrying `.value` and
// optionally `.multiValue` for repeated keys. We preserve the original
// declaration order via Object.keys() insertion order and re-encode nothing
// because the values are already URL-encoded by the client.
function buildQueryString(qs) {
    if (!qs) return '';
    var keys = Object.keys(qs);
    if (keys.length === 0) return '';
    var parts = [];
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var entry = qs[k];
        if (entry.multiValue && entry.multiValue.length) {
            for (var j = 0; j < entry.multiValue.length; j++) {
                parts.push(k + '=' + entry.multiValue[j].value);
            }
        } else {
            parts.push(k + '=' + entry.value);
        }
    }
    return '?' + parts.join('&');
}

function handler(event) {
    var req = event.request;
    var uri = req.uri;
    var headers = req.headers || {};

    // ---- 1. www → apex 301 (canonical host) ----
    var host = headers.host && headers.host.value ? headers.host.value.toLowerCase() : '';
    if (host === WWW_HOST) {
        var qs = buildQueryString(req.querystring);
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: { value: 'https://' + CANONICAL_HOST + uri + qs },
                'cache-control': { value: 'max-age=3600' },
            },
        };
    }

    // ---- 2. Root → locale-negotiated 302 ----
    if (uri === '/' || uri === '') {
        var al = headers['accept-language'];
        var alValue = al && al.value ? al.value : '';
        var locale = pickLocaleFromAcceptLanguage(alValue);
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: '/' + locale },
                'cache-control': { value: 'no-store' },
            },
        };
    }

    // ---- 3. Pretty-URL rewrite ----
    // Strip exactly one trailing slash (we already handled "/" above).
    if (uri.length > 1 && uri.charAt(uri.length - 1) === '/') {
        uri = uri.slice(0, -1);
    }

    // If the final path segment has no dot, treat as a directory and look up
    // the canonical index.html in S3.
    var lastSlash = uri.lastIndexOf('/');
    var lastSegment = uri.slice(lastSlash + 1);
    if (lastSegment.indexOf('.') === -1) {
        uri = uri + '/index.html';
    }

    req.uri = uri;
    return req;
}
