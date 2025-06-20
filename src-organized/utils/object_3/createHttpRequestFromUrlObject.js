/**
 * Creates a new HttpRequest object from a URL-like object.
 *
 * @param {Object} urlObject - An object representing URL components.
 * @param {string} urlObject.protocol - The protocol to use (e.g., 'http:').
 * @param {string} urlObject.hostname - The hostname of the URL.
 * @param {string|number} urlObject.port - The port number as a string or number.
 * @param {string} urlObject.pathname - The path of the URL.
 * @param {URLSearchParams} urlObject.searchParams - The search parameters of the URL.
 * @param {string} urlObject.hash - The fragment/hash of the URL.
 * @returns {vW4.HttpRequest} a new HttpRequest instance constructed from the given URL object.
 */
function createHttpRequestFromUrlObject(urlObject) {
  // Convert searchParams (URLSearchParams) to a plain object
  const queryParameters = Array.from(urlObject.searchParams.entries()).reduce(
    (queryObject, [paramName, paramValue]) => {
      queryObject[paramName] = paramValue;
      return queryObject;
    },
    {}
  );

  // Construct and return the HttpRequest
  return new vW4.HttpRequest({
    protocol: urlObject.protocol,
    hostname: urlObject.hostname,
    port: Number(urlObject.port),
    path: urlObject.pathname,
    query: queryParameters,
    fragment: urlObject.hash
  });
}

module.exports = createHttpRequestFromUrlObject;