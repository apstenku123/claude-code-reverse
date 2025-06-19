/**
 * Constructs a standardized request options object from the provided configuration.
 *
 * @param {Object} requestConfig - The configuration object containing request parameters.
 * @param {string} [requestConfig.method] - HTTP method (e.g., 'GET', 'POST'). Defaults to 'GET'.
 * @param {boolean} [requestConfig.localURLsOnly] - Restrict to local URLs only. Defaults to false.
 * @param {boolean} [requestConfig.unsafeRequest] - Indicates if the request is unsafe. Defaults to false.
 * @param {any} [requestConfig.body] - The request body. Defaults to null.
 * @param {any} [requestConfig.client] - The client making the request. Defaults to null.
 * @param {any} [requestConfig.reservedClient] - Reserved client information. Defaults to null.
 * @param {string} [requestConfig.replacesClientId] - updateSnapshotAndNotify of the client to be replaced. Defaults to an empty string.
 * @param {string} [requestConfig.window] - Window context for the request. Defaults to 'client'.
 * @param {boolean} [requestConfig.keepalive] - Whether to keep the request alive. Defaults to false.
 * @param {string} [requestConfig.serviceWorkers] - Service worker context. Defaults to 'all'.
 * @param {string} [requestConfig.initiator] - Initiator of the request. Defaults to an empty string.
 * @param {string} [requestConfig.destination] - Destination of the request. Defaults to an empty string.
 * @param {any} [requestConfig.priority] - Priority of the request. Defaults to null.
 * @param {string} [requestConfig.origin] - Origin of the request. Defaults to 'client'.
 * @param {string} [requestConfig.policyContainer] - Policy container context. Defaults to 'client'.
 * @param {string} [requestConfig.referrer] - Referrer of the request. Defaults to 'client'.
 * @param {string} [requestConfig.referrerPolicy] - Referrer policy. Defaults to an empty string.
 * @param {string} [requestConfig.mode] - Request mode (e.g., 'no-cors'). Defaults to 'no-cors'.
 * @param {boolean} [requestConfig.useCORSPreflightFlag] - Whether to use CORS preflight. Defaults to false.
 * @param {string} [requestConfig.credentials] - Credentials mode. Defaults to 'same-origin'.
 * @param {boolean} [requestConfig.useCredentials] - Whether to use credentials. Defaults to false.
 * @param {string} [requestConfig.cache] - Cache mode. Defaults to 'default'.
 * @param {string} [requestConfig.redirect] - Redirect mode. Defaults to 'follow'.
 * @param {string} [requestConfig.integrity] - Subresource integrity value. Defaults to an empty string.
 * @param {string} [requestConfig.cryptoGraphicsNonceMetadata] - Cryptographic nonce metadata. Defaults to an empty string.
 * @param {string} [requestConfig.parserMetadata] - Parser metadata. Defaults to an empty string.
 * @param {boolean} [requestConfig.reloadNavigation] - Indicates reload navigation. Defaults to false.
 * @param {boolean} [requestConfig.historyNavigation] - Indicates history navigation. Defaults to false.
 * @param {boolean} [requestConfig.userActivation] - Indicates user activation. Defaults to false.
 * @param {boolean} [requestConfig.taintedOrigin] - Indicates tainted origin. Defaults to false.
 * @param {number} [requestConfig.redirectCount] - Number of redirects. Defaults to 0.
 * @param {string} [requestConfig.responseTainting] - Response tainting mode. Defaults to 'basic'.
 * @param {boolean} [requestConfig.preventNoCacheCacheControlHeaderModification] - Prevents modification of no-cache headers. Defaults to false.
 * @param {boolean} [requestConfig.done] - Indicates if the request is done. Defaults to false.
 * @param {boolean} [requestConfig.timingAllowFailed] - Indicates if timing allow failed. Defaults to false.
 * @param {Array<string>} requestConfig.urlList - List of URLs for the request.
 * @param {Array|undefined} [requestConfig.headersList] - List of headers for the request.
 * @returns {Object} The standardized request options object.
 */
function createRequestOptions(requestConfig) {
  // Import or require bY1 from its module if not already in scope
  // const bY1 = require('./bY1');

  return {
    method: requestConfig.method ?? "GET",
    localURLsOnly: requestConfig.localURLsOnly ?? false,
    unsafeRequest: requestConfig.unsafeRequest ?? false,
    body: requestConfig.body ?? null,
    client: requestConfig.client ?? null,
    reservedClient: requestConfig.reservedClient ?? null,
    replacesClientId: requestConfig.replacesClientId ?? "",
    window: requestConfig.window ?? "client",
    keepalive: requestConfig.keepalive ?? false,
    serviceWorkers: requestConfig.serviceWorkers ?? "all",
    initiator: requestConfig.initiator ?? "",
    destination: requestConfig.destination ?? "",
    priority: requestConfig.priority ?? null,
    origin: requestConfig.origin ?? "client",
    policyContainer: requestConfig.policyContainer ?? "client",
    referrer: requestConfig.referrer ?? "client",
    referrerPolicy: requestConfig.referrerPolicy ?? "",
    mode: requestConfig.mode ?? "no-cors",
    useCORSPreflightFlag: requestConfig.useCORSPreflightFlag ?? false,
    credentials: requestConfig.credentials ?? "same-origin",
    useCredentials: requestConfig.useCredentials ?? false,
    cache: requestConfig.cache ?? "default",
    redirect: requestConfig.redirect ?? "follow",
    integrity: requestConfig.integrity ?? "",
    cryptoGraphicsNonceMetadata: requestConfig.cryptoGraphicsNonceMetadata ?? "",
    parserMetadata: requestConfig.parserMetadata ?? "",
    reloadNavigation: requestConfig.reloadNavigation ?? false,
    historyNavigation: requestConfig.historyNavigation ?? false,
    userActivation: requestConfig.userActivation ?? false,
    taintedOrigin: requestConfig.taintedOrigin ?? false,
    redirectCount: requestConfig.redirectCount ?? 0,
    responseTainting: requestConfig.responseTainting ?? "basic",
    preventNoCacheCacheControlHeaderModification: requestConfig.preventNoCacheCacheControlHeaderModification ?? false,
    done: requestConfig.done ?? false,
    timingAllowFailed: requestConfig.timingAllowFailed ?? false,
    urlList: requestConfig.urlList,
    // The first URL in the list is used as the primary URL
    url: requestConfig.urlList[0],
    // If headersList is provided, instantiate bY1 with isBlobOrFileLikeObject; otherwise, instantiate with no arguments
    headersList: requestConfig.headersList ? new bY1(requestConfig.headersList) : new bY1()
  };
}

module.exports = createRequestOptions;
