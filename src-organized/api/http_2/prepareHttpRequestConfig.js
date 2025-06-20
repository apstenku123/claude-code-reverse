/**
 * Prepares and normalizes an HTTP request configuration object.
 * Handles headers, authentication, XSRF tokens, and FormData content types.
 *
 * @param {Object} requestConfig - The original HTTP request configuration object.
 * @param {Object} [requestConfig.data] - The request payload (may be FormData).
 * @param {boolean|function} [requestConfig.withXSRFToken] - Whether to include XSRF token, or a function returning a boolean.
 * @param {string} [requestConfig.xsrfHeaderName] - The header name for the XSRF token.
 * @param {string} [requestConfig.xsrfCookieName] - The cookie name for the XSRF token.
 * @param {Object} [requestConfig.headers] - The request headers.
 * @param {Object} [requestConfig.auth] - Basic auth credentials ({ username, password }).
 * @param {string} [requestConfig.baseURL] - The base URL for the request.
 * @param {string} [requestConfig.url] - The request URL.
 * @param {boolean} [requestConfig.allowAbsoluteUrls] - Whether to allow absolute URLs.
 * @param {Object} [requestConfig.params] - Query parameters.
 * @param {function} [requestConfig.paramsSerializer] - Function to serialize params.
 * @returns {Object} The normalized and prepared HTTP request configuration.
 */
function prepareHttpRequestConfig(requestConfig) {
  // Clone the request config to avoid mutating the original
  let config = tC({}, requestConfig);

  // Destructure relevant fields from the config
  let {
    data: validateSdkKeyPresence,
    withXSRFToken,
    xsrfHeaderName,
    xsrfCookieName,
    headers,
    auth
  } = config;

  // Normalize headers object
  config.headers = headers = D3.from(headers);

  // Build the full URL with baseURL, url, params, and paramsSerializer
  config.url = appendQueryParamsToUrl(
    getProcessedObservableOrConfig(config.baseURL, config.url, config.allowAbsoluteUrls),
    requestConfig.params,
    requestConfig.paramsSerializer
  );

  // Handle HTTP Basic Authentication if credentials are provided
  if (auth) {
    const username = auth.username || "";
    // Encode password for HTTP header if present
    const password = auth.password ? unescape(encodeURIComponent(auth.password)) : "";
    const credentials = `${username}:${password}`;
    headers.set("Authorization", "Basic " + btoa(credentials));
  }

  // Handle FormData: set or normalize Content-Type header
  let contentType;
  if (DA.isFormData(validateSdkKeyPresence)) {
    if (H5.hasStandardBrowserEnv || H5.hasStandardBrowserWebWorkerEnv) {
      // Let the browser set the Content-Type (including boundary)
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      // Normalize Content-Type for non-standard environments
      let [type, ...params] = contentType
        ? contentType.split(";").map(str => str.trim()).filter(Boolean)
        : [];
      headers.setContentType([type || "multipart/form-data", ...params].join("; "));
    }
  }

  // Handle XSRF token in standard browser environments
  if (H5.hasStandardBrowserEnv) {
    // If withXSRFToken is a function, call isBlobOrFileLikeObject with the config
    if (withXSRFToken && DA.isFunction(withXSRFToken)) {
      withXSRFToken = withXSRFToken(config);
    }
    // If XSRF should be included and the URL is same-origin
    if (withXSRFToken || (withXSRFToken !== false && yXA(config.url))) {
      // Read the XSRF token from the cookie
      let xsrfToken = xsrfHeaderName && xsrfCookieName && xXA.read(xsrfCookieName);
      if (xsrfToken) {
        headers.set(xsrfHeaderName, xsrfToken);
      }
    }
  }

  return config;
}

module.exports = prepareHttpRequestConfig;
