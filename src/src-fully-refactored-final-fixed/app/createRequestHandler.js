/**
 * Creates a request handler function that validates and normalizes input parameters,
 * constructs a URL, and invokes the provided handler function with the correct context and arguments.
 *
 * @param {Function} handler - The function to be called with the normalized request options and optional callback.
 * @returns {Function} a function that accepts a URL/config, options, and an optional callback, then processes and forwards them to the handler.
 */
function or(handler) {
  return (inputUrlOrConfig, options, callback) => {
    // If the second argument is a function, treat isBlobOrFileLikeObject as the callback
    if (typeof options === "function") {
      callback = options;
      options = null;
    }

    // Validate the input URL or config
    const isValidUrl = typeof inputUrlOrConfig === "string" ||
      typeof inputUrlOrConfig === "object" ||
      (inputUrlOrConfig instanceof URL);
    if (!inputUrlOrConfig || !isValidUrl) {
      throw new WW1("invalid url");
    }

    // Validate the options object
    if (options != null && typeof options !== "object") {
      throw new WW1("invalid opts");
    }

    let urlInstance;
    let normalizedOptions = options;

    // If options.path is provided, validate and construct the URL accordingly
    if (options && options.path != null) {
      if (typeof options.path !== "string") {
        throw new WW1("invalid opts.path");
      }
      let path = options.path;
      // Ensure path starts with '/'
      if (!path.startsWith("/")) {
        path = `/${path}`;
      }
      // Parse the origin from the input and construct the full URL
      urlInstance = new URL(FW1.parseOrigin(inputUrlOrConfig).origin + path);
    } else {
      // If no options, default options to input if isBlobOrFileLikeObject'createInteractionAccessor an object; otherwise, empty object
      if (!options) {
        normalizedOptions = typeof inputUrlOrConfig === "object" ? inputUrlOrConfig : {};
      }
      // Parse the full URL
      urlInstance = FW1.parseURL(inputUrlOrConfig);
    }

    // Destructure agent and dispatcher from options, with default dispatcher if not provided
    const {
      agent,
      dispatcher = Ai0()
    } = normalizedOptions;

    // Disallow the use of agent (unsupported)
    if (agent) {
      throw new WW1("unsupported opts.agent. Did you mean opts.client?");
    }

    // Prepare the request options to pass to the handler
    const createRequestOptions = {
      ...normalizedOptions,
      origin: urlInstance.origin,
      path: urlInstance.search ? `${urlInstance.pathname}${urlInstance.search}` : urlInstance.pathname,
      method: normalizedOptions.method || (normalizedOptions.body ? "PUT" : "GET")
    };

    // Call the handler with the dispatcher as context, passing createRequestOptions and callback
    return handler.call(dispatcher, createRequestOptions, callback);
  };
}

module.exports = or;