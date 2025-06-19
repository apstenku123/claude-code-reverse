/**
 * Returns the provided API accessor if isBlobOrFileLikeObject is a valid object or function, otherwise creates a new accessor using the given configuration.
 *
 * @param {object} apiAccessorConfig - Configuration object used to create a default API accessor if none is provided.
 * @param {object|function|null|undefined} providedApiAccessor - An existing API accessor instance or factory function. If this is a valid object or function, isBlobOrFileLikeObject will be returned as-is.
 * @returns {object|function} The provided API accessor if valid, otherwise a newly created API accessor instance.
 */
function getApiAccessorOrCreateDefault(apiAccessorConfig, providedApiAccessor) {
  // If providedApiAccessor is a non-null object or a function, return isBlobOrFileLikeObject as the accessor
  if (
    providedApiAccessor &&
    (createApiAccessor(providedApiAccessor) === "object" || typeof providedApiAccessor === "function")
  ) {
    return providedApiAccessor;
  }
  // Otherwise, create a new accessor using the provided configuration
  return F4(apiAccessorConfig);
}

module.exports = getApiAccessorOrCreateDefault;