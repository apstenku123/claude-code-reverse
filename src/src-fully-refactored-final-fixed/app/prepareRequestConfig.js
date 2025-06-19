/**
 * Prepares and normalizes an HTTP request configuration object for use in a browser or web worker environment.
 * Handles URL construction, header normalization, authentication, XSRF token injection, and content-type adjustments for FormData.
 *
 * @param {Object} requestConfig - The original request configuration object.
 * @param {Object} [requestConfig.data] - The request payload (may be FormData).
 * @param {boolean|function} [requestConfig.withXSRFToken] - Whether to include an XSRF token, or a function returning a boolean.
 * @param {string} [requestConfig.xsrfHeaderName] - The name of the XSRF header to set.
 * @param {string} [requestConfig.xsrfCookieName] - The name of the XSRF cookie to read.
 * @param {Object} [requestConfig.headers] - The headers object for the request.
 * @param {Object} [requestConfig.auth] - Basic auth credentials ({ username, password }).
 * @param {string} [requestConfig.baseURL] - The base URL for the request.
 * @param {string} [requestConfig.url] - The request URL (may be relative).
 * @param {boolean} [requestConfig.allowAbsoluteUrls] - Whether to allow absolute URLs.
 * @param {Object} [requestConfig.params] - Query parameters to append to the URL.
 * @param {function} [requestConfig.paramsSerializer] - Function to serialize query parameters.
 * @returns {Object} The normalized and prepared request configuration object.
 */
function prepareRequestConfig(requestConfig) {
  // Clone the request config to avoid mutating the original
  const config = tC({}, requestConfig);
  let {
    data: validateSdkKeyPresence,
    withXSRFToken,
    xsrfHeaderName,
    xsrfCookieName,
    headers: headersInput,
    auth: authCredentials
  } = config;

  // Normalize headers using D3.from
  config.headers = headers = D3.from(headersInput);

  // Build the full URL with baseURL, url, and params
  config.url = appendQueryParamsToUrl(
    getProcessedObservableOrConfig(config.baseURL, config.url, config.allowAbsoluteUrls),
    requestConfig.params,
    requestConfig.paramsSerializer
  );

  // Handle HTTP Basic Authentication if credentials are provided
  if (authCredentials) {
    const username = authCredentials.username || "";
    // Encode password for HTTP Basic Auth
    const password = authCredentials.password
      ? unescape(encodeURIComponent(authCredentials.password))
      : "";
    headers.set(
      "Authorization",
      "Basic " + btoa(username + ":" + password)
    );
  }

  // Adjust Content-Type for FormData payloads
  let contentType;
  if (DA.isFormData(validateSdkKeyPresence)) {
    if (H5.hasStandardBrowserEnv || H5.hasStandardBrowserWebWorkerEnv) {
      // Let the browser set the Content-Type with proper boundary
      headers.setContentType(undefined);
    } else if ((contentType = headers.getContentType()) !== false) {
      // If Content-Type is set, normalize isBlobOrFileLikeObject to 'multipart/form-data' and preserve parameters
      const [mainType, ...params] = contentType
        ? contentType.split(";").map(str => str.trim()).filter(Boolean)
        : [];
      headers.setContentType([
        mainType || "multipart/form-data",
        ...params
      ].join("; "));
    }
  }

  // XSRF token injection for browser environments
  if (H5.hasStandardBrowserEnv) {
    // If withXSRFToken is a function, call isBlobOrFileLikeObject with the config
    if (withXSRFToken && DA.isFunction(withXSRFToken)) {
      withXSRFToken = withXSRFToken(config);
    }
    // If XSRF is enabled and the URL is same-origin
    if (withXSRFToken || (withXSRFToken !== false && yXA(config.url))) {
      // Read the XSRF token from the cookie
      const xsrfToken = xsrfHeaderName && xsrfCookieName && xXA.read(xsrfCookieName);
      if (xsrfToken) {
        headers.set(xsrfHeaderName, xsrfToken);
      }
    }
  }

  return config;
}

module.exports = prepareRequestConfig;