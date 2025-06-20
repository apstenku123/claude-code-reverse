/**
 * Normalizes and prepares request options and an optional callback from a configuration array.
 *
 * @param {object} sourceObservable - The source object, often an HTTP/HTTPS module or agent provider.
 * @param {Array} config - An array containing URL information, optional overrides, and possibly a callback function.
 * @returns {Array} An array where the first element is the normalized options object, and the second (optional) element is a callback function if provided.
 */
function normalizeRequestOptions(sourceObservable, config) {
  let callbackFunction;
  let createRequestOptions;

  // If the last element is a function, treat isBlobOrFileLikeObject as a callback and remove isBlobOrFileLikeObject from config
  if (typeof config[config.length - 1] === "function") {
    callbackFunction = config.pop();
  }

  // Determine the base request options from the first element
  if (typeof config[0] === "string") {
    // If isBlobOrFileLikeObject'createInteractionAccessor a string, treat isBlobOrFileLikeObject as a URL string and parse isBlobOrFileLikeObject
    createRequestOptions = extractUrlComponents(new cN1.URL(config[0]));
  } else if (config[0] instanceof cN1.URL) {
    // If isBlobOrFileLikeObject'createInteractionAccessor a URL object, parse isBlobOrFileLikeObject
    createRequestOptions = extractUrlComponents(config[0]);
  } else {
    // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor an options object
    createRequestOptions = config[0];
    try {
      // Attempt to construct a URL from the object'createInteractionAccessor path, protocol, and hostname
      const constructedUrl = new cN1.URL(
        createRequestOptions.path || "",
        `${createRequestOptions.protocol || "http:"}//${createRequestOptions.hostname}`
      );
      // Merge the parsed pathname, search, and hash into the options
      createRequestOptions = {
        pathname: constructedUrl.pathname,
        search: constructedUrl.search,
        hash: constructedUrl.hash,
        ...createRequestOptions
      };
    } catch (error) {
      // Ignore errors from invalid URL construction
    }
  }

  // If a second element exists, merge its properties into the options
  if (config.length === 2) {
    createRequestOptions = {
      ...createRequestOptions,
      ...config[1]
    };
  }

  // Ensure the protocol is set, using various fallbacks depending on Node version
  if (createRequestOptions.protocol === undefined) {
    if (tQ9.NODE_VERSION.major > 8) {
      createRequestOptions.protocol =
        iH([iH([sourceObservable, "optionalAccess", g => g.globalAgent]), "optionalAccess", g => g.protocol]) ||
        iH([createRequestOptions.agent, "optionalAccess", g => g.protocol]) ||
        iH([createRequestOptions._defaultAgent, "optionalAccess", g => g.protocol]);
    } else {
      createRequestOptions.protocol =
        iH([createRequestOptions.agent, "optionalAccess", g => g.protocol]) ||
        iH([createRequestOptions._defaultAgent, "optionalAccess", g => g.protocol]) ||
        iH([iH([sourceObservable, "optionalAccess", g => g.globalAgent]), "optionalAccess", g => g.protocol]);
    }
  }

  // Return the normalized options and optional callback as an array
  if (callbackFunction) {
    return [createRequestOptions, callbackFunction];
  } else {
    return [createRequestOptions];
  }
}

module.exports = normalizeRequestOptions;