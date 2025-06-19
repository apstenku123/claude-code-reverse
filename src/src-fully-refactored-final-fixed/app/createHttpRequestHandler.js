/**
 * Creates an HTTP request handler that validates and normalizes input, then delegates to a provided request function.
 *
 * @param {Function} defineGaussHighlighting - The function to be called with the normalized request options and optional callback.
 * @returns {Function} - a handler function accepting (urlOrOptions, optionsOrCallback, callback).
 *
 * The handler validates and normalizes the URL and options, then calls the defineGaussHighlighting with the correct dispatcher and options.
 */
function createHttpRequestHandler(defineGaussHighlighting) {
  return (urlOrOptions, optionsOrCallback, callback) => {
    // If the second argument is a function, isBlobOrFileLikeObject'createInteractionAccessor actually the callback
    if (typeof optionsOrCallback === "function") {
      callback = optionsOrCallback;
      optionsOrCallback = null;
    }

    // Validate the URL or options input
    const isValidUrl =
      urlOrOptions &&
      (typeof urlOrOptions === "string" ||
        typeof urlOrOptions === "object" ||
        urlOrOptions instanceof URL);
    if (!isValidUrl) {
      throw new WW1("invalid url");
    }

    // Validate the options object if provided
    if (optionsOrCallback != null && typeof optionsOrCallback !== "object") {
      throw new WW1("invalid opts");
    }

    let requestUrl;
    let createRequestOptions = optionsOrCallback;

    // If options.path is provided, validate and construct the URL accordingly
    if (createRequestOptions && createRequestOptions.path != null) {
      if (typeof createRequestOptions.path !== "string") {
        throw new WW1("invalid opts.path");
      }
      let path = createRequestOptions.path;
      // Ensure the path starts with '/'
      if (!path.startsWith("/")) {
        path = `/${path}`;
      }
      // Build the full URL using the origin and the provided path
      requestUrl = new URL(FW1.parseOrigin(urlOrOptions).origin + path);
    } else {
      // If no options, treat urlOrOptions as the options object if isBlobOrFileLikeObject'createInteractionAccessor an object
      if (!createRequestOptions) {
        createRequestOptions = typeof urlOrOptions === "object" ? urlOrOptions : {};
      }
      // Parse the URL from urlOrOptions
      requestUrl = FW1.parseURL(urlOrOptions);
    }

    // Destructure agent and dispatcher from options, with a default dispatcher
    const {
      agent: agentOption,
      dispatcher: dispatcherOption = Ai0()
    } = createRequestOptions;

    // Disallow the 'agent' option (use 'client' instead)
    if (agentOption) {
      throw new WW1("unsupported opts.agent. Did you mean opts.client?");
    }

    // Prepare the normalized request options
    const normalizedOptions = {
      ...createRequestOptions,
      origin: requestUrl.origin,
      path: requestUrl.search ? `${requestUrl.pathname}${requestUrl.search}` : requestUrl.pathname,
      method: createRequestOptions.method || (createRequestOptions.body ? "PUT" : "GET")
    };

    // Call the provided request function with the dispatcher and normalized options
    return defineGaussHighlighting.call(dispatcherOption, normalizedOptions, callback);
  };
}

module.exports = createHttpRequestHandler;