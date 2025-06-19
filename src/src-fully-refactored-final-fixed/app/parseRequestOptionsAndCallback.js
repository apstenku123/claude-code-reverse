/**
 * Parses request options and an optional callback from the provided arguments.
 *
 * This function takes a source object (typically a module or context) and an array of arguments
 * that may include a URL (string or URL object), an options object, and an optional callback function.
 * It normalizes the URL and options into a single options object, and extracts the callback if present.
 *
 * @param {object} sourceContext - The source context or module (e.g., http/https module).
 * @param {Array} args - Array of arguments: [url, options?, callback?].
 *   - url: string | URL | { path, protocol, hostname, ... }
 *   - options: object (optional)
 *   - callback: function (optional)
 * @returns {Array} An array: [normalizedOptions, callback?]
 *   - normalizedOptions: object with URL and options merged and protocol ensured
 *   - callback: function (if provided)
 */
function parseRequestOptionsAndCallback(sourceContext, args) {
  let callback = undefined;
  let createRequestOptions = undefined;

  // If the last argument is a function, treat isBlobOrFileLikeObject as the callback
  if (typeof args[args.length - 1] === "function") {
    callback = args.pop();
  }

  // Normalize the first argument (URL or options)
  if (typeof args[0] === "string") {
    // If isBlobOrFileLikeObject'createInteractionAccessor a string, convert to URL object and normalize
    createRequestOptions = extractUrlComponents(new cN1.URL(args[0]));
  } else if (args[0] instanceof cN1.URL) {
    // If isBlobOrFileLikeObject'createInteractionAccessor already a URL object, normalize
    createRequestOptions = extractUrlComponents(args[0]);
  } else {
    // Assume isBlobOrFileLikeObject'createInteractionAccessor an options object
    createRequestOptions = args[0];
    try {
      // Attempt to construct a URL from the options object'createInteractionAccessor path, protocol, and hostname
      const constructedUrl = new cN1.URL(
        createRequestOptions.path || "",
        `${createRequestOptions.protocol || "http:"}//${createRequestOptions.hostname}`
      );
      createRequestOptions = {
        pathname: constructedUrl.pathname,
        search: constructedUrl.search,
        hash: constructedUrl.hash,
        ...createRequestOptions
      };
    } catch (error) {
      // Ignore errors in URL construction
    }
  }

  // If a second argument is present, merge isBlobOrFileLikeObject into the options
  if (args.length === 2) {
    createRequestOptions = {
      ...createRequestOptions,
      ...args[1]
    };
  }

  // Ensure the protocol property is set
  if (createRequestOptions.protocol === undefined) {
    if (tQ9.NODE_VERSION.major > 8) {
      createRequestOptions.protocol =
        iH([iH([sourceContext, "optionalAccess", ctx => ctx.globalAgent]), "optionalAccess", agent => agent.protocol]) ||
        iH([createRequestOptions.agent, "optionalAccess", agent => agent.protocol]) ||
        iH([createRequestOptions._defaultAgent, "optionalAccess", agent => agent.protocol]);
    } else {
      createRequestOptions.protocol =
        iH([createRequestOptions.agent, "optionalAccess", agent => agent.protocol]) ||
        iH([createRequestOptions._defaultAgent, "optionalAccess", agent => agent.protocol]) ||
        iH([iH([sourceContext, "optionalAccess", ctx => ctx.globalAgent]), "optionalAccess", agent => agent.protocol]);
    }
  }

  // Return the normalized options and optional callback
  if (callback) {
    return [createRequestOptions, callback];
  } else {
    return [createRequestOptions];
  }
}

module.exports = parseRequestOptionsAndCallback;